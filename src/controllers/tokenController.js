import { generateToken, sendRefreshToken } from "../middleware/token";
import UserModel from "../models/user";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  const refresh_token = req.cookies[process.env.REFRESH_TOKEN_NAME];

  if (!refresh_token) return res.sendStatus(401);
  try {
    const decodedUser = jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET
    );

    const existingUser = await UserModel.findById(decodedUser.id);

    if (!existingUser) {
      return res.sendStatus(401);
    }

    const tokens = generateToken(existingUser._id.toString());

    sendRefreshToken(res, tokens.refreshToken);

    return res.status(200).json({
      succes: true,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    console.log("ERRORR REFRERSH");
    return res.sendStatus(403);
  }
};
