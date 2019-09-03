const toJson = data => {
  return JSON.stringify(data);
};
const jsonResponse = (res, code = 400, payload) => {
  res.writeHead(code, { 'Content-type': 'application/json' });
  res.end(toJson(payload));
};

module.exports = { toJson, jsonResponse };
