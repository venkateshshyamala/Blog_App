import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/user-router";
import blogRouter from "./routes/blog-router";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

mongoose
  .connect(
    "mongodb+srv://venkat:IaKBqVzvwQWSDRF1@cluster0.ftji7mf.mongodb.net/myBlog?retrywrites=true&w=majority"
  )
  .then(() => app.listen(5008))
  .then(() => console.log("Server is running on port:5008"))
  .catch((err) => console.log(err));
