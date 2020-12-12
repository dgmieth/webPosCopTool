const pool = require('../mysql/mysql')
module.exports = (whereString, callback)=> {
    pool.query(`SELECT t1.estoque, t2.fluxo 
                FROM (
                        SELECT COUNT(qpc.NR_UNCO_CTR_VCLD) AS estoque 
                        FROM creditoPosCop.quarentenaPosCop qpc 
                        WHERE qpc.protCriado = 0 
                                AND CURRENT_TIMESTAMP() > qpc.quarentenaAte 
                                AND qpc.quarentenaAte <= (SELECT fepc.dataInicioEstoque FROM creditoPosCop.fluxoEstoquePosCop fepc WHERE fepc.txt = 'Estoque') 
                                ${whereString}
                    ) t1,  
                    (
                        SELECT COUNT(qpc.NR_UNCO_CTR_VCLD) AS fluxo 
                        FROM creditoPosCop.quarentenaPosCop qpc 
                        WHERE qpc.protCriado = 0 
                                AND CURRENT_TIMESTAMP() > qpc.quarentenaAte 
                                AND qpc.quarentenaAte > (SELECT fepc.dataInicioEstoque FROM creditoPosCop.fluxoEstoquePosCop fepc WHERE fepc.txt = 'Estoque')
                                ${whereString}
                    ) t2;`, 
            (err,results)=>{
                if(err){
                    console.log(err)
                    callback({
                        error: err
                    },undefined)
                }else{
                    var qtde = {
                        est: results[0].estoque,
                        flu: results[0].fluxo
                    }
                    callback(undefined,qtde)
                }
            }) 
}