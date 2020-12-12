const pool = require('../mysql/mysql')

module.exports = (callback)=>{
    pool.query(`SELECT lc.* FROM creditoPosCop.logConfiguracoes lc `, (error,results)=>{
        if(error){
            callback({error: error}, undefined)
        }else{
            callback(undefined,results)
        }
    })
}