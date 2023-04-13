import express from "express";
import bodyParser from "body-parser";
import router from "./routes/api";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const port = 8080;
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
