import express from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/userController.js";
import validateUser from "../middlewares/inputValidator.js";

const router = express.Router();

router.get("/user", getAllUsers);
router.get("/user/:emp_id", getUserById);
router.post("/user", validateUser, createUser);
router.put("/user/:emp_id", validateUser, updateUser);
router.delete("/user/:emp_id", deleteUser);

export default router;