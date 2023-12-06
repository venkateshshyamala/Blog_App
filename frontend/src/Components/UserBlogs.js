import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogItem from "./BlogItem";

const UserBlogs = () => {
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");

  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:5008/api/blog/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data);
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);
  console.log(user);

  return (
    <div>
      {user &&
        user.blogs &&
        user.blogs.map((blog, index) => (
          <BlogItem
            isUser={true}
            key={index}
            id={blog._id}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            user={user.name}
          />
        ))}
    </div>
  );
};

export default UserBlogs;
