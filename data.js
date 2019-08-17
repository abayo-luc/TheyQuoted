import db from './models';
import sequelize from 'sequelize';
const { Op } = sequelize;
const { Quote } = db;

export const getQuotes = async (req, res, next) => {
  try {
    const { query } = req.query;
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
    if (quotes.length < 2) {
      return next();
    }
    return res.status(200).json({ message: 'Success', quotes });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
