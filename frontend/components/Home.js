import React from 'react';
import { useNavigate } from 'react-router-dom';
import pizza from './pizza.jpg'; 

function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/order');
  };

  return (
    <div>
      <h2>Welcome to Bloom Pizza!</h2>
      {/* clicking on the img should navigate to "/order" */}
      <img
        src={pizza}
        alt="order-pizza"
        style={{ cursor: 'pointer' }}
        onClick={handleClick}
      />
    </div>
  );
}

export default Home;
