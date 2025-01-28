import path from "node:path";
import * as argon2 from "argon2";
import type { RequestHandler } from "express";
import multer from "multer";

const configMulter = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(
      Math.random() * 99999999,
    )}`;

    req.body.avatar = uniqueSuffix + path.extname(file.originalname);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const uploads = multer({ storage: configMulter });

import authRepository from "../modules/auth/authRepository";

const isRegistered: RequestHandler = async (req, res, next) => {
  const user = await authRepository.read(req.body.email);

  if (!user) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  req.user = user;
  next();
};

const login: RequestHandler = async (req, res, next) => {
  try {
    const user = await authRepository.read(req.body.email);
    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    if (!(await argon2.verify(user.password, req.body.password))) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

const hashPwd: RequestHandler = async (req, res, next) => {
  try {
    const register = JSON.parse(req.body.register);

    const hash = await argon2.hash(register.password);
    register.password = hash;
    req.body = { ...register, avatar: req.body.avatar };
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default { isRegistered, hashPwd, uploads, login };
