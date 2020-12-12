const successMsg = document.getElementById('successMsg')
const warningMsg = document.getElementById('warningMsg')
const dangerMsg = document.getElementById('dangerMsg')

const regerarProtBtn = document.getElementById('regerarProtBtn')
const limparSelecaoBtn = document.getElementById('limparSelecaoBtn')
//====================================================================================================
//                                         FUNÇÕES
//====================================================================================================
//----------------------------------------------------------------------------------------------------
//                     Trata objeto retornado da rota /getRelatorioProAbertos
//----------------------------------------------------------------------------------------------------
function tratarRelatorio(data){
    table = $('#relRegerar').DataTable({
        //configurando layout da tabela
        paging: false,
        deferRender: true,
        dom: 'Bfrtip',
        bScrollInfinite: true,
        bScrollCollapse: true,
        sScrollY: '3000px',
        data: data,
        
        //configurando filtros da tabela

        //customizando o tamanho das colunas 
        fixedColumns:   {
            leftColumns: 2
        },
       columnDefs: [
            {  "targets": 0, className:"select-checkbox", orderable: false, width:"5px"},
            {  "targets": 1, "width":"170px"},
            {  "targets": 2, "width":"170px"},
            {  "targets": 3, "width":"40px"},
            {  "targets": 4, "width":"40px"},
            {  "targets": 5, "width":"190px"},
            {  "targets": 6, "width":"40px"},
            {  "targets": 7, "width":"100px"},
            {  "targets": 8, "width":"30px"},
            {  "targets": 9, "width":"30px"}
        ],
        columns: [
            {data: null, className: "select-checkbox", defaultContent:''},
            {data: 'Nr_unico_anterior', class:"d-none d-sm-none d-md-table-cell d-lg-table-cell d-xl-table-cell"},
            {data: 'Nr_unico_novo', class:"d-none d-sm-table-cell d-md-table-cell d-lg-table-cell d-xl-table-cell"},
            {data: 'NPJ', class:"d-none d-sm-none d-md-none d-lg-table-cell d-xl-table-cell"},
            {data: 'tipo_protocolo', class:""},
            {data: 'protocolo',class:""},
            {data: 'dt_inicio', class:"d-none d-sm-none d-md-none d-lg-table-cell d-xl-table-cell"},
            {data: 'etapa', class:"d-none d-sm-none d-md-none d-lg-table-cell d-xl-table-cell"},
            {data: 't100_demanda_vinculada', class:"d-none"},
            {data: 'id', class:"d-none"}
        ]
        }),
    $('#relRegerar tbody').on( 'click', 'tr', function () {
        $(this).toggleClass('selected')
        enablingButton()
    } ),

    $('#button').click( function () {
        alert( table.rows('.selected').data().length +' row(s) selected' );
    } )
}
//----------------------------------------------------------------------------------------------------
//                                         Enable/disable buttons
//----------------------------------------------------------------------------------------------------
function enablingButton(){
    if($('#relRegerar').DataTable().rows('.selected').count()>0){
        enableButtons(true)
    }else{
        enableButtons(false)
    }
}
function enableButtons(value){
    if(value){
        regerarProtBtn.classList.remove('disabled')
        limparSelecaoBtn.classList.remove('disabled')
    }else{
        regerarProtBtn.classList.add('disabled')
        limparSelecaoBtn.classList.add('disabled')
    }
    regerarProtBtn.disabled = !value
    limparSelecaoBtn.disabled = !value
}
//----------------------------------------------------------------------------------------------------
//                                          Time out para alerts
//----------------------------------------------------------------------------------------------------
function alertTimeOut(){
    setTimeout(()=>{
        $('#successAlert').hide('fade')
        $('#dangerAlert').hide('fade')
        $('#warningAlert').hide('fade')
    },5000)
}