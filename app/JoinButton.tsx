import React, { useState } from 'react';

export default function JoinButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleJoinNowClick = () => {
    if (isLoggedIn) {
      // User is already logged in, show a pop-up message
      alert('You are already logged in!');
    } else {
      // User is not logged in, navigate to the registration page
      // You can use React Router or your preferred navigation method here
      // For simplicity, we'll just display a message for this example
      alert('Redirecting to the registration page...');
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <p>Welcome, user! You are already logged in.</p>
      ) : (
        <p>Click the "JOIN NOW" button to register.</p>
      )}

      <button onClick={handleJoinNowClick}>JOIN NOW</button>
    </div>
  );
}
