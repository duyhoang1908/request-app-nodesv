const RequestModel = require("../models/request");

export const getRequestByUserId = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await RequestModel.find({
      uid: id,
    });
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Error",
    });
  }
};

export const postRequest = async (req, res) => {
  try {
    await RequestModel.create({
      ...req.body,
      createAt: Date.now(),
    });
    return res.status(200).json({
      message: "OK",
    });
  } catch (error) {
    return res.status(500).json({
      message: `${error.message}`,
    });
  }
};

export const getListRequestOfDepartment = async (req, res) => {
  const { department } = req.params;
  try {
    const data = await RequestModel.find({
      department,
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Đã có lỗi xảy ra!",
    });
  }
};

export const getRequestDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await RequestModel.findById(id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500);
  }
};

export const updateRequest = async (req, res) => {
  const { _id, category, department, priority, content } = req.body;
  try {
    await RequestModel.findByIdAndUpdate(_id, {
      content,
      category,
      department,
      priority,
    });
    return res.status(200).json({ message: "Thành công" });
  } catch (error) {
    return res.status(500);
  }
};

export const confirmRequest = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    await RequestModel.findByIdAndUpdate(id, {
      isConfirm: true,
    });
    return res.status(200).json({ message: "Thành công" });
  } catch (error) {
    return res.status(500);
  }
};
