import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { setUser } from "../redux/usersSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import DefaultLayout from "./DefaultLayout";
import { axiosInstance } from "../axiosInstance";

function ProtectedRoute({ children }) {
  
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const verifyToken = async () => {
    dispatch(showLoading());
    try {
      const response = await axiosInstance.post(
        "http://localhost:5000/api/users/get-user-by-id",
        {}
      );
      dispatch(hideLoading());
      if (response.data.success) {
        dispatch(setUser(response.data.data));
      } else {
        localStorage.removeItem("token");
        message.error(response.data.message);
        Navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      verifyToken();
    } else {
      Navigate("/login");
    }
  }, []);
  return <div>{<DefaultLayout>{children}</DefaultLayout>}</div>;
}

export default ProtectedRoute;
