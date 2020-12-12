const pool = require('../mysql/mysql')
const selectComWhere = require('./selectComWhere')

module.exports = (valuesObj, callback) => {
    var whereClause = new Array()
    var publicoAlvoSim = valuesObj.publicoAlvoSim
    var publicoAlvoNao = valuesObj.publicoAlvoNao
    var publicoAlvoALVA = valuesObj.publicoAlvoALVA
    var XER = valuesObj.XER
    var COP = valuesObj.COP
    var gecorSomenteSim = valuesObj.gecorSomenteSim
    var operacaoNaoVinculada = valuesObj.operacaoNaoVinculada
    var operacaoVinculada = valuesObj.operacaoVinculada
    var operacaoVinculadaEmOutroNPJ = valuesObj.operacaoVinculadaEmOutroNPJ
    var acordoRegPortalSim = valuesObj.acordoRegPortalSim
    var acordoRegPortalNao = valuesObj.acordoRegPortalNao
    
    if(publicoAlvoSim===1  && publicoAlvoNao===0 && publicoAlvoALVA===0){
        whereClause.push("(qpc.PBCO_ALVO IN('Sim'))")
    } else if(publicoAlvoSim===1  && publicoAlvoNao===1 && publicoAlvoALVA===0){
        whereClause.push("(qpc.PBCO_ALVO IN('Sim','N'))")
    } else if(publicoAlvoSim===1  && publicoAlvoNao===0 && publicoAlvoALVA===1){
        whereClause.push("(qpc.PBCO_ALVO IN('Sim','ALVA'))")
    } else if(publicoAlvoSim===1  && publicoAlvoNao===1 && publicoAlvoALVA===1){
        whereClause.push("(qpc.PBCO_ALVO IN('Sim','N','ALVA'))")
    } else if(publicoAlvoSim===0  && publicoAlvoNao===0 && publicoAlvoALVA===0){
        
    } else if(publicoAlvoSim===0  && publicoAlvoNao===1 && publicoAlvoALVA===0){
        whereClause.push("(qpc.PBCO_ALVO IN('N'))")
    } else if(publicoAlvoSim===0  && publicoAlvoNao===1 && publicoAlvoALVA===1){
        whereClause.push("(qpc.PBCO_ALVO IN('N','ALVA'))")
    } else if(publicoAlvoSim===0  && publicoAlvoNao===0 && publicoAlvoALVA===1){
        whereClause.push("(qpc.PBCO_ALVO IN('ALVA'))")
    } 

    if(XER==0 && COP===0){

    } else if (XER==1 && COP===0){
        whereClause.push("(qpc.SG_SIS_RSP_CDU_VCLD IN('XER'))")
    } else if (XER==1 && COP===1){
        whereClause.push("(qpc.SG_SIS_RSP_CDU_VCLD IN('XER','COP'))")
    } else if (XER==0 && COP===1){
        whereClause.push("(qpc.SG_SIS_RSP_CDU_VCLD IN('COP'))")
    } 
    if(gecorSomenteSim===1){
        whereClause.push("(qpc.CD_PRF_DEPE_CDU_VCLD IN ((SELECT lpgpc.prefixos FROM creditoPosCop.listPrefGecorPosCop lpgpc)))")
    }
    if(operacaoNaoVinculada===1 && operacaoVinculada===0 && operacaoVinculadaEmOutroNPJ===0){
        whereClause.push("(qpc.TX_NR_PRC_VCLD IN('Opera'))")
    } else if(operacaoNaoVinculada===1 && operacaoVinculada===1 && operacaoVinculadaEmOutroNPJ===0){
        whereClause.push("(qpc.TX_NR_PRC_VCLD IN('Opera','Vinculada'))")
    } else if(operacaoNaoVinculada===1 && operacaoVinculada===0 && operacaoVinculadaEmOutroNPJ===1){
        whereClause.push("(qpc.TX_NR_PRC_VCLD IN('Opera','Vinculada em outro NPJ'))")
    } else if(operacaoNaoVinculada===1 && operacaoVinculada===1 && operacaoVinculadaEmOutroNPJ===1){
        whereClause.push("(qpc.TX_NR_PRC_VCLD IN('Opera','Vinculada','Vinculada em outro NPJ'))")
    } else if(operacaoNaoVinculada===0 && operacaoVinculada===0 && operacaoVinculadaEmOutroNPJ===0){
        
    } else if(operacaoNaoVinculada===0 && operacaoVinculada===1 && operacaoVinculadaEmOutroNPJ===0){
        whereClause.push("(qpc.TX_NR_PRC_VCLD IN('Vinculada'))")
    } else if(operacaoNaoVinculada===0 && operacaoVinculada===1 && operacaoVinculadaEmOutroNPJ===1){
        whereClause.push("(qpc.TX_NR_PRC_VCLD IN('Vinculada','Vinculada em outro NPJ'))")
    } else if(operacaoNaoVinculada===0 && operacaoVinculada===0 && operacaoVinculadaEmOutroNPJ===1){
        whereClause.push("(qpc.TX_NR_PRC_VCLD IN('Vinculada em outro NPJ'))")
    }
    if(acordoRegPortalSim===1 && acordoRegPortalNao===0){
        whereClause.push("(qpc.VLDC_REG_ACRD IN (1))")
    } else if(acordoRegPortalSim===0 && acordoRegPortalNao===1){
        whereClause.push("(qpc.VLDC_REG_ACRD IN (0))")
    } else {

    }
    var finalText = "";
    if (whereClause.length>0){
        for(let val of whereClause){
            finalText = finalText + " AND " + val
        }
    }
   selectComWhere(finalText,(err,data)=> {
       if(err){
            console.log(err)
            callback({
                error: err
            },undefined)
       }else{
            callback(undefined,data)
       }
   })
    
}
