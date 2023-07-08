import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';

const LivePrice = () => {
  const [livePrice, setLivePrice] = useState(null);

  useEffect(() => {
    fetchLivePrice();
    // Fetch live price every 1 minute
    const interval = setInterval(fetchLivePrice, 60000);
    return () => clearInterval(interval);//cleanp function
  }, []);
  
  const fetchLivePrice = async () => {
      try {
        const response = await axios.get('http://localhost:8001/live-price');
        //console.log(response,'sdsfsfs')
        setLivePrice(response.data.data);

      } catch (error) {
        console.log(error);
      }
    };
 console.log(livePrice,'sdsfsfs')
  return (
    <div className="container">
      <h1 className="mt-4">Live Price</h1>
      {livePrice ? (
        <Card>
          <Card.Body>
            <Card.Text>symbol: {livePrice.symbol}</Card.Text>
            <Card.Text>Bid Price: {livePrice.bidPrice}</Card.Text>
            <Card.Text>Bid Quantity: {livePrice.bidQty}</Card.Text>
            <Card.Text>Ask Price: {livePrice.askPrice}</Card.Text>
            <Card.Text>Ask Quantity: {livePrice.askQty}</Card.Text>
            <Card.Text>Time: {livePrice.time}</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LivePrice;
