const express = require('express');
const axios = require('axios');
const cors = require('cors')
const app = express();
app.use(cors())
const API_URL = 'https://dev.pixelsoftwares.com/api.php';
const API_TOKEN = 'ab4086ecd47c568d5ba5739d4078988f';

let cachedData = null;
let lastFetchedTime = null;
let apiCallsCount = 0;

app.get('/live-price', async (req, res) => {
  if (apiCallsCount >= 3000) {
    return res.status(429).json({ error: 'API limit exceeded' });
  }

  const currentTime = new Date();
  const minutesPassed = (currentTime - lastFetchedTime) / (1000 * 60);

  if (cachedData && minutesPassed < 1) {
    return res.json(cachedData);
  }
  const data = new FormData();
  data.append('symbol', 'BTCUSDT');
  try {
    const response = await axios.post(API_URL, { symbol:'BTCUSDT' }, {
      headers: {
        'token': API_TOKEN,
        'Content-Type': 'multipart/form-data'
      }
    });

    apiCallsCount++;
    cachedData = response.data;
    lastFetchedTime = currentTime;

    res.json(response.data);
    console.log(response.data,'hyyyyyy')
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
    console.log('error',error)
  }
});

app.listen(8001, () => {
  console.log('Server is running on port 8001');
});
