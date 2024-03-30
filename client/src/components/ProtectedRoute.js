import React from "react";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { setUser } from "../redux/usersSlice";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import DefaultLayout from "./DefaultLayout";
import { axiosInstance } from "../axiosInstance";
import AccessDenied from "./AccessDenied";

function ProtectedRoute({ children,isAdminPage }) {  
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [showChildern,setShowChildren]=useState(false);
  const [denied,setDenied]=useState(false);
  const verifyToken = async () => {
    dispatch(showLoading());
    try {
      const response = await axiosInstance.post(
        "http://localhost:5000/api/users/get-user-by-id",
        {}
      );
      dispatch(hideLoading());
      if (response.data.success) {
        const role=response.data?.data?.isAdmin;
        if((isAdminPage===true && role===true) || isAdminPage===false){
          setShowChildren(true)
          dispatch(setUser(response.data.data));
        }else{
            setDenied(true);        }
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
  }, [])
  return (<>{showChildern ? (<div><DefaultLayout>{children}</DefaultLayout></div>) : <></>}
  
  {denied ? (<AccessDenied/>):<></>}

  </>)
}

export default ProtectedRoute;