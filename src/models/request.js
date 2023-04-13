const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/requestdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;

const RequestSchema = new Schema(
  {
    author: String,
    category: String,
    content: String,
    createAt: Number,
    department: String,
    email: String,
    isConfirm: Boolean,
    priority: String,
    uid: String,
  },
  {
    collection: "Request",
  }
);

const RequestModel = mongoose.model("Request", RequestSchema);

module.exports = RequestModel;
