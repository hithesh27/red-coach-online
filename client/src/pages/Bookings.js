import React from 'react'
import PageTitle from "../components/PageTitle";
import BusForm from "../components/BusForm";
import { useState, useEffect } from "react";
import { axiosInstance } from "../axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { message, Table } from "antd";

function Bookings() {
  const dispatch=useDispatch();
  const [bookings,setBookings]=useState([]);
  const columns = [
    {
      title: "Bus Name",
      dataIndex: "name",
      key: "bus",
    },
    {
      title: "Bus Number",
      dataIndex: "number",
      key: "bus",
    },
    {
      title: "Journey Date",
      dataIndex: "journeyDate",
    },
    {
      title: "Journey Time",
      dataIndex: "departure",
    },
    {
      title: "Seats",
      dataIndex: "selectedSeats"
    },
    {
      title: 'Action',
      dataIndex: "action",
      render:(text,record)=>{
       return  <div>
          <h1 className='text-md underline'>
            print ticket
          </h1>
        </div>
      }
    }
  ];
  
  const getBookings = async () => {
    try {
      dispatch(showLoading());
      const response = await axiosInstance.post(
        "http://localhost:5000/api/bookings/get-bookings-by-user-id",
        {}
      );
      dispatch(hideLoading());
      if (response.data.success) {
        const mappedData = response.data.data.map((booking)=>{
          const {bus}=booking;
          const selectedSeats=booking.selectedSeats.join(',');
          return {
            selectedSeats,
            ...bus,
            
            key:booking._id
          }
        })
        setBookings(mappedData);
      }
      //message.success(response.data.message);
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    getBookings();
  }, []);
  return (
    <div>
      <PageTitle title="Bookings"/>
      <Table dataSource={bookings} columns={columns}></Table>
    </div>
  )
}

export default Bookings
