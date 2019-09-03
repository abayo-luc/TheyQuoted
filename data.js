import url from 'url';
import db from './models';
import sequelize from 'sequelize';
import scrape from './scrap';
const { jsonResponse } = require('./helper');
const { Op } = sequelize;
const { Quote } = db;

export const getQuotes = async (req, res) => {
  try {
    const {
      query: { query }
    } = url.parse(req.url, true);
    const text = query.toString().trim();
    const quotes = await Quote.findAll({
      where: {
        [Op.or]: [
          {
            description: {
              [Op.iLike]: `%${text}%`
            }
          },
          {
            author: {
              [Op.iLike]: `%${text}%`
            }
          }
        ]
      }
    });
    console.log(quotes.length);
    if (quotes.length < 5) {
      return scrape(req, res);
    }
    return jsonResponse(res, 200, { message: 'Success', quotes });
  } catch (error) {
    return jsonResponse(res, 400, { error: error.message });
  }
};

export const saveQuotes = async (res, quotes) => {
  try {
    const data = await Quote.bulkCreate(quotes, {
      ignoreDuplicates: true,
      individualHooks: true
    });
    jsonResponse(res, 200, { message: 'Success', quotes: data });
  } catch (err) {
    jsonResponse(res, 400, { error: err.message });
  }
};
