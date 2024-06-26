import React from "react";
import { Form, Modal, Row, Col, message, Select } from "antd";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../axiosInstance";
import { showLoading, hideLoading } from "../redux/alertsSlice";


function BusForm({
  showBusForm,
  setShowBusForm,
  type,
  getData,
  selectedBus,
  setSelectedBus,
}) {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    let response = null;
    try {
      dispatch(showLoading());

      if (type === "add") {
        response = await axiosInstance.post(
          "http://localhost:5000/api/admin/buses",
          values
        );
      } else {
        response = await axiosInstance.post(
          "http://localhost:5000/api/admin/buses-update-bus",
          {
            ...values,
            _id: selectedBus._id,
          }
        );
      }
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
      getData();
      setShowBusForm(false);
      setSelectedBus();
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };
  return (
    <Modal
      width={800}
      title="Add Bus"
      open={showBusForm}
      onCancel={() => {
      setShowBusForm(false);
      setSelectedBus(null)
      }}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} initialValues={selectedBus}>
        <Row>
          <Col lg={24} xs={24}>
            <Form.Item label="Bus Name" name="name">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Bus Number" name="number">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Capacity" name="capacity">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="From" name="from">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="To" name="to">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item label="Journey Date" name="journeyDate">
              <input type="date" />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item label="Departure" name="departure">
              <input type="time" />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item label="Arrival" name="arrival">
              <input type="time" />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item label="Type" name="type">
            <Select name='' id=''>
                <Select.Option value='AC'>AC</Select.Option>
                <Select.Option value='NON-AC'>NON-AC</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item label="Fare" name="fare">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label='Status' name='status'>
              <Select name='' id=''>
                <Select.Option value='Yet To Start'>Yet To Start</Select.Option>
                <Select.Option value='Running'>Running</Select.Option>
                <Select.Option value='Completed'>Completed</Select.Option>
              </Select>
            </Form.Item>
          </Col>


        </Row>
        <div className="d-flex justify-content-end">
          <button className="primary-btn" type="submit">
            {selectedBus===null ? 'Add' :'Save'}
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default BusForm;