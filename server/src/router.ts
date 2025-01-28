import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.get("/api/categories", itemActions.categories);

import authMiddleware from "./middlewares/authMiddleware";
import authActions from "./modules/auth/authActions";
/** login / register */

router.post("/api/login", authMiddleware.login, authActions.login);
router.post(
  "/api/register",
  authMiddleware.uploads.single("avatar"),
  authMiddleware.hashPwd,
  authActions.register,
);
router.post(
  "/api/forgot-password",
  authMiddleware.isRegistered,
  authActions.forgotPassword,
);

router.post(
  "/api/reset-password",
  authMiddleware.isRegistered,
  authActions.resetPassword,
);

/* ************************************************************************* */

export default router;
