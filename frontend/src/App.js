import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Header from "./Components/Header";
import Auth from "./Components/Auth";
import Blogs from "./Components/Blogs";
import BlogDetails from "./Components/BlogDetails";
import UserBlogs from "./Components/UserBlogs";
import AddBlog from "./Components/AddBlog";
import { authAction } from "./Store";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authAction.login());
    }
  });

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          {!isLoggedIn ? (
            <Route path="/auth" element={<Auth />} />
          ) : (
            <>
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/myBlogs" element={<UserBlogs />} />
              <Route path="/blogs/add" element={<AddBlog />} />
              <Route path="/myBlogs/:id" element={<BlogDetails />} />
            </>
          )}
        </Routes>
      </main>
    </>
  );
}

export default App;
