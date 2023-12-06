import express from 'express';
import { addBlog, deleteBlog, getBlog, getBlogUser, updateBlog, getUserBlogs } from '../controller/blog-controller';

const blogRouter = express.Router();

blogRouter.get("/", getBlogUser);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id", getBlog);
blogRouter.delete("/:id", deleteBlog);
blogRouter.get("/user/:id", getUserBlogs);

export default blogRouter;