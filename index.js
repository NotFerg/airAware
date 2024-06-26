const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

app.get('/', function (req, res) {
  res.render('index');  
});

app.get('/dashboard', async function (req, res) {
  try {
    const response = await axios.get(`https://api.thingspeak.com/channels/${process.env.CHANNEL_ID}/feeds.json`, {
      params: {
        api_key: process.env.READ_API_KEY,
        results: 1 // Fetch only the most recent data point
      }
    });
    const data = response.data.feeds;
    console.log(data);
    res.render('dashboard', { data });
  } catch (error) {
    console.error('Error fetching data from ThingSpeak:', error);
    res.status(500).send('Error fetching data from ThingSpeak');
  }
});

app.get('/fetch-data', async function (req, res) {
  const selectedDate = req.query.date;
  
  if (!selectedDate) {
    return res.status(400).send('Date parameter is required');
  }

  try {
    const response = await axios.get(`https://api.thingspeak.com/channels/${process.env.CHANNEL_ID}/feeds.json`, {
      params: {
        api_key: process.env.READ_API_KEY,
        start: `${selectedDate} 00:00:00`,
        end: `${selectedDate} 23:59:59`,
        results: 1 // Fetch only the most recent data point
      }
    });
    
    const data = response.data.feeds;
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from ThingSpeak:', error);
    res.status(500).send('Error fetching data from ThingSpeak');
  }
});

app.get('/aboutUs', function (req, res) {
  res.render('aboutUs');  
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
