const express = require('express');
const app = express();
const port = 3000;

// Serve static files from the `public` directory
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/hacker.php', (req, res) => {
  console.log(Date.now() + 'XSS Attack successful', req.query)
  return res.status(200).send({ message: `${Date.now()} Data Exfiltrated: ${ JSON.stringify(req.query) }` });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
