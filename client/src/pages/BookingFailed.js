import React from 'react';
import '../resources/bookingFailed.css'; // Import the CSS file
import {useNavigate} from 'react-router-dom'

const BookingFailed = () => {
    const navigate=useNavigate();
  const handleTryAgain = () => {
    navigate('/');
  };

  return (
    <div className="booking-failed-container">
      <h2>Booking Failed</h2>
      <p className="booking-failed-message">Money will be refunded</p>
      <button className="booking-failed-button" onClick={handleTryAgain}>Try Again</button>
    </div>
  );
};

export default BookingFailed;
