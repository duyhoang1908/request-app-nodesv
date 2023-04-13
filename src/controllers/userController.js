const UserModel = require("../models/user");
import * as argon2 from "argon2";
import { generateToken, sendRefreshToken } from "../middleware/token";

const PAGE_SIZE = 2;

export const getAllUser = async (req, res) => {
  let page = req.query.page;
  if (page) {
    page = parseInt(page);
    let start = (page - 1) * PAGE_SIZE;
    try {
      const data = await UserModel.find().skip(start).limit(PAGE_SIZE);
      return res.status(200).json({
        data,
        page,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Đã có lỗi xảy ra!",
      });
    }
  } else {
    try {
      const data = await UserModel.find();
      return res.status(200).json({
        data,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Đã có lỗi xảy ra!",
      });
    }
  }
};

export const getUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await UserModel.findById(id);
    return res.status(200).json({
      message: "OK",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Đã có lỗi xảy ra!",
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({
    email,
  });

  const isVerifyPassword = await argon2.verify(user.password, password);

  if (isVerifyPassword) {
    const tokens = generateToken(user._id.toString());
    sendRefreshToken(res, tokens.refreshToken);
    return res.status(200).json({
      message: "Dang nhap thanh cong",
      data: user,
      accessToken: tokens.accessToken,
    });
  } else {
    return res.status(401).json({
      message: "ok",
    });
  }
};

export const registerUser = async (req, res) => {
  const { email, password, username, department } = req.body;
  try {
    const data = await UserModel.findOne({
      email,
    });
    if (data) {
      return res.status(200).json({
        message: "Tài khoản đã tồn tại.",
      });
    } else {
      const hashPassword = await argon2.hash(password);
      const data = await UserModel.create({
        username,
        password: hashPassword,
        email,
        department,
        role: "staff",
        refreshToken: null,
      });
      return res.status(200).json({
        message: "Tạo tài khoản thành công.",
        data,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Đã có lỗi xảy ra!",
    });
  }
};

export const getStaffOfDepartMent = async (req, res) => {
  const { department } = req.params;
  try {
    const data = await UserModel.find({
      department,
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Đã có lỗi xảy ra!",
    });
  }
};
