import React from "react";
import PageTitle from "../../components/PageTitle";
import BusForm from "../../components/BusForm";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { message, Table } from "antd";

function AdminBuses() {
  const [showBusForm, setShowBusForm] = useState(false);
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const dispatch = useDispatch();
  console.log("Admin-Bus");
  const columns = [
    {
      title: "name",
      dataIndex: "name",
    },
    {
      title: "Number",
      dataIndex: "number",
    },
    {
      title: "From",
      dataIndex: "from",
    },
    {
      title: "To",
      dataIndex: "to",
    },
    {
      title: "Journey Date",
      dataIndex: "journeyDate",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (action, record) => (
        <div className="d-flex gap-3">
          <svg
            className="svg-icon"
            onClick={() => {
              deleteBus(record._id);
            }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="rgba(86,27,27,1)"
          >
            <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
          </svg>
          <svg
            onClick={() => {
              setSelectedBus(record);
              setShowBusForm(true);
            }}
            className="svg-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path d="M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z"></path>
          </svg>
        </div>
      ),
    },
  ];
  const deleteBus = async (_id) => {
    try {
      dispatch(showLoading);
      const response = await axiosInstance.post(
        "http://localhost:5000/api/admin/delete-bus",
        {
          _id: _id,
        }
      );
      console.log(response.data);
      getBuses();
      message.success(response.message);
      dispatch(hideLoading);
    } catch (error) {
      message.error(error.message);
    }
  };
  const getBuses = async () => {
    try {
      dispatch(showLoading());
      const response = await axiosInstance.post(
        "http://localhost:5000/api/admin/get-all-buses",
        {}
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setBuses(response.data.data);
        console.log(response.data.data);
      }
      //message.success(response.data.message);
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    getBuses();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between my-2">
        <PageTitle title="Buses" />
        <button
          className="primary-btn"
          onClick={() => {
            setShowBusForm(true);
          }}
        >
          Add Bus
        </button>
      </div>
      <Table columns={columns} dataSource={buses} />
      {showBusForm && (
        <BusForm
          showBusForm={showBusForm}
          setShowBusForm={setShowBusForm}
          type={selectedBus ? "edit" : "add"}
          selectedBus={selectedBus}
          getData={getBuses}
          setSelectedBus={setSelectedBus}
        ></BusForm>
      )}
    </div>
  );
}

export default AdminBuses;
