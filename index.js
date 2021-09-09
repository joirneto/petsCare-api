const customExpress = require('./config/customExpress');
const conexao = require('./infraestrutura/database/conexao');
const Tabelas = require('./infraestrutura/database/tabelas')

const PORT = 3000;

const app = customExpress()

conexao.connect((erro)=>{
  if(erro){
    console.log("Erro: ", erro);
  }else{
    console.log("Conexão realizada com sucesso!");
    Tabelas.init(conexao);
    
    app.listen(PORT, () =>{
      console.log(`Server listenig at PORT ${PORT}` )
    });
  }
});


