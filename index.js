const express = require('express');
const app = express();

const PORT = 3000

app.get('/', (req, res) =>{
  res.send('Hello World');
});

app.get('/atendimentos', (req, res) =>{
  res.send('Rota de atendimentos');
});

app.listen(PORT, () =>{
  console.log(`Server listenig at PORT ${PORT}` )
});