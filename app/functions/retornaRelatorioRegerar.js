const pool = require('../mysql/mysql')

module.exports = (callback) => {
    pool.query(`SELECT rpr.* FROM creditoPosCop.relProtRegerar rpr ;`, (err,results)=>{
        if(err){
            callback({error: err}, undefined)
        }else{
            callback(undefined,results)
        }
    })
}