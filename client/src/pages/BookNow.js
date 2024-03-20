import React from "react";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { axiosInstance } from "../axiosInstance";
import { useParams } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { Row, Col, message } from "antd";
import SeatSelection from "../components/SeatSelection";
import "../resources/bus.css";

function BookNow() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [bus, setBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const bookNow = async () => {
    try {
      dispatch(showLoading());
      console.log(bus._id, "*******");
      const response = await axiosInstance.post(
        "http://localhost:5000/api/bookings/book-seat",
        {
          bus: bus._id,
          selectedSeats: selectedSeats,
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        // console.log(response.data.data);
      } else {
        message.error(response.data.message);
      }
      //message.success(response.data.message);
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };
  const getBus = async (id) => {
    try {
      dispatch(showLoading());
      const response = await axiosInstance.post(
        "http://localhost:5000/api/admin/get-bus-by-id",
        {
          id: id,
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setBus(response.data.data);
        // console.log(response.data.data);
      }
      //message.success(response.data.message);
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    getBus(id);
  }, []);
  console.log(bus, "booknow");
  return (
    <div>
      {bus && (
        <Row className="mt-3">
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
              <button
                className={`btn btn-primary ${
                  selectedSeats.length === 0 && "disabled-btn"
                }`}
                disabled={selectedSeats.length === 0}
                onClick={bookNow}
              >
                BookNow
              </button>
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
