import React from "react";
import { Row, Col } from "antd";
function SeatSelection({ selectedSeats, setSelectedSeats, bus }) {
  const capacity = bus.capacity;
  const selectOrUnSelectSeats = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  return (
    <div>
      <div className="bus-container">
        <Row gutter={[10, 10]}>
          {Array.from(Array(capacity).keys()).map((seat) => {
            let classSeat = "";
            if (selectedSeats.includes(seat + 1)) {
              classSeat = "selected-seat";
            } else if (bus.seatsBooked.includes(seat + 1)) {
              classSeat = "booked-seat";
            }
            return (
              <Col span={6}>
                <div
                  className={`seat ${classSeat}`}
                  onClick={() => {
                    selectOrUnSelectSeats(seat + 1);
                  }}
                >
                  {seat + 1}
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}

export default SeatSelection;