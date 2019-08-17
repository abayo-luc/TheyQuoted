import request from 'request';
import cheerio from 'cheerio';
import dotenv from 'dotenv';
import db from './models';
const { Quote } = db;
dotenv.config();
const { URL } = process.env;
const saveQuotes = quotes => {
  try {
    Quote.bulkCreate(quotes);
  } catch (error) {
    console.log(error.message);
  }
};

const notFound = res =>
  res.status(404).json({ message: 'Oops! not quote found' });
export default async (req, res) => {
  try {
    const { query } = req.query;
    request(`${URL}?q=${query}`, async (error, response, html) => {
      if (error) {
        throw new Error('Something happened');
      }
      if (!response || response.statusCode != 200) {
        return notFound(res);
      }

      const $ = cheerio.load(html);
      const quotes = [];
      $('.qll-bg .clearfix').each((i, elm) => {
        const quote = $(elm).children();
        if (quote.length > 0) {
          quotes.push({
            author: quote
              .last()
              .children()
              .first()
              .text(),
            description: quote.first().text()
          });
        }
      });
      if (quotes.length > 0) {
        saveQuotes(quotes);
        return res.status(200).json({
          message: 'success',
          quotes: quotes.map((item, id) => ({ id, ...item }))
        });
      }
      return notFound(res);
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
