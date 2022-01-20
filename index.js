
// Carega as bibliotecas utilziadas
const { response } = require('express');
var express = require('express');
var session = require("express-session");

var ses;

//prepara as conigurações do app
var app = express();
app.use(session({
    secret: "klausFiscal",
    resave: false,
    saveUninitialized: false

}));

//carrea os gerenciadores de aquivos
var fs = require("fs");
var multer = require("multer")
var path = require("path");

//configura criptografia
const DADOS_CRIPTOGRAFAR = {
    algoritmo: "aes256",
    segredo: "chaves",
    tipo: "hex"
};

//Inicia as configurações da biblioteca de criptografia
const crypto = require("crypto");
const cipher = crypto.createCipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);

//Função que criptografa
function criptografar(senha) {
    const cipher = crypto.createCipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
    cipher.update(senha);
    return cipher.final(DADOS_CRIPTOGRAFAR.tipo);
};

//inicia a biblioteca responsavel pelo envio de email
var nodemailer = require('nodemailer');

//Configura quem vai enviar o email
var remetente = nodemailer.createTransport({
    host: 'mail.klausfiscal.com.br',
    port: 465,
    auth: {
        user: 'report@klausfiscal.com.br',
        pass: 'KlausRep@2020'
    }
});

//Conexão com o banco de dados
var mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root132',
    database: 'informativo'
});

//função que salva os dados do multer na pasta de uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        cb(null, (file.originalname).split(".")[0] + path.extname(file.originalname));
    }
})

//Configura o multer com a fnção acima
const upload = multer({ storage });

// Informa que usaremos a EJS engine
app.set('view engine', 'ejs');


// Tela de login
app.get('/login', function (req, res) {
    if (!req.session.viewCount) {
        req.session.viewCount = 1;
    } else {
        req.session.viewCount += 1;
    }

    res.render('pages/login', { viewCount: req.session.viewCount });

});


//Função que realiza o Login e envia os dados da sessão
app.get('/logar/:email/:senha', function (req, res) {

    let email = req.params.email;
    let senha = req.params.senha;

    senha = criptografar(senha)

    let sql = "SELECT * FROM acesso WHERE email = '" + email + "' AND senha='" + senha + "';";

    console.log(sql);

    connection.query(sql, function (error, results, fields) {
        if (error) {
            res.json({ json: "Erro" })
        }

        if (results.length == 0) {
            res.render('pages/login', { viewCount: req.session.viewCount });
        } else {

            ses = req.session;

            console.log(results.length);

            req.session.email = results[0].email;
            req.session.nome = results[0].nome;
            req.session.funcao = results[0].funcao;

            res.json({ json: "Enviado", nome: ses.nome })
        }
    });

});

//Funçãopara termino de sessão
app.get('/sair', function (req, res) {

    ses = undefined;

    req.session = undefined;

    res.redirect('/login');

});


// index page - Tela de cadastro de Usuário
app.get('/', function (req, res) {

    console.log(req.session.email);

    if (req.session.email == undefined) {

        res.redirect("/login");

    } else {

        connection.query('SELECT * FROM informativo.area;', function (error, results, fields) {
            if (error) throw error;

            var areas = [];

            for (let a = 0; a < results.length; a++) {
                areas[a] = results[a].nome;
            }

            if (ses.funcao == 'financeiro' || ses.funcao == 'diretores') {
                res.render('pages/cadastraUsuario', { areas: results, funcao: ses.funcao });
            } else {
                res.redirect("/teste");
            }
        });
    }
});


// Tela de documentações
app.get('/teste', function (req, res) {

    if (req.session.email == undefined) {
        res.redirect("/login");
    } else {

        arquivos = fs.readdirSync(__dirname + '/uploads');

        files = [];

        for (let a = 0; a < arquivos.length; a++) {
            files[a] = {
                name: (arquivos[a].split("."))[0],
                url: arquivos[a]
            };
        }

        connection.query('SELECT * FROM informativo.area;', function (error, results, fields) {
            if (error) throw error;

            var areas = [];

            for (let a = 0; a < results.length; a++) {
                areas[a] = results[a].nome;
            }

            res.render('pages/envioAtualizacao', { areas: results, files: files, funcao: ses.funcao });
        });
    }
});

// index page - Tela de cadastro de Usuário
app.get('/tabela', function (req, res) {

    var areas = [];
    var clientes = [];

    if (req.session.email == undefined) {

        res.redirect("/login");
    } else {

        connection.query('SELECT * FROM cancelamento.cliente where teste = 0 OR teste = 10;', function (error, results, fields) {
            if (error) throw error;


            for (let r = 0; r < results.length; r++) {
                clientes[r] = results[r];
            }

            console.log(clientes.length);


            if (ses.funcao == 'financeiro' || ses.funcao == 'diretores') {
                res.render('pages/tabela', { areas: areas, clientes: clientes, funcao: ses.funcao });
            } else {
                res.redirect("/teste");
            }
        });
    }
});


// index page - Tela de cadastro de Usuário
app.get('/cadastroCancelamento', function (req, res) {

    var areas = [];
    var clientes = [];

    if (req.session.email == undefined) {

        res.redirect("/login");
    } else {

        connection.query('SELECT * FROM cancelamento.cliente where teste = 0;', function (error, results, fields) {
            if (error) throw error;


            for (let r = 0; r < results.length; r++) {
                clientes[r] = results[r];
            }

            console.log(clientes.length);


            if (ses.funcao == 'financeiro' || ses.funcao == 'diretores') {
                res.render('pages/cadastroCancelamento', { areas: areas, clientes: clientes, funcao: ses.funcao });
            } else {
                res.redirect("/teste");
            }
        });
    }
});

// index page - Tela de cadastro de Usuário
app.get('/tabelaAgendados', function (req, res) {

    var areas = [];
    var clientes = [];

    if (req.session.email == undefined) {

        res.redirect("/login");

    } else {

        connection.query('SELECT * FROM cancelamento.cliente where teste = 1;', function (error, results, fields) {
            if (error) throw error;


            for (let r = 0; r < results.length; r++) {
                clientes[r] = results[r];
            }

            console.log(clientes.length);


            if (ses.funcao == 'financeiro' || ses.funcao == 'diretores') {
                res.render('pages/tabelaReagendados', { areas: areas, clientes: clientes, funcao: ses.funcao });
            } else {
                res.redirect("/teste");
            }
        });
    }
});

//Função para download de aquivos
app.get('/download/:file', function (req, res) {
    var file = __dirname + '/uploads/' + req.params.file;
    res.download(file);
});

//Função para cadato de usuário
app.get('/usuario/:nome/:email/:senha/:funcao', function (req, res) {

    let nome = req.params.nome;
    let email = req.params.email;
    let senha = req.params.senha;
    let funcao = req.params.funcao;

    var j = {
        nome: nome, email: email, senha: senha, funcao: funcao
    };

    senha = criptografar(senha)


    let sql = "INSERT INTO acesso(nome,email,senha, funcao) values('" + nome + "','" + email + "','" + senha + "','" + funcao + "');";

    connection.query(sql, function (error, results, fields) {
        if (error) {
            res.json({ json: "Erro" })
        }

        res.json({ json: "Enviado" })

    });

});


//Função para cadato de usuário
app.get('/cliente/:id/:razao/:fantasia/:uf/:contador/:endereco/:bairro/:cidade/:mensalidade/:dia/:licenca/:telefone/:email/:vendedor/:teste/:comentario/', function (req, res) {

    var j = {
        id: req.params.id, razao: req.params.razao, fantasia: req.params.fantasia, uf: req.params.uf, contador: req.params.contador,
        endereco: req.params.endereco, bairro: req.params.bairro, cidade: req.params.cidade, mensalidade: req.params.mensalidade,
        dia: req.params.dia, licenca: req.params.licenca, telefone: req.params.telefone, email: req.params.email,
        vendedor: req.params.vendedor, teste: req.params.teste, comentario: req.params.comentario
    };


    let sql = "UPDATE cancelamento.cliente SET " +
        "razao_social='" + j.razao + "', " +
        "fantasia='" + j.fantasia + "', " +
        "uf='" + j.uf + "', " +
        "contador='" + j.contador + "', " +
        "endereco='" + j.endereco + "', " +
        "bairro='" + j.bairro + "', " +
        "cidade='" + j.cidade + "', " +
        "mensalidade=" + j.mensalidade + ", " +
        "dia=" + j.dia + ", " +
        "licenca=" + j.licenca + ", " +
        "telefone='" + j.telefone + "', " +
        "email='" + j.email + "', " +
        "vendedor='" + j.vendedor + "', " +
        "teste=1, " +
        "comentario='" + j.comentario + "' "
        + " WHERE id=" + j.id;

    connection.query(sql, function (error, results, fields) {
        if (error) {
            res.json({ json: "Erro" })
        }

        res.json({ json: "Enviado" })

    });

});

//Função para cadato de usuário
app.get('/salvar/:id/:razao/:fantasia/:uf/:contador/:endereco/:bairro/:cidade/:mensalidade/:dia/:licenca/:telefone/:email/:vendedor/:teste/:comentario/', function (req, res) {

    var j = {
        id: req.params.id, razao: req.params.razao, fantasia: req.params.fantasia, uf: req.params.uf, contador: req.params.contador,
        endereco: req.params.endereco, bairro: req.params.bairro, cidade: req.params.cidade, mensalidade: req.params.mensalidade,
        dia: req.params.dia, licenca: req.params.licenca, telefone: req.params.telefone, email: req.params.email,
        vendedor: req.params.vendedor, teste: req.params.teste, comentario: req.params.comentario
    };


    let sql = "UPDATE cancelamento.cliente SET " +
        "razao_social='" + j.razao + "', " +
        "fantasia='" + j.fantasia + "', " +
        "uf='" + j.uf + "', " +
        "contador='" + j.contador + "', " +
        "endereco='" + j.endereco + "', " +
        "bairro='" + j.bairro + "', " +
        "cidade='" + j.cidade + "', " +
        "mensalidade=" + j.mensalidade + ", " +
        "dia=" + j.dia + ", " +
        "licenca=" + j.licenca + ", " +
        "telefone='" + j.telefone + "', " +
        "email='" + j.email + "', " +
        "vendedor='" + j.vendedor + "', " +
        "comentario='" + j.comentario + "' "
        + " WHERE id=" + j.id;

    connection.query(sql, function (error, results, fields) {
        if (error) {
            res.json({ json: "Erro" })
        }

        res.json({ json: "Enviado" })

    });

});


//Cadastra Cliente que cancelou
app.get('/clienteCancelado/:razao/:fantasia/:uf/:contador/:endereco/:bairro/:cidade/:mensalidade/:dia/:licenca/:telefone/:email/:vendedor/:teste/:comentario/', function (req, res) {

    var j = {
        id: req.params.id, razao: req.params.razao, fantasia: req.params.fantasia, uf: req.params.uf, contador: req.params.contador,
        endereco: req.params.endereco, bairro: req.params.bairro, cidade: req.params.cidade, mensalidade: req.params.mensalidade,
        dia: req.params.dia, licenca: req.params.licenca, telefone: req.params.telefone, email: req.params.email,
        vendedor: req.params.vendedor, teste: req.params.teste, comentario: req.params.comentario
    };


    let sql = "INSERT INTO cancelamento.cliente(razao_social, fantasia, uf,contador," +
        "endereco, bairro, cidade, mensalidade, dia, licenca, telefone, email, vendedor, teste, comentario) values('"
        + j.razao + "','" + j.fantasia + "','" + j.uf + "','" + j.contador + "','" + j.endereco + "','" +
        j.bairro + "','" + j.cidade + "'," + j.mensalidade + ", " + j.dia + "," + j.licenca + ",'" +
        j.telefone + "','" + j.email + "','" + j.vendedor + "',0,'" + j.comentario + "');";

    //res.json({ json: sql });

    connection.query(sql, function (error, results, fields) {
        if (error) {
            res.json({ json: "Erro" })
        }

        res.json({ json: "Enviado" })

    });

});

//Função para cadato de usuário
app.get('/clienteRevertido/:id/:razao/:fantasia/:uf/:contador/:endereco/:bairro/:cidade/:mensalidade/:dia/:licenca/:telefone/:email/:vendedor/:teste/:comentario/', function (req, res) {

    var j = {
        id: req.params.id, razao: req.params.razao, fantasia: req.params.fantasia, uf: req.params.uf, contador: req.params.contador,
        endereco: req.params.endereco, bairro: req.params.bairro, cidade: req.params.cidade, mensalidade: req.params.mensalidade,
        dia: req.params.dia, licenca: req.params.licenca, telefone: req.params.telefone, email: req.params.email,
        vendedor: req.params.vendedor, teste: req.params.teste, comentario: req.params.comentario
    };

    let sql = "UPDATE cancelamento.cliente SET " +
        "razao_social='" + j.razao + "', " +
        "fantasia='" + j.fantasia + "', " +
        "uf='" + j.uf + "', " +
        "contador='" + j.contador + "', " +
        "endereco='" + j.endereco + "', " +
        "bairro='" + j.bairro + "', " +
        "cidade='" + j.cidade + "', " +
        "mensalidade=" + j.mensalidade + ", " +
        "dia=" + j.dia + ", " +
        "licenca=" + j.licenca + ", " +
        "telefone='" + j.telefone + "', " +
        "email='" + j.email + "', " +
        "vendedor='" + j.vendedor + "', " +
        "teste=2, " +
        "comentario='" + j.comentario + "' "
        + " WHERE id=" + j.id;

    //Envia email para o financeiro sobre o revertimento

    var emailASerEnviado = {
        from: 'revertimento@klausfiscal.com.br',
        //to: 'guibarbosa28@outlook.com',
        to: 'financeiro@klausfiscal.com.br',
        subject: 'Revertimento bem sucedido',
        text: 'Informamos atraves deste que a empresa ' + j.razao + ' retornou para nos '
            + 'mediante a uma licença de R$' + j.licenca + ' e mensalidade de R$' + j.mensalidade
            + ' com vencimento no dia ' + j.dia + '.\n\nAtenciosamento: Equipe de revertimento Klaus'
    };

    remetente.sendMail(emailASerEnviado, function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado com sucesso.');
        }
    });

    connection.query(sql, function (error, results, fields) {
        if (error) {
            res.json({ json: "Erro" })
        }

        res.json({ json: "Enviado" })

    });

});

//Função para cadato de usuário
app.get('/clientePerdido/:id/:razao/:fantasia/:uf/:contador/:endereco/:bairro/:cidade/:mensalidade/:dia/:licenca/:telefone/:email/:vendedor/:teste/:comentario/', function (req, res) {

    var j = {
        id: req.params.id, razao: req.params.razao, fantasia: req.params.fantasia, uf: req.params.uf, contador: req.params.contador,
        endereco: req.params.endereco, bairro: req.params.bairro, cidade: req.params.cidade, mensalidade: req.params.mensalidade,
        dia: req.params.dia, licenca: req.params.licenca, telefone: req.params.telefone, email: req.params.email,
        vendedor: req.params.vendedor, teste: req.params.teste, comentario: req.params.comentario
    };

    let sql = "UPDATE cancelamento.cliente SET " +
        "razao_social='" + j.razao + "', " +
        "fantasia='" + j.fantasia + "', " +
        "uf='" + j.uf + "', " +
        "contador='" + j.contador + "', " +
        "endereco='" + j.endereco + "', " +
        "bairro='" + j.bairro + "', " +
        "cidade='" + j.cidade + "', " +
        "mensalidade=" + j.mensalidade + ", " +
        "dia=" + j.dia + ", " +
        "licenca=" + j.licenca + ", " +
        "telefone='" + j.telefone + "', " +
        "email='" + j.email + "', " +
        "vendedor='" + j.vendedor + "', " +
        "teste=3, " +
        "comentario='" + j.comentario + "' "
        + " WHERE id=" + j.id;

    connection.query(sql, function (error, results, fields) {
        if (error) {
            res.json({ json: "Erro" })
        }

        res.json({ json: "Enviado" })

    });

});

//Função para cadato de usuário
app.get('/clienteRetorno/:id/:razao/:fantasia/:uf/:contador/:endereco/:bairro/:cidade/:mensalidade/:dia/:licenca/:telefone/:email/:vendedor/:teste/:comentario/', function (req, res) {

    var j = {
        id: req.params.id, razao: req.params.razao, fantasia: req.params.fantasia, uf: req.params.uf, contador: req.params.contador,
        endereco: req.params.endereco, bairro: req.params.bairro, cidade: req.params.cidade, mensalidade: req.params.mensalidade,
        dia: req.params.dia, licenca: req.params.licenca, telefone: req.params.telefone, email: req.params.email,
        vendedor: req.params.vendedor, teste: req.params.teste, comentario: req.params.comentario
    };


    let sql = "UPDATE cancelamento.cliente SET " +
        "razao_social='" + j.razao + "', " +
        "fantasia='" + j.fantasia + "', " +
        "uf='" + j.uf + "', " +
        "contador='" + j.contador + "', " +
        "endereco='" + j.endereco + "', " +
        "bairro='" + j.bairro + "', " +
        "cidade='" + j.cidade + "', " +
        "mensalidade=" + j.mensalidade + ", " +
        "dia=" + j.dia + ", " +
        "licenca=" + j.licenca + ", " +
        "telefone='" + j.telefone + "', " +
        "email='" + j.email + "', " +
        "vendedor='" + j.vendedor + "', " +
        "teste=10, " +
        "comentario='" + j.comentario + "' "
        + " WHERE id=" + j.id;

    connection.query(sql, function (error, results, fields) {
        if (error) {
            res.json({ json: "Erro" })
        }

        res.json({ json: "Enviado" })

    });

});

//Função q deleta os Filés
app.get('/delete/:file', function (req, res) {
    var file = __dirname + '/uploads/' + req.params.file;
    var arq = __dirname + "/uploads/"
    fs.unlink(file, function (err) {
        if (err) throw err;
        console.log('Arquivo deletado!');
    })
    //res.download(file);
});

//Função que baixa o arquivo
app.post("/upload", upload.single("file"), (req, res) => {
    res.send("Arquivo Recebido");
})

app.listen(6000);
console.log('6000 is the magic port');