const conexao = require('../infraestrutura/conexao')

class Atendimento {
  adiciona(atendimento){
    const sql = 'INSERT INTO Atendimentos SET ?'

    conexao.query(sql, atendimento, (erro, resultado)=>{
      if(erro){
        console.error(erro);
      }else{
        console.log(resultado)
      }
    })
  }
}

module.exports = new Atendimento