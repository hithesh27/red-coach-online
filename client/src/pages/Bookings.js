import React from 'react'
import PageTitle from "../components/PageTitle";
import { useState, useEffect } from "react";
import { axiosInstance } from "../axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { message, Modal, Table } from "antd";
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
function Bookings() {
  const dispatch=useDispatch();
  const [showPrintModal,setShowPrintModal]=useState(false);
  const [selectedBooking,setSelectedBooking]=useState(null);
  const [bookings,setBookings]=useState([]);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const columns = [
    {
      title: "Bus Name",
      dataIndex: "name",
    },
    {
      title: "Bus Number",
      dataIndex: "number",
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
      render:(text,record)=>(
        <div>
          <h1 className='text-md underline'
          onClick={()=>{
          setSelectedBooking(record)
          setShowPrintModal(true);
          }
        }
          >
            print ticket
          </h1>
        </div>
      )
}
  ];
  
  const getBookings = async () => {
    try {
      dispatch(showLoading());
      const response = await axiosInstance.post(
        "http://localhost:5000/api/bookings/get-bookings-by-user-id",
        {}
      )
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
      <div className='mt-2'>
      <Table dataSource={bookings} columns={columns} rowKey={record => `${record.number}-${record.selectedSeats}`}></Table>
      </div>

      {selectedBooking  && 
          <Modal title='Print Ticket'
          onCancel={
            ()=>{
              setSelectedBooking(null);
              setShowPrintModal(false);
            }
          }
          open={showPrintModal}
          okText='Print'
          onOk={handlePrint}
          >
            <br/>
            <div className='d-flex flex-column p-5' ref={componentRef} >
            <p className='text-lg'>Bus: {selectedBooking.name}</p>
            <p className='text-md text-secondary'>{selectedBooking.from} - {selectedBooking.to}</p>
            <hr/>
            <p>
                <span className='text-secondary'>JourneyDate: </span>
                {selectedBooking.journeyDate}
            </p>
            <p>
                <span className='text-secondary'>DepartureTime: </span>
                {selectedBooking.departure}
            </p>
            <p>
                <span className='text-secondary'>ArrivalTime: </span>
                {selectedBooking.arrival}
            </p>
            <br/>
            <p>
                <span className='text-secondary'>seats: </span>
                {selectedBooking.selectedSeats}
            </p>
            <hr/>
            <p>
            <span className='text-secondary'>Total secondary: </span>
                {selectedBooking.selectedSeats.split(',').length * selectedBooking.fare}
            </p>
            </div>

          </Modal>
        }
      
    </div>
  )
}

export default Bookings