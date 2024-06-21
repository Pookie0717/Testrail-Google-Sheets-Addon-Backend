const express = require('express');
const cors = require('cors');
const axios = require('axios');
const ngrok = require('ngrok');

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/fetchData', async (req, res) => {
  try{
    console.log(req.query);
    const tarUrl = req.query.tarUrl;
    const token = req.query.options ? req.query.options.token : null;
    // const username = req.query.username;
    // const apiKey = req.query.password;
    if (!tarUrl) {
      return res.status(400).send('URL parameter is missing');
    }
    const fetchData = await axios.get(tarUrl, {

    });
    res.send(fetchData.data);
  } catch(error) {
    console.error('Error fetching data:', error.message);
    if (error.response) {
      res.status(error.response.status).send(error);
    } else {
      res.status(500).send('An error occurred while fetching data');
    }
  }
});

app.get('/getData', async (req, res) => {
  console.log(req.query)
  try{
    const url = req.query.tarUrl;
    if (!url) {
      return res.status(400).send('URL parameter is missing');
    }
    const fetchData = await axios.get(url, {
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${req.query.token}`
      }
    });
    res.json(fetchData.data);
  } catch(error) {
    console.error(error.message);
  }
})

app.post('/postData', async(req, res) => {
  try{
    const url = req.query.tarUrl;
    if (!url) {
      return res.status(400).send('URL parameter is missing');
    }
    const token = req.query.options?.token;
    if (!token) {
      return res.status(400).json({ error: 'Missing token' });
    }
    const fetchData = await axios.post(url, {
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${req.query.options?.token}`
      },
      data: req.body.payload
    });
    res.json(fetchData.data);
  } catch {
    console.error(error.message);
  }
})

app.get('/checkAuth', async(req, res) => {
  try{
    const url = req.query.tarUrl;
    if (!url) {
      return res.status(400).send('URL parameter is missing');
    }
    const fetchData = await axios.get(url, {
      headers: {
        Accept: 'application/json',
      }
    });
    res.json(fetchData.data);
  } catch {
    console.error(error.message)
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// export async function runServer(port) {
//   await app.listen({ port });
//   console.log(`Server is running on http://localhost:${port}`);
  // try {
  //   const url = await ngrok.connect({
  //     addr: PORT,
  //     authtoken: '2hN1h0n0nswndFpONhT5Qp7ej6e_6HXxCRnjKhKLPh286NUMW'
  //   });
  //   console.log(`Ngrok tunnel opened at: ${url}`);
  // } catch (err) {
  //   console.error('Error opening Ngrok tunnel:', err);
  // }
// }