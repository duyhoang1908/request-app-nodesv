export const generateToken = (id) => {
  const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15s",
  });
  const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "5m",
  });
  return { accessToken, refreshToken };
};

export const updateRefreshToken = async (id, refreshToken) => {
  await UserModel.findByIdAndUpdate(id, { refreshToken });
};

export const sendRefreshToken = (res, refreshToken) => {
  res.cookie(process.env.REFRESH_TOKEN_NAME, refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/api/v1/refresh_token",
  });
};
