const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/requestdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    department: String,
    email: String,
    username: String,
    role: String,
    password: String,
  },
  {
    collection: "Users",
  }
);

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
