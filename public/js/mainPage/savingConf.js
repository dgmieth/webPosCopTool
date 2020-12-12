//====================================================================================================
//            ATUALIZA TOTAL DE REGISTROS NA BASE TODA VEZ QUE SE ALTERA ALGUMA OPÇÂO
//====================================================================================================
//----------------------------------------------------------------------------------------------------
//                                  Filtro Público Alvo
//----------------------------------------------------------------------------------------------------
publicoAlvo.childNodes.forEach(div1 =>{
    div1.childNodes.forEach(div2 => {
        div2.childNodes.forEach(div3 => {
            div3.childNodes.forEach(div4 =>{
                div4.childNodes.forEach(e => {
                    e.addEventListener('click', () =>{
                        returnValuesObj()
                    })
                })
            })
        })
    })
})
//----------------------------------------------------------------------------------------------------
//                                  Filtro Sis Responsavel
//----------------------------------------------------------------------------------------------------
sisResponsavel.childNodes.forEach(div1 =>{
    div1.childNodes.forEach(div2 => {
        div2.childNodes.forEach(div3 => {
            div3.childNodes.forEach(div4 =>{
                div4.childNodes.forEach(e => {
                    e.addEventListener('click', () =>{
                        returnValuesObj()
                    })
                })
            })
        })
    })
})
//----------------------------------------------------------------------------------------------------
//                                  Filtro So Pref GECOR
//----------------------------------------------------------------------------------------------------
somenteGecor.childNodes.forEach(div1 =>{
    div1.childNodes.forEach(div2 => {
        div2.childNodes.forEach(div3 => {
            div3.childNodes.forEach(div4 =>{
                div4.childNodes.forEach(e => {
                    e.addEventListener('click', () =>{
                        returnValuesObj()
                    })
                })
            })
        })
    })
})
//----------------------------------------------------------------------------------------------------
//                                  Filtro Situacao Vinculo
//----------------------------------------------------------------------------------------------------
situacaoVinc.childNodes.forEach(div1 =>{
    div1.childNodes.forEach(div2 => {
        div2.childNodes.forEach(div3 => {
            div3.childNodes.forEach(div4 =>{
                div4.childNodes.forEach(e => {
                    e.addEventListener('click', () =>{
                        returnValuesObj()
                    })
                })
            })
        })
    })
})
//----------------------------------------------------------------------------------------------------
//                                  Acordo registrado no portal
//----------------------------------------------------------------------------------------------------
acordoRegistradoPortal.childNodes.forEach(div1 =>{
    div1.childNodes.forEach(div2 => {
        div2.childNodes.forEach(div3 => {
            div3.childNodes.forEach(div4 =>{
                div4.childNodes.forEach(e => {
                    e.addEventListener('click', () =>{
                        returnValuesObj()
                    })
                })
            })
        })
    })
})
//====================================================================================================
//                                         BOTÕES
//====================================================================================================
//----------------------------------------------------------------------------------------------------
//          Limpa configuração selecionada e altera para a última salva na base de dados
//----------------------------------------------------------------------------------------------------
clearConfBtn.addEventListener('click', () => {
    $('document').ready(function(){
        $('#successAlert').hide('fade')
        $('#dangerAlert').hide('fade')
    })
    buttonEnableDisable(1)
    fetch('/retornaFiltrosSetados').then((response)=>{
        response.json().then((data) => {
            uploadConfiguration(data)
        })
    })
})
//----------------------------------------------------------------------------------------------------
//       Limpa todas as selecções/zera inputs e permite usuário realizar nova configuração
//----------------------------------------------------------------------------------------------------
createNewConfBtn.addEventListener('click', () => {
    buttonEnableDisable(2)
    publicoAlvoSim.checked = false
    publicoAlvoNao.checked = false
    publicoAlvoALVA.checked = false
    XER.checked = false
    COP.checked = false
    gecorSomenteSim.checked = false
    operacaoNaoVinculada.checked = false
    operacaoVinculada.checked = false
    operacaoVinculadaEmOutroNPJ.checked = false
    acordoRegPortalSim.checked = false
    acordoRegPortalNao.checked = false
    estoqueNumber.value = ''
    fluxoNumber.value = ''
    returnValuesObj()
})
//----------------------------------------------------------------------------------------------------
//                      Salva nova configuração selecionada pelo ususário
//----------------------------------------------------------------------------------------------------
saveNewConfBtn.addEventListener('click', () => {
    var canPost = false
    var obj = {
        'publicoAlvoSim': changeBoolToInt(publicoAlvoSim.checked),
        'publicoAlvoNao': changeBoolToInt(publicoAlvoNao.checked),
        'publicoAlvoALVA': changeBoolToInt(publicoAlvoALVA.checked),
        'XER': changeBoolToInt(XER.checked),
        'COP': changeBoolToInt(COP.checked),
        'gecorSomenteSim': changeBoolToInt(gecorSomenteSim.checked),
        'operacaoNaoVinculada': changeBoolToInt(operacaoNaoVinculada.checked),
        'operacaoVinculada': changeBoolToInt(operacaoVinculada.checked),
        'operacaoVinculadaEmOutroNPJ': changeBoolToInt(operacaoVinculadaEmOutroNPJ.checked),
        'acordoRegPortalSim': changeBoolToInt(acordoRegPortalSim.checked),
        'acordoRegPortalNao': changeBoolToInt(acordoRegPortalNao.checked),
        'estoqueNumber': changeStringToInt(estoqueNumber.value),
        'fluxoNumber': changeStringToInt(fluxoNumber.value)
    }
    validateObjToSave(obj, (data)=>{
        if (!data){
            alertTimeOut()
            $('document').ready(function(){
                $('#dangerAlert').show('fade')
                $('#dangerAlertCloseBtn').click(function(){
                    $('#dangerAlert').hide('fade')
                })
            })
        }else {
            fetch('/salvaNovaConf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            }).then((response)=>{
                response.json().then((data) => {
                    if(data.error){
                    }else{
                        fetch('/retornaFiltrosSetados').then((response)=>{
                            response.json().then((data) => {
                                uploadConfiguration(data)
                                alertTimeOut()
                                $('document').ready(function(){
                                    $('#successAlert').show('fade')
                                    $('#successAlertCloseBtn').click(function(){
                                        $('#successAlert').hide('fade')
                                    })
                                })
                            })
                        })
                    }
                })
            })
        }
    })
})
