var brasil = require('brasil'),
	bodyParser = require('body-parser'),
	express = require('express');

var app = express();

app.use(bodyParser.json());
app.use('/static', express.static(__dirname + '/static'));

app.get('/', function(req, res, next) {
	res.sendFile(__dirname + '/index.html');
});

app.get('/captcha', function(req, res, next) {
	brasil.consultas.cnpj.obterCaptcha(function(err, captcha) {
		if(err) {
			return next(err);
		}

		res.json(captcha);
	});
});

app.get('/consulta', function(req, res, next) {
	brasil.consultas.cnpj.obterDados(req.query.cnpj, req.query, function(err, dados) {
		if(err) {
			return next(err);
		}

		res.json(dados);
	})
});

app.listen(9000, function() {
	console.log('Brasil - Escutando na porta 9000');
});