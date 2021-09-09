const fs = require('fs');
const path = require("path");

module.exports = (caminho, nomeDoArquivo,callbackImageCreate) =>{
  const tiposValidos = ['jpg', 'png', 'jpeg'];
  const tipo = path.extname(caminho);
  const tipoEhValido = tiposValidos.indexOf(tipo.substring(1)) !== -1
  
  
  if(tipoEhValido){
    const newPathImage = `./assets/images/${nomeDoArquivo}${tipo}`

    fs.createReadStream(caminho)
    .pipe(fs.createWriteStream(newPathImage))
    .on('finish', () => callbackImageCreate(false, newPathImage))
    
  }else{
    const erro = "Tipo inválido!";
    console.log('Erro! Tipo inválido!')
    callbackImageCreate(erro)
  }
}