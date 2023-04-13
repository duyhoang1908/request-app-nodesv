import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const accessToken = authHeader && authHeader.split(" ")[1];
  try {
    const decodedUser = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    res.decodedUser = decodedUser;
    next();
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(403);
  }
};
