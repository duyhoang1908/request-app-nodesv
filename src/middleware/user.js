require("dotenv").config();
import UserModel from "../models/user";
import { isEmail } from "./schema";

export const isExistAccount = async (req, res, next) => {
  const { email } = req.body;
  try {
    const data = await UserModel.findOne({
      email,
    });
    if (data) {
      return res.status(200).json({
        message: "Tài khoản đã tồn tại.",
      });
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).json({
      message: "Đã có lỗi xảy ra!",
    });
  }
};
