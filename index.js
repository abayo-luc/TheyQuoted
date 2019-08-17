import express from 'express';
import scrap from './scrap';
import { getQuotes } from './data';
import { isQueryProvided } from './validator';
const app = express();

app.use(express.json());

app.get('/data', isQueryProvided, getQuotes, scrap);
app.use('*', (req, res) =>
  res
    .status(404)
    .json({ message: 'API endpoint not found, try /data?query=something' })
);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
