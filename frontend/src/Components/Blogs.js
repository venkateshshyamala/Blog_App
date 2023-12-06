import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:5008/api/blog")
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, []);
  console.log(blogs);
  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <BlogItem
            isUser={localStorage.getItem("userId") === blog.user._id}
            key={index}
            id={blog._id}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            user={blog.user.name}
          />
        ))}
    </div>
  );
};

export default Blogs;
