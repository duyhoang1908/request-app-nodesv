export const isEmail = (email) => {
  const schema = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return schema.test(email);
};

export const loginSchema = (req, res, next) => {
  const { email, password } = req.body;
  if (password && isEmail(email)) {
    next();
  } else {
    return res.status(201).json({
      message: "Error",
    });
  }
};

export const registerSchema = (req, res, next) => {
  const { username, password, department, email } = req.body;
  if (username && password && department && isEmail(email)) {
    next();
  } else {
    return res.status(200).json({
      message: "Missing require",
    });
  }
};
