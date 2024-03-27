import React from "react";
import { useState, useEffect } from "react";
import { axiosInstance } from "../axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { Button, Col, Input, Row, message } from "antd";
import Bus from "../components/Bus";
import axios from "axios";

function Home() {
  const userName = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [buses, setBuses] = useState([]);
  const [filters,setFilters]=useState('');
  const [clear,setClear]=useState(false);
  const getBuses = async () => {
    const tempFilters={};
    Object.keys(filters).forEach((key)=>{
      if(filters[key]){
        tempFilters[key]=filters[key];
      }
      }
    )
    try {
      dispatch(showLoading());
      const response = await axiosInstance.post(
        "http://localhost:5000/api/users/get-all-buses",
        tempFilters
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
  }, [clear]);
  return (
    <div>
      <div className="my-3  py-1">
        <Row gutter={10} align='center' >
          <Col lg={6} sm={24}>
            <Input type='text' placeholder="From" value={filters.from} onChange={(e)=>setFilters({...filters,from:e.target.value})}/>
          </Col>
          <Col lg={6} sm={24}>
            <Input type='text' placeholder="To" value={filters.to} onChange={(e)=>setFilters({...filters,to:e.target.value})}/>
          </Col>
          <Col lg={6} sm={24}>
            <Input type='date' placeholder="Date" value={filters.journeyDate} onChange={(e)=>setFilters({...filters,journeyDate:e.target.value})}/>
          </Col>
          <Col lg={6} sm={24}>
          <div className="d-flex gap-2">
            <button className="primary-btn" onClick={()=>{getBuses()}}>Filter</button>
            <button className="outlined" onClick={()=>{
              setFilters({
                from :'',
                date:'',
                journeyDate:''
              })
              setClear((clear)=>!clear);
              }}>Clear</button>
            </div>
          </Col>
        </Row>
      </div>
      <Row>
        {buses.filter(bus=> bus.status==='Yet To Start').map((bus) => {
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
