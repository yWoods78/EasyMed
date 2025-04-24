const mysql = require('mysql2');
const express = require("express");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'easymed'
});

const app = express()

const cors = require('cors');
app.use(cors());
app.use(express.json());

app.listen(3000, () => { 
    console.log("Server running on port 3000");
})

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar: ' + err.stack);
        return;
    }
    console.log('Conectado como id ' + connection.threadId);
});

const cpfsInvalidos = [
    '12345678909',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
    '00000000000'
];
  

function validarCPF(cpf) {
    return true;
    // cpf = cpf.replace(/[^\d]+/g, '');

    // if (cpf.length !== 11 || cpfsInvalidos.includes(cpf)) {
    //     return false;
    // }

    // let soma = 0;
    // for (let i = 0; i < 9; i++) {
    //     soma += parseInt(cpf[i]) * (10 - i);
    // }

    // let resto = soma % 11;
    // let dig1 = (resto < 2) ? 0 : 11 - resto;

    // soma = 0;
    // for (let i = 0; i < 10; i++) {
    //     soma += parseInt(cpf[i]) * (11 - i);
    // }

    // resto = soma % 11;
    // let dig2 = (resto < 2) ? 0 : 11 - resto;

    // return cpf[9] == dig1 && cpf[10] == dig2;
}

app.post("/CadastrarUsuario", (req, res) => {
    const userData = req.body;
    connection.query('SELECT * FROM usuarios WHERE cpf = ?', [userData.cpf], (error, results) => {
        if (error) {
            console.error('Erro na consulta: ', error);
            return res.status(500).send({ error: 'Erro no banco de dados' });
        }

        if (results.length > 0) {
            return res.status(400).send({ error: 'Usuário já existe' });
        }

        if (!validarCPF(userData.cpf)) {
            return res.status(400).send({ error: 'CPF inválido' });
        }

        connection.query('INSERT INTO usuarios (cpf, name, birthdate, tel, pass) VALUES (?, ?, ?, ?, ?)', 
        [userData.cpf, userData.name, userData.birthdate, userData.tel, userData.pass], (error, results) => {
            if (error) {
                console.error('Erro ao inserir: ', error);
                return res.status(500).send({ error: 'Erro ao cadastrar usuário' });
            }

            res.status(200).send({ 
                success: true,
                nome: userData.nome,
                tipo: 'Paciente'  
             });
        });
    });
});

app.post("/login", (req, res) => {
    const { cpf, senha } = req.body;

    if (!cpf || !senha) {
        return res.status(400).json({ error: "CPF e senha são obrigatórios." });
    }
    connection.query('SELECT * FROM usuarios WHERE cpf = ?',[cpf],(error, results) => {
        if (error) {
            console.error('Erro ao consultar o banco:', error);
            return res.status(500).json({ error: "Erro interno no servidor." });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: "CPF não cadastrado." });
        }

        const usuario = results[0];

        if (usuario.pass === senha) {
            usuario.pass = undefined; // Remove a senha do objeto de resposta
            return res.status(200).json({
                message: "Login bem-sucedido!", 
                userData: usuario,
            });
        } else {
            return res.status(401).json({ error: "Senha incorreta." });
        }
    });
});