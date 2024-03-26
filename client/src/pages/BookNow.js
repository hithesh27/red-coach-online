import React from "react";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { axiosInstance } from "../axiosInstance";
import { useParams } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { Row, Col, message } from "antd";
import SeatSelection from "../components/SeatSelection";
import "../resources/bus.css";
import StripeCheckout from 'react-stripe-checkout'

function BookNow() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [bus, setBus] = useState(null)
  const [selectedSeats, setSelectedSeats] = useState([])

  const bookNow = async (transactionId) => {
    try {
      dispatch(showLoading());
      const response = await axiosInstance.post(
        "http://localhost:5000/api/bookings/book-seat",
        {
          bus: bus._id,
          selectedSeats: selectedSeats,
          transactionId
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        setSelectedSeats([]);
        getBus(id);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  }
  const getBus = async (id) => {
    try {
      dispatch(showLoading());
      const response = await axiosInstance.post(
        "http://localhost:5000/api/users/get-bus-by-id",
        {
          id: id,
        }
      )
      dispatch(hideLoading());
      if (response.data.success) {
        setBus(response.data.data);
      }
    } catch (error) {
      message.error(error.message);
    }
  }
  useEffect(() => {
    getBus(id);
  }, [])
  const onToken=async (token)=>{
    try{
      dispatch(showLoading());
      const response=await axiosInstance.post("http://localhost:5000/api/bookings/make-payment",{
        token,
        amount:selectedSeats.length*bus.fare*100
      })
      dispatch(hideLoading());
      if(response.data.success){
        message.success(response.data.message);
        bookNow(response.data.data.transactionId);
      }else{
        message.error(response.data.message);
      }
    }
    catch(error){
      dispatch(hideLoading());
      message.error(error.message);
    }
    console.log(token);
  }
  return (
    <div>
      {bus && (
        <Row className="mt-3" gutter={[30,30]}>
          <Col lg={12} xs={24} sm={24}>
            <h1 className="text-2xl text-secondary">{bus.name}</h1>
            <h1 className="text-md">
              {bus.from} - {bus.to}
            </h1>
            <hr />
            <div className="flex flex-call gap-1">
              <h1 className="text-lg">
                <b>JourneyDate</b> : {bus.journeyDate}
              </h1>
              <h1 className="text-lg">
                <b>Fare</b> : {bus.fare}/-
              </h1>
              <h1 className="text-lg">
                <b>DepartureTime</b> : {bus.departure}
              </h1>
              <h1 className="text-lg">
                <b>ArrivalTime</b> : {bus.arrival}
              </h1>
              <h1 className="text-lg">
                <b>capacity</b> : {bus.capacity}
              </h1>
              <h1 className="text-lg">
                <b>seats Left</b> : {bus.capacity - bus.seatsBooked.length}
              </h1>
            </div>
            <hr />
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl ">
                <b>selectedSeats: </b>
                {selectedSeats.join(" ,")}
              </h1>
              <h1 className="text-2xl mt-2 ">
                <b>price: </b>
                {selectedSeats.length * bus.fare}
              </h1>
              <hr />
              <StripeCheckout
                billingAddress
                token={onToken}
                amount={selectedSeats.length*bus.fare*100}
                currency="INR"
                stripeKey="pk_test_51OxXPgSASpGddZqZ8zqhOF0dPGDfVbn7loeZNRRrw7hV4wTSam3uBDlVOB9JK5A4btPzoFG2aM7XFKX49r2A8fZx00U5eY0k52"
              >
                <button
                  className={`btn btn-primary ${
                    selectedSeats.length === 0 && "disabled-btn"
                  }`}
                  disabled={selectedSeats.length === 0}
                >
                  BookNow
                </button>
              </StripeCheckout>
            </div>
          </Col>
          <Col lg={12} xs={24} sm={24}>
            <SeatSelection
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              bus={bus}
            />
          </Col>
        </Row>
      )}
    </div>
  );
}

export default BookNow;