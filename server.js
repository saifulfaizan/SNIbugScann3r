// server.js
const express = require('express');
const https = require('https');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Serve tron.html di route root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'tron.html'));
});

// API untuk semak domain
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

// Mula server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
