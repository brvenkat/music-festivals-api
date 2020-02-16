import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import axios from 'axios'
import cache from 'memory-cache'
import { parseFestival } from '../utils/parse'
import { Festivals } from '../models/festival'

const app: express.Application = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
dotenv.config({ path: './.env' })

const memoryCache = new cache.Cache();

app.get('/music-festivals', async function (req, res) {
  
  let festivals
  const mkey = req.originalUrl
  try {
    const serverResponse = await axios.get<Festivals>(process.env.MUSIC_FESTIVALS_URL)
    festivals = parseFestival(serverResponse.data)
    memoryCache.put(mkey, festivals)
  } catch (e) {
    let cachedBody = memoryCache.get(mkey)
    if (cachedBody) {
      console.log('+++Returning data from cache+++')
      festivals = cachedBody
    }
  }
  res.send( { festivals })
});

let server = app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
});

module.exports = server