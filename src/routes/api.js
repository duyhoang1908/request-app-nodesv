import express from "express";
import {
  getAllUser,
  getStaffOfDepartMent,
  getUserById,
  loginUser,
  registerUser,
} from "../controllers/userController";

import {
  confirmRequest,
  getListRequestOfDepartment,
  getRequestByUserId,
  getRequestDetail,
  postRequest,
  updateRequest,
} from "../controllers/requestController";

import { refreshToken } from "../controllers/tokenController";

import { loginSchema, registerSchema } from "../middleware/schema";

const router = express.Router();
//User API
router.get("/api/v1/user", getAllUser);
router.get("/api/v1/user/:id", getUserById);
router.post("/api/v1/login", loginSchema, loginUser);
router.post("/api/v1/register", registerSchema, registerUser);
router.get("/api/v1/list/:id", getRequestByUserId);

//Request API
router.post("/api/v1/request", postRequest);
router.get("/api/v1/request/:id", getRequestDetail);
router.patch("/api/v1/request/update", updateRequest);
router.patch("/api/v1/request/update/:id", confirmRequest);
router.get("/api/v1/department/:department", getListRequestOfDepartment);
router.get("/api/v1/staff/:department", getStaffOfDepartMent);
router.get("/api/v1/staff/:department", getStaffOfDepartMent);

//Token API
router.get("/api/v1/refresh_token", refreshToken);

export default router;
