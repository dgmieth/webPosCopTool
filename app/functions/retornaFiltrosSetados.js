const pool = require('../mysql/mysql')
const contaRegistrosComFiltros = require('./contaRegistrosComFiltros')

module.exports = (callback) => {
    pool.query(`
    SELECT
        t1.*,
        t2.*,
        t3.*,
        t4.*,
        t5.*,
        t6.*,
        t7.*,
        t8.*,
        t9.*,
        t10.*,
        t11.*,
        t12.*,
        t13.*
    FROM 
    (SELECT papc.filtroSetado AS publicoAlvoSimL FROM creditoPosCop.pubAlvoPosCop papc WHERE papc.txt = 'Sim') AS t1,
    (SELECT papc.filtroSetado AS publicoAlvoNaoL FROM creditoPosCop.pubAlvoPosCop papc WHERE papc.txt = 'Nao') AS t2,
    (SELECT papc.filtroSetado AS publicoAlvoALVAL FROM creditoPosCop.pubAlvoPosCop papc WHERE papc.txt = 'Alva') AS t3,
    (SELECT srpc.filtroSetado AS XERL FROM creditoPosCop.sisResponsavelPosCop srpc WHERE srpc.txt = 'XER') AS t4,
    (SELECT srpc.filtroSetado AS COPL FROM creditoPosCop.sisResponsavelPosCop srpc WHERE srpc.txt = 'COP') AS t5,
    (SELECT pgpc.filtroSetado as gecorSomenteSimL FROM creditoPosCop.prefGecorPosCop pgpc WHERE pgpc.txt = 'Sim') AS t6,
    (SELECT svopc.filtroSetado AS operacaoNaoVinculadaL FROM creditoPosCop.sitVinculoOprPosCop svopc WHERE svopc.txt = 'Operação não vinculada') AS t7,
    (SELECT svopc.filtroSetado AS operacaoVinculadaL FROM creditoPosCop.sitVinculoOprPosCop svopc WHERE svopc.txt = 'Vinculada') AS t8,
    (SELECT svopc.filtroSetado AS operacaoVinculadaEmOutroNPJL FROM creditoPosCop.sitVinculoOprPosCop svopc WHERE svopc.txt = 'Vinculada em outro NPJ') AS t9,
    (SELECT ravpc.filtroSetado AS acordoRegPortalSimL FROM creditoPosCop.regAcrdValidadoPosCop ravpc WHERE ravpc.txt = 'Sim') AS t10,
    (SELECT ravpc.filtroSetado AS acordoRegPortalNaoL FROM creditoPosCop.regAcrdValidadoPosCop ravpc WHERE ravpc.txt = 'Nao') AS t11,
    (SELECT fepc.qtde AS fluxoNumberL FROM creditoPosCop.fluxoEstoquePosCop fepc WHERE fepc .txt = 'Fluxo') AS t12,
    (SELECT fepc.qtde AS estoqueNumberL FROM creditoPosCop.fluxoEstoquePosCop fepc WHERE fepc .txt = 'Estoque') AS t13;`,
    (err, results) => {
        if(err){
            console.log(err)
            callback({  error: err  },undefined)
        }else{
            var objeto = {
                publicoAlvoSim: results[0].publicoAlvoSimL,
                publicoAlvoNao: results[0].publicoAlvoNaoL,
                publicoAlvoALVA: results[0].publicoAlvoALVAL,
                XER: results[0].XERL,
                COP: results[0].COPL,
                gecorSomenteSim: results[0].gecorSomenteSimL,
                operacaoNaoVinculada: results[0].operacaoNaoVinculadaL,
                operacaoVinculada: results[0].operacaoVinculadaL,
                operacaoVinculadaEmOutroNPJ: results[0].operacaoVinculadaEmOutroNPJL,
                acordoRegPortalSim: results[0].acordoRegPortalSimL,
                acordoRegPortalNao: results[0].acordoRegPortalNaoL,
                fluxoNumber: results[0].fluxoNumberL,
                estoqueNumber: results[0].estoqueNumberL
            }
            contaRegistrosComFiltros(objeto, (err,data)=>{
                if(err){
                    console.log(err)
                    callback({  error: err  },undefined)
                }else{
                    objeto["est"] = data.est
                    objeto["flu"] = data.flu
                    callback(undefined,objeto)
                }
            })
        }
    })
}