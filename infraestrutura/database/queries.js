const conexao = require('./conexao')

const execQuery = (query, parametros = '') =>{
  return new Promise((resolve, reject)=>{
    conexao.query(query, parametros, (erros, resultados, campos)=>{
      if(erros){
        reject(erros)
      }else{
        resolve(resultados)
      }
    })
  }) 
}

module.exports = execQuery