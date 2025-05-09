// backend/server.js
const express = require('express');
const https = require('https');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/check', (req, res) => {
  const host = req.query.host;
  if (!host) return res.status(400).json({ error: 'Missing host parameter' });

  const options = {
    method: 'HEAD',
    host: host,
    port: 443,
    path: '/',
    timeout: 5000
  };

  const request = https.request(options, (response) => {
    res.json({ host, statusCode: response.statusCode });
  });

  request.on('error', (err) => {
    res.json({ host, statusCode: 'FAILED', error: err.message });
  });

  request.end();
});

app.listen(PORT, () => {
  console.log(`Bug Host Scanner API running at http://localhost:${PORT}`);
});
