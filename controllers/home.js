module.exports = app =>{
  app.get('/', (req, res) =>{
    res.send('Bem-vindo a API de Atendimentos de Pets. \n Rotas: /atendimentos(GET - POST)');
  });
}