import React from "react";
import PageTitle from "../../components/PageTitle";
import BusForm from "../../components/BusForm";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { message, Table } from "antd";
import "antd/dist/reset.css";
import {axiosInstance}  from "../../axiosInstance";
function AdminUsers() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const updateUserPermissions=async (user,action)=>{
    try{
      let payload=null;
      if(action=="unblock"){
        payload={
          ...user,
          isBlocked:false,
        }
      }else if(action=="block"){
        payload={
          ...user,
          isBlocked:true
        }
      }else if(action=="remove-admin"){
        payload={
          ...user,
          isAdmin:false
        }
      }else if(action=="make-admin"){
        payload={
          ...user,
          isAdmin:true,
        }
      }
      dispatch(showLoading());
      const response=await axiosInstance.post("http://localhost:5000/api/users/update-user-permission",payload);
      dispatch(hideLoading());
      if (response.data.success) {
        getUsers();
        message.success(response.data.message);
      }else{
        message.error(response.data.message);
      }
      //message.success(response.data.message);
    }catch (error) {
      message.error(error.message);
    }
  }  
  const columns = [
    {
      title: "name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "",
      render:(data)=>{
        if(data.isAdmin){
          return 'Admin'
        }
        return 'User'
      }
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (action, record) => (
        <div>
          {record?.isBlocked &&  <p className="underline" onClick={()=>updateUserPermissions(record,"unblock")}>UnBlock</p>}
          {!record?.isBlocked &&  <p className="underline" onClick={()=>updateUserPermissions(record,"block")}>Block</p>}
          {record?.isAdmin &&  <p className="underline" onClick={()=>updateUserPermissions(record,"remove-admin")}>Remove Admin</p>}
          {!record?.isAdmin &&  <p className="underline" onClick={()=>updateUserPermissions(record,"make-admin")}>Make Admin</p>}
        </div>
      ),
    },
  ];
  const getUsers = async () => {
    try {
      dispatch(showLoading());
      const response = await axiosInstance.post(
        "http://localhost:5000/api/users/get-all-users",
        {}
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setUsers(response.data.data);
      }
      //message.success(response.data.message);
    } catch (error) {
      message.error(error.message);
    }
  }
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between my-2">
        <PageTitle title="Users" />
      </div>
      <Table columns={columns} dataSource={users} />
    </div>
  );
}

export default AdminUsers;