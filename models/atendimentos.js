const conexao = require('../infraestrutura/database/conexao')
const moment = require('moment');
const axios = require('axios');

class Atendimento {
  adiciona(atendimento, res) {
    const dataCriacao = new Date();
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

    const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
    const clienteEhValido = atendimento.cliente.length >= 5;
    const validacoes = [
      {
        nome: 'data',
        valido: dataEhValida,
        mensagem: "Data de agendamento deve ser maior que a data atual."
      },
      {
        nome: 'cliente',
        valido: clienteEhValido,
        mensagem: "Cliente deve ter pelo menos 5 caracteres."
      },
    ]

    const erros = validacoes.filter(value => !value.valido);
    const existemErros = erros.length;

    if (existemErros) {
      res.status(400).json(erros)
    } else {
      const atendimentoDatado = { ...atendimento, dataCriacao, data };
      const sql = 'INSERT INTO Atendimentos SET ?';

      conexao.query(sql, atendimentoDatado, (erro, resultado) => {
        if (erro) {
          res.status(400).json(erro);
        } else {
          res.status(201).json(atendimentoDatado)
        }
      })
    }
  }

  lista(res){
    const sql = 'SELECT * FROM Atendimentos'

    conexao.query(sql, (erro, resultados) =>{
      if(erro){
        res.status(400).json(erro);
      }else{
        res.status(200).json(resultados);
      }
    })
  }

  buscaPorId(id, res){
    const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`;
   

    conexao.query(sql, async (erro, resultados) =>{
      const atendimento = resultados[0];
      const cpf = atendimento.cliente;
      if(erro){
        res.status(400).json(erro)
      }else{
        const {data} = await axios.get(`http://localhost:8082/${cpf}`);
        atendimento.cliente = data;

        res.status(200).json(atendimento)
      }
    })
  }

  alteraAtendimento(id, campos, res){
    const sql = 'UPDATE Atendimentos SET ? WHERE id =?'
    if(campos.data){
      campos.data = moment(campos.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
    }


    conexao.query(sql,[campos, id], (erro, resultados)=>{
      if(erro){
        res.status(400).json(erro)
      }else{
        res.status(202).json({...campos, id})
      }
    })
  }

  deletaAtendimento(id, res){
    const sql = 'DELETE FROM Atendimentos WHERE id=?'

    conexao.query(sql, id, (erro, resultados)=>{
      if(erro){
        res.status(400).json(erro)
      }else{
        res.status(200).json({id})
      }
    })
  }
}

module.exports = new Atendimento