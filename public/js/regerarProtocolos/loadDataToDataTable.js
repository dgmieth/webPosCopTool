//====================================================================================================
//                        BUSCA RELATORIO DE PROTOCOLOS ABERTOS NA BASE
//====================================================================================================
//----------------------------------------------------------------------------------------------------
//                     Busca relatorio na rota /getRelatorioProAbertos
//----------------------------------------------------------------------------------------------------
fetch('/getRelatorioRegerar').then((response) =>{
    response.json().then((data) => {
        tratarRelatorio(data)
        enablingButton()
    })
})