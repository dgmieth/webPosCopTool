//express para o servidor web
const express = require('express')
const session = require('express-session')
const https = require('https')
const fs = require('fs')
const path = require('path')
const hbs = require('hbs')

//outras variáveis
const portHttp = 4010
const portHttps = 4011
var key = fs.readFileSync(__dirname + '/ssl/key.pem','utf-8')
var cert = fs.readFileSync(__dirname + '/ssl/server.crt','utf-8')
const credentials = {
    key: key,
    cert: cert
}
const viewsPaths = path.join(__dirname,  '../templates/views')
const partialsPaths = path.join(__dirname,  '../templates/partials')
const publicPath = path.join(__dirname,  '../public')
//configurando a views no hbs
hbs.registerPartials(partialsPaths)

//criando aplicativo app do express
const app = express()

//configurando a session
const store = new session.MemoryStore()
//importando middlewares
const validador = require('./validador/validador')
const pool = require('./mysql/mysql')
//configurado ao app()
app.use(session({
    secret: "posCop1",
    name: "painelPosCop",
    resave: true,
    saveUninitialized: true,
    store: store
}))
app.set('view engine', 'hbs')
app.set('views', viewsPaths)
app.use(express.static(publicPath))
app.use(express.urlencoded())
app.use(express.json())
app.use(function(req,res,next){
    console.log(req.session)
    
    next()
})
//outras funções 
const contaRegistrosComFiltros = require('./functions/contaRegistrosComFiltros')
const retornaFiltrosSetados = require('./functions/retornaFiltrosSetados')
const saveNewConf = require('./functions/saveNewConf')
const retornaRelatorioProtAbert = require('./functions/retornaRelatorioProtAberto')
const retornaRelatorioRegerar = require('./functions/retornaRelatorioRegerar')
const regerarProtocolo = require('./functions/regerarProtocolos')
const confAnteriores = require('./functions/confAnteriores')
//==================================================================================
//==================================================================================
//                                   ROTEAMENTO
//==================================================================================
//==================================================================================
//----------------------------------------------------------------------------------
//                                 ROTAS DAS PAGINAS
//----------------------------------------------------------------------------------
//root 
app.get('', validador.validaToken, (req,res)=>{  
    if(!req.session.logged){
        pool.query(`INSERT INTO posCopLog (user, description) VALUES ('${ req.session.chave}', 'Log-ing')`, (err,result) => {
            if (err) {
                console.log (err)
            }else{
                console.log(`Log-in ${req.session.chave} salvo`)
            }
        }) 
        req.session.logged = true
    }
    res.render('mainPage', {
        title: 'Configuração Abertura Pós Formalização Cop'
    })
})
//realtório protocolos abertos
app.get('/relProtAbertos', (req,res)=>{  
    res.render('relProtAbertos', {
        title: 'Relatório de protocolos abertos'
    })
})
//tabela que permite escolha de protocolos para gerar novamente
app.get('/regerarProt',  (req,res)=>{  
    res.render('regerarProt', {
        title: 'Re-geração de protocolos cancelados'
    })
})
//relatório com configurações anteriores
app.get('/confAnteriores', (req,res)=>{  
    res.render('confAnteriores', {
        title: 'Log de configurações anteriores da ferramenta'
    })
})
//----------------------------------------------------------------------------------
//                                ROTA DE SERVICOS
//----------------------------------------------------------------------------------
//busca configurações salvas na base e depois busca qtde de registros após aplicação dos filros
app.get('/retornaFiltrosSetados', (req,res)=> {
    retornaFiltrosSetados((error,data)=>{
        if(error){
            return res.status(500).json(error)
        }
        res.status(200).json(data)
    })
})
//busca qtde de registro cada vez que filtro é aplicado
app.get('/contaRegistrosComFiltros', (req,res) => {  
    var valuesObj = JSON.parse(req.query.dados) 
    contaRegistrosComFiltros(valuesObj, (error, data)=>{
        if(error) {
            return res.status(500).json(error)
        }
        res.status(200).json(data)
    })
})
//salva nova configuração na base... salva log
app.post('/salvaNovaConf', (req,res)=>{
    console.log(req.session.chave)
    saveNewConf(req.body, req.session.chave, (error,data)=> {
        if(error){
            res.status(500).json(error)
        }else{
            res.status(201).json(data)
        }
    })
})
//retorna o relatório de todos os protocolos gerados
app.get('/getRelatorioProAbertos', (req,res)=>{
    retornaRelatorioProtAbert((error,data)=>{
        if(error){
            res.status(500).json(error)
        }else {
            res.status(200).json(data)
        }
    })
})
//retorna o relatório de todos os protocolos gerados
app.get('/getRelatorioRegerar', (req,res)=>{
    retornaRelatorioRegerar((error,data)=>{
        if(error){
            res.status(500).json(error)
        }else {
            res.status(200).json(data)
        }
    })
})
//seta protocolos para serem gerados novamente
app.post('/regerarRelatorios', (req,res)=>{
    regerarProtocolo(req.body,(error,success,half)=>{
        if(error){
            var obj =  {
                error:error
            }
            res.status(500).json(obj)
        }else if (success){
            var obj =  {
                success:success
            }
            res.status(201).json(obj)
        }else{
            var obj =  {
                half:half
            }
            res.status(201).json(half)

        }
    })
})
//retorna o log de configuracoes anteriores
app.get('/getLogConf', (req,res)=>{
    console.log('getLogConf')
    confAnteriores((error,data)=>{
        if(error){
            res.status(500).json(error)
        }else {
            res.status(200).json(data)
        }
    })
})
//==================================================================================
//==================================================================================
//                            ATIVANDO O SERVIDOR WEB
//==================================================================================
//==================================================================================
https.createServer(credentials,app).listen(portHttps)