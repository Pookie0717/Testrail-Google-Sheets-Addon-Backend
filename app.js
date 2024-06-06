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
    res.send(fetchData);
  } catch(error) {
    console.error('Error fetching data:', error.message);
    if (error.response) {
      res.status(error.response.status).send(error);
    } else {
      res.status(500).send('An error occurred while fetching data');
    }
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