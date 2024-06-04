import express from 'express';
import cors from 'cors';
import axios from 'axios';
import ngrok from 'ngrok';
import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = express();

const router = new Router();

app.use(router.routes());
app.use(router.allowedMethods());

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

export async function runServer(port) {
  await app.listen({ port });
  console.log(`Server is running on http://localhost:${port}`);
  // try {
  //   const url = await ngrok.connect({
  //     addr: PORT,
  //     authtoken: '2hN1h0n0nswndFpONhT5Qp7ej6e_6HXxCRnjKhKLPh286NUMW'
  //   });
  //   console.log(`Ngrok tunnel opened at: ${url}`);
  // } catch (err) {
  //   console.error('Error opening Ngrok tunnel:', err);
  // }
}

if (import.meta.main) {
  runServer(3000);
}