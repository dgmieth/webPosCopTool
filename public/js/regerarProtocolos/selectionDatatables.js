//====================================================================================================
//                                         BOTOES
//====================================================================================================
//----------------------------------------------------------------------------------------------------
//              Botao Regerar - enviar ids de linhas selecionadas para servidor 
//----------------------------------------------------------------------------------------------------
$('#regerarProtBtn').click(function(){
    var idArray = new Array()
    var tblData = $('#relRegerar').DataTable().rows('.selected').data();
    $.each(tblData, function(i, val) {
        idArray.push(tblData[i].id)
    })
    var dataObj = {
        idArr : idArray
    }
    fetch('/regerarRelatorios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataObj)
    }).then((response)=>{
        response.json().then((data) => {
            $(window).scrollTop(0)
            if(data.success){
                successMsg.innerHTML= data.success.data
                $('document').ready(function(){
                    $('#successAlert').show('fade')
                    $('#successAlertCloseBtn').click(function(){
                        $('#successAlert').hide('fade')
                    })
                })
            }else if(data.error){
                dangerMsg.innerHTML = data.error.error
                $('document').ready(function(){
                    $('#dangerAlert').show('fade')
                    $('#dangerAlertCloseBtn').click(function(){
                        $('#dangerAlert').hide('fade')
                    })
                })
            }else{
                warningMsg.innerHTML = data.data
                $('document').ready(function(){
                    $('#warningAlert').show('fade')
                    $('#warningAlertCloseBtn').click(function(){
                        $('#warningAlert').hide('fade')
                    })
                })
            }
            alertTimeOut()
            fetch('/getRelatorioRegerar').then((response) =>{
                response.json().then((data) => {
                    let table = $('#relRegerar').DataTable()
                    table.clear()
                    table.rows.add(data).draw()
                })
            })
        })
    })
    
})
//----------------------------------------------------------------------------------------------------
//                      Botao Deselecionar - deselecionar todas as linhas
//----------------------------------------------------------------------------------------------------
$('#limparSelecaoBtn').click(function(){
    table = $("#relRegerar").DataTable();
    table 
        .rows( '.selected' )
        .nodes()
        .to$() 
        .removeClass( 'selected' )
    enablingButton()
})