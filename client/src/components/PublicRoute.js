import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function PublicRoute({ children }) {
  console.log("public route");
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  const present = localStorage.getItem("token");
  console.log(localStorage.getItem("token") === null, "login");
  console.log("*", localStorage.getItem("token"), "*");
  return <div>{children}</div>;
}

export default PublicRoute;
