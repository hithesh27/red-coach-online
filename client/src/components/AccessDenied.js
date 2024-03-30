import React from 'react';
import '../resources/accessDenied.css'; // Import your CSS file for styling

function AccessDenied() {
  return (
    <div className="access-denied-container">
      <h1>Access Denied</h1>
      <p>You are not authorized to access this page.</p>
    </div>
  );
}

export default AccessDenied;
