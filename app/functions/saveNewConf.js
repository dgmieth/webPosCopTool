const pool = require('../mysql/mysql')

module.exports = (obj, matricula, callback) => {
    pool.query(`UPDATE creditoPosCop.posCopConfLog SET	excluido = 1, excluidoPor = '${matricula}', exlcuidoEm = CURRENT_TIMESTAMP() WHERE excluido = 0;
                UPDATE creditoPosCop.pubAlvoPosCop SET filtroSetado = ${obj.publicoAlvoSim} WHERE txt = 'Sim'; 
                UPDATE creditoPosCop.pubAlvoPosCop SET filtroSetado = ${obj.publicoAlvoNao} WHERE txt = 'Nao';
                UPDATE creditoPosCop.pubAlvoPosCop SET filtroSetado = ${obj.publicoAlvoALVA} WHERE txt = 'ALVA';
                UPDATE creditoPosCop.sisResponsavelPosCop SET filtroSetado = ${obj.COP} WHERE txt = 'COP';
                UPDATE creditoPosCop.sisResponsavelPosCop SET filtroSetado = ${obj.XER} WHERE txt = 'XER';
                UPDATE creditoPosCop.prefGecorPosCop SET filtroSetado = ${obj.gecorSomenteSim} WHERE txt = 'Sim';
                UPDATE creditoPosCop.sitVinculoOprPosCop SET filtroSetado = ${obj.operacaoNaoVinculada} WHERE txt = 'Operação não vinculada';
                UPDATE creditoPosCop.sitVinculoOprPosCop SET filtroSetado = ${obj.operacaoVinculada} WHERE txt = 'Vinculada';
                UPDATE creditoPosCop.sitVinculoOprPosCop SET filtroSetado = ${obj.operacaoVinculadaEmOutroNPJ} WHERE txt = 'Vinculada em outro NPJ';
                UPDATE creditoPosCop.regAcrdValidadoPosCop SET filtroSetado = ${obj.acordoRegPortalSim} WHERE txt = 'Sim';
                UPDATE creditoPosCop.regAcrdValidadoPosCop SET filtroSetado = ${obj.acordoRegPortalNao} WHERE txt = 'Nao';
                UPDATE creditoPosCop.fluxoEstoquePosCop SET qtde = ${obj.estoqueNumber} WHERE txt = 'Estoque';
                UPDATE creditoPosCop.fluxoEstoquePosCop SET qtde = ${obj.fluxoNumber} WHERE txt = 'Fluxo';`, 
    (err,results, fields)=>{
        if(err){
            console.log(err)
            callback({error: err}, undefined)
        }else{
            pool.query(`INSERT INTO creditoPosCop.posCopConfLog (criadoPor,pubAlvoPosCop,regAcrdValidadoPosCop,sisResponsavelPosCop,prefGecorPosCop,sitVinculoOprPosCop,fluxoEstoquePosCop)
                        VALUES ('${matricula}',CONCAT(  CASE WHEN ${obj.publicoAlvoSim} = 1 THEN 'Sim;' ELSE ';' END,
                                                    CASE WHEN ${obj.publicoAlvoNao} = 1 THEN 'Nao;' ELSE '' END,
                                                    CASE WHEN ${obj.publicoAlvoALVA} = 1 THEN 'ALVA' ELSE '' END),
                                            CONCAT( CASE WHEN ${obj.acordoRegPortalSim} THEN 'Sim;' ELSE ';' END, 
                                                    CASE WHEN ${obj.acordoRegPortalNao} THEN 'Nao' ELSE '' END),
                                            CONCAT( CASE WHEN ${obj.XER} THEN 'XER;' ELSE ';' END,
                                                    CASE WHEN ${obj.COP} THEN 'COP' ELSE '' END),
                                            CONCAT( CASE WHEN ${obj.gecorSomenteSim} THEN 'Sim' ELSE 'Nao' END),
                                            CONCAT( CASE WHEN ${obj.operacaoVinculada} THEN 'Vinculada;' ELSE ';' END,
                                                    CASE WHEN ${obj.operacaoNaoVinculada} THEN 'Nao Vinculada;' ELSE ';' END,
                                                    CASE WHEN ${obj.operacaoVinculadaEmOutroNPJ} THEN 'Vinculada em Outro NPJ' ELSE '' END),
                                            CONCAT( CASE WHEN ${obj.fluxoNumber} > 0 THEN  'Fluxo: ${obj.fluxoNumber};' ELSE ';' END,
                                                    CASE WHEN ${obj.estoqueNumber} > 0 THEN 'Estoque: ${obj.estoqueNumber}' ELSE '' END));`, (err,results,fields)=>{
                                            if(err){
                                                console.log(err)
                                                callback({error: err}, undefined)
                                            }else{
                                                pool.query(`INSERT INTO posCopLog (user, description) VALUES ('${matricula}', 'Nova configuração')`, (err,result,fields) => {
                                                if (err) {
                                                    console.log (err)
                                                    callback({error: err}, undefined)
                                                }else{
                                                    console.log(`configuração alterar por ${matricula}`)
                                                    callback(undefined,{succes: 'Nova configuração salva'})
                                                }
                                                })
                                            }
                                        })
        }
    })
}