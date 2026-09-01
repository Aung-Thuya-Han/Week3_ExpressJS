import express from 'express';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.send('Welcome to my REST API, Yeah Yahoo!');
});

app.get('/api/v1/cats', (req, res) => {
  const myData = [
  {
    cat_id: 1,
    name: "My Cat",
    birthdate: "1.1.2026",
    weight: 5,
    owner: "Aung",
    image: "https://placekittens.com/200/300",
  }
];
  res.json(myData);
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});