import React from "react";
import { useState, useEffect } from "react";
import { axiosInstance } from "../axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { Col, Row, message } from "antd";
import Bus from "../components/Bus";
import axios from "axios";

function Home() {
  const userName = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [buses, setBuses] = useState([]);

  const getBuses = async () => {
    try {
      dispatch(showLoading());
      const response = await axiosInstance.post(
        "http://localhost:5000/api/users/get-all-buses",
        {}
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setBuses(response.data.data);
      }
    }catch (error) {
      message.error(error.message);
    }
  }
  useEffect(() => {
    getBuses();
  }, []);
  return (
    <div>
      <Row>
        {buses.map((bus) => {
          return ( 
            <Col lg={12} xs={24} sm={24} key={bus._id}>
              <Bus bus={bus} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default Home;
