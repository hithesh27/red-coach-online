import React from "react";
import "../resources/layout.css";
import Item from "antd/es/list/Item";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { message } from "antd";

function DefaultLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-profile-line",
    },
    {
      name: "Bookings",
      path: "/bookings",
      icon: "ri-file-list-line",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-box-line",
    },
  ];
  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Buses",
      path: "/admin/buses",
      icon: "ri-bus-line",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "ri-file-user-line",
    },
    {
      name: "Bookings",
      path: "/bookings",
      icon: "ri-file-list-line",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-box-line",
    },
  ];
  const menuToBeRendered = user.isAdmin ? adminMenu : userMenu;
  let activeRoute = window.location.pathname;
  if (window.location.pathname.includes("booknow")) {
    activeRoute = "/";
  }
  return  (  
    <div className="layout-parent">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <h1>RC</h1>
          </div>
          <div className="role">
            {user.name}
            <br />
            Role : {user.isAdmin ? "Admin" : "user"}
          </div>
        </div>
        <div className="d-flex flex-column gap-3 justify-content-start menu">
          {menuToBeRendered.map((Item, index) => {
            return (
              <div
                className={`${
                  activeRoute === Item.path && "active-menu-item"
                }  menu-item `}
                key={index}
              >
                <i className={Item.icon}></i>
                {!collapsed && (
                  <span
                    onClick={() => {
                      if (Item.name !== "Logout") navigate(Item.path);
                      else {
                        localStorage.removeItem("token");
                        message.success("LoggedOut successfully");
                        navigate("/login");
                      }
                    }}
                  >
                    {Item.name}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="body">
        <div className="header">
          {collapsed ? (
            <i
              onClick={() => {
                setCollapsed((collapsed) => !collapsed);
              }}
              className="ri-menu-2-line"
            ></i>
          ) : (
            <i
              onClick={() => {
                setCollapsed((collapsed) => !collapsed);
              }}
              className="ri-close-line"
            ></i>
          )}
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;