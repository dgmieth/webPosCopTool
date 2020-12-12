const pool = require('../mysql/mysql')

module.exports = (data, callback)=>{
    registerRecreationOfServices(data,(error,success,half)=>{
        if(error){
            callback(error,undefined,undefined)
        }else if (success){
            callback(undefined,success,undefined)
        }else{
            callback(undefined,undefined,half)
        }
    })
}

function registerRecreationOfServices(data, callback){
    var ids = data.idArr
    const qtdeRegisters = ids.length
    var loopCounter = 0
    var contaS = (function(){
        var contadorS = 0
        return {
            contar: function(){
                contadorS++
            },
            out: function(){
                return contadorS
            }
        }
    })()
    var contaE = (function(){
        var contadorE = 0
        return {
            contar: function(){
                contadorE++
            },
            out: function(){
                return contadorE
            }
        }
    })()
    for(let id of ids){
        loopCounter++
        pool.query(`UPDATE creditoPosCop.baseGeralProtocolos SET reGerar = 1 WHERE idProt = ${id} ;`, (err,results)=>{
            if(err){
                contaE.contar()
                checkValues()
            }else{
                contaS.contar()
                checkValues()
            }
        })
    }
    function checkValues(){
        if(loopCounter===qtdeRegisters){
            if(contaE.out()===qtdeRegisters){
                callback({error:'Nenhum registro foi salvo'},undefined,undefined)
            }else if (contaS.out()===qtdeRegisters){
                callback(undefined,{data:`${contaS.out()} registro(s) foi(ram) salo(s)`},undefined)
            }else if((contaS.out()+contaE.out())===qtdeRegisters){
                callback(undefined,undefined,{data:`${contaE.out()} registro(s) não foi(ram) salvo(s) e ${contaS.out()} registro(s) foi(ram) salvo(s)`})
            } 
        }
    }
}