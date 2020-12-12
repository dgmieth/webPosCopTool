//====================================================================================================
//           BUSCA QTDE DE REGISTROS PARA CONFIGURAÇCOES ATUAIS NA LOAD DA PAGE SOMENTE
//====================================================================================================
//----------------------------------------------------------------------------------------------------
//                     Busca filtros Setados na rota /retornaFiltrosSetados
//----------------------------------------------------------------------------------------------------
fetch('/retornaFiltrosSetados').then((response)=>{
    response.json().then((data) => {
        uploadConfiguration(data)
        if(hasSavedValues){
            openingPageModalTitle.innerText = "Configuração exitente"
            openingPageModalP1.innerText = 'Já existe uma configuração salva no banco de dados e que foi carregada na página.'
            openingPageModalP2.innerHTML = 'Se desejar alterá-la, clique no botão <strong>Criar Nova</strong>. Após terminada a seleção dos filtros para a nova configuração, clique no botão <strong>Salvar</strong>'
            openingPageModalP3.innerHTML = 'Se desejar retornar para a configuração atual, clique em <strong>Voltar configuração atual</strong>.'
            openingPageModalP4.innerHTML = '<strong>Atenção!!!!!</strong> </br>O botão Voltar configuração atual traz as informações da última configuração salva. Se você clicou em salvar, ele trará essa última configuração salva.'
            $('document').ready(function(){
                $('#openingPageModal').modal('show')
            })
        }else{
            openingPageModalTitle.innerText = "Nenhuma configuração ativa"
            openingPageModalP1.innerText = 'Escolha os filtros desejados, informe um número para a quantidade de protocolos a serem gerados como fluxo e estoque e clique em salvar.'
            $('document').ready(function(){
                $('#openingPageModal').modal('show')
            })
        }
    })
})