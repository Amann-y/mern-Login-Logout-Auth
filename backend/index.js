import express from "express";
import dotenv from "dotenv";
import connectDB from "./dbconnection/connection.js";
import router from "./router/route.js";
import cors from "cors";

const app = express();
dotenv.config();
const port = process.env.PORT;

connectDB();

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
