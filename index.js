const app = require('http').createServer();
const querystring = require('url');
const { getQuotes } = require('./data');
const { jsonResponse } = require('./helper');
const { HOME, QUOTES } = require('./routes');
app.on('request', async (req, res) => {
  const { pathname } = querystring.parse(req.url, true);
  switch (pathname) {
    case HOME:
      jsonResponse(res, 200, { message: 'Welcome to TheySaid API' });
      break;
    case QUOTES:
      getQuotes(req, res);
      break;
    default:
      jsonResponse(res, 404, { error: 'Router not found' });
      break;
  }
});

app.listen(3000, () => console.log('server listening to 3000'));
