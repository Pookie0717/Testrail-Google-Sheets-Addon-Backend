const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const ngrok = require('ngrok');
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/fetchData', async (req, res) => {
  try{
    const tarUrl = req.query.tarUrl;
    const username = req.query.username;
    const apiKey = req.query.password;
    if (!tarUrl) {
      return res.status(400).send('URL parameter is missing');
    }
    if (!username || !apiKey) {
      return res.status(400).send('Username or API key parameter is missing');
    }
    const fetchData = await axios.get(tarUrl, {
      auth: {
        username: username,
        password: apiKey
      }
    });
    res.send(fetchData.data);
  } catch(error) {
    console.error('Error fetching data:', error.message);
    if (error.response) {
      res.status(error.response.status).send(error.response.statusText);
    } else {
      res.status(500).send('An error occurred while fetching data');
    }
  }
})

app.listen(3000, async() => {
  console.log('Server is running on port', PORT);
  // try {
  //   const url = await ngrok.connect({
  //     addr: PORT,
  //     authtoken: '2hN1h0n0nswndFpONhT5Qp7ej6e_6HXxCRnjKhKLPh286NUMW'
  //   });
  //   console.log(`Ngrok tunnel opened at: ${url}`);
  // } catch (err) {
  //   console.error('Error opening Ngrok tunnel:', err);
  // }
});
