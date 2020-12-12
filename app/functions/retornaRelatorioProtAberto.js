const pool = require('../mysql/mysql')

module.exports = (callback) => {
    pool.query(`SELECT rpa.* FROM creditoPosCop.relProtAbertos rpa `, (err,results)=>{
        if(err){
            callback({error: err}, undefined)
        }else{
            callback(undefined,results)
        }
    })
}