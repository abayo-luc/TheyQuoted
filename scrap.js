import http from 'https';
import cheerio from 'cheerio';
import url from 'url';
import dotenv from 'dotenv';
import uuid from 'uuid/v4';
import { saveQuotes } from './data';
const { jsonResponse } = require('./helper');

dotenv.config();
const { URL } = process.env;

export default (req, res) => {
  const {
    query: { query }
  } = url.parse(req.url, true);
  return http
    .get(`${URL}?q=${query}`, resp => {
      let data = '';
      resp.on('data', chunk => {
        data += chunk;
      });
      return resp.on('end', () => {
        const $ = cheerio.load(data);
        const quotes = [];
        $('div.qll-bg').map(function() {
          quotes.push({
            cacheId: uuid(),
            description: $(this)
              .find('a.b-qt')
              .text(),
            author: $(this)
              .find('a.bq-aut')
              .text()
          });
        });
        if (quotes.length >= 1) {
          saveQuotes(res, quotes);
        } else {
          jsonResponse(res, 404, { message: 'Success', quotes });
        }
      });
    })
    .on('error', err => {
      jsonResponse(res, 400, { error: err.message });
    });
};
