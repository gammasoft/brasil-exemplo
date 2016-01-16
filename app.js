var consultas = require('brasil-consultas'),
    bodyParser = require('body-parser'),
    express = require('express'),
    path = require('path'),
    app = express();

app.use(bodyParser.json());
app.use('/static', express.static(path.join(__dirname, '/static')));

app.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/codigo-fonte', function(req, res, next) {
    res.sendFile(path.join(__dirname, 'app.js'));
});

app.get('/captcha', function(req, res, next) {
    consultas.cnpj.obterCaptcha(function(err, captcha) {
        if(err) {
            return next(err);
        }

        res.json(captcha);
    });
});

app.get('/consulta', function(req, res, next) {
    var cnpj = req.query.cnpj,
        captcha = req.query;

    consultas.cnpj.obterDados(cnpj, captcha, function(err, dados) {
        if(err) {
            return next(err);
        }

        res.json(dados);
    });
});

app.listen(9000, function() {
    console.log('Brasil - Escutando na porta 9000');
});