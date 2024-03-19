import React from "react";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { axiosInstance } from "../axiosInstance";
import { useParams } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { Row, Col, message } from "antd";

function BookNow() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [bus, setBus] = useState(null);
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
            <div>
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
            </div>
          </Col>
          <Col lg={12} xs={24} sm={24}></Col>
        </Row>
      )}
    </div>
  );
}

export default BookNow;
