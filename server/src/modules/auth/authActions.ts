import crypto from "node:crypto";
import type { RequestHandler } from "express";
import { transporter } from "../../../config/transporter";

import * as argon2 from "argon2";
// Import access to data
import authRepository from "./authRepository";

const register: RequestHandler = async (req, res, next) => {
  try {
    const user = await authRepository.create(req.body);

    // Respond with the user in JSON format
    res.status(201).json(user);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const login: RequestHandler = async (req, res, next) => {
  try {
    if (req.user) {
      const { password, ...safeUser } = req.user;
      res.status(200).json(safeUser);
    }
  } catch (err) {
    next(err);
  }
};

const forgotPassword: RequestHandler = async (req, res, next) => {
  try {
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hasedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const ttl = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    if (!req.user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    await authRepository.resetPassword({
      id: req.user.id,
      hasedToken,
      ttl,
    });

    const resetURL = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}&email=${req.user.email}`;

    await transporter.sendMail({
      from: "anthony.gorski@wildcodeschool.com",
      to: req.user.email,
      subject: "Password reset request",
      html: `<p>Click this <a href="${resetURL}">link</a> to reset your password</p>`,
    });

    res.status(200).json({ message: "Token sent to email" });
  } catch (error) {
    next(error);
  }
};

const resetPassword: RequestHandler = async (req, res, next) => {
  try {
    const { token, newPwd } = req.body;

    const hasedToken = crypto.createHash("sha256").update(token).digest("hex");

    if (!req.user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const isCorrect = await authRepository.verifyToken({
      hasedToken,
      id: req.user.id,
    });

    if (isCorrect === undefined) {
      res.status(400).json({
        message: "Token is invalid or has expired",
      });
      return;
    }

    const hash = await argon2.hash(newPwd);

    await authRepository.updatePassword({
      id: req.user.id,
      password: hash,
    });

    res.json({ message: "Password updated" });
  } catch (error) {
    next(error);
  }
};

export default { register, login, forgotPassword, resetPassword };
