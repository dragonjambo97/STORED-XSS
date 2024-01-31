const express = require('express');
const app = express();
const port = 3000;

let storedInputs = []; // Tablica do przechowywania danych

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Użyj folderu public do plików statycznych

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="/style.css">
      <title>Test Stored XSS</title>
    </head>
    <body>
      <h1>Test Stored XSS</h1>
      <form method="POST" action="/store">
        <input type="text" name="input" placeholder="Wprowadź tekst" />
        <input type="submit" value="Zapisz" />
      </form>
      <br/>
      <br/>
      <br/>
      <a href="/stored">Pokaż zapisane dane</a>
      <br/>      
    </body>
    </html>
  `);
});

app.post('/store', (req, res) => {
  storedInputs.push(req.body.input); // Zapisz dane wejściowe
  res.redirect('/stored');
});

app.get('/stored', (req, res) => {
  let content = '<h1>Zapisane dane:</h1><div>';
  storedInputs.forEach(input => {
    content += `<div>${input}</div>`;
  });
  content += '</div><br><a href="/">Powrót</a>';
  res.send(content);
});

app.listen(port, () => {
  console.log(`Serwer uruchomiony na http://localhost:${port}`);
});
