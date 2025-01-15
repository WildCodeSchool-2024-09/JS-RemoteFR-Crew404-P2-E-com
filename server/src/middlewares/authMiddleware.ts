import type { RequestHandler } from "express";

import authRepository from "../modules/auth/authRepository";

const isRegistered: RequestHandler = async (req, res, next) => {
  const user = await authRepository.read(req.body.email);

  if (!user) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  if (user.password !== req.body.password) {
    res.status(401).json({ message: "C'est derrick" });
    return;
  }

  req.user = user;

  next();
};

export default { isRegistered };
