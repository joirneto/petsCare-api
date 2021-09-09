const conexao = require('../infraestrutura/database/conexao');
const uploadImage = require('../infraestrutura/arquivos/uploadArquivos');

class Pet {
  adiciona(pet,res){
    const query = 'INSERT INTO Pets SET ?';

    uploadImage(pet.imagem, pet.nome, (erro, newPathImage)=>{

      if(erro){
        res.status(400).json({erro})
      }
      else{
        const novoPet = {nome: pet.nome, imagem: newPathImage}

        conexao.query(query, novoPet, erro =>{
        if(erro){
          res.status(400).json(erro)
        }else{
          res.status(200).json(novoPet)
        }
      })

      }
      
    })
  }
}

module.exports = new Pet()