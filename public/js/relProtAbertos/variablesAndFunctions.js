//====================================================================================================
//                                         FUNÇÕES
//====================================================================================================
//----------------------------------------------------------------------------------------------------
//                     Trata objeto retornado da rota /getRelatorioProAbertos
//----------------------------------------------------------------------------------------------------
function tratarRelatorio(data){
    table = $('#relProtAbertoTable').DataTable({
        //configurando layout da tabela
        paging: false,
        deferRender: true,
        dom: 'Bfrtip',
        bScrollInfinite: true,
        bScrollCollapse: true,
        sScrollY: '3000px',
        scroolX: false,
        
        data: data,
        
        //configurando filtros da tabela

        //customizando o tamanho das colunas 
       columnDefs: [
            {  "targets": 0, "width":"170px"},
            {  "targets": 1, "width":"170px"},
            {  "targets": 2, "width":"40px"},
            {  "targets": 3, "width":"40px"},
            {  "targets": 4, "width":"190px"},
            {  "targets": 5, "width":"40px"},
            {  "targets": 6, "width":"100px"},
            {  "targets": 7, "width":"190px"},
            {  "targets": 8, "width":"30px"}
        ],
        columns: [
            {data: 'Nr_unico_anterior', class:"d-none d-sm-none d-md-table-cell d-lg-table-cell d-xl-table-cell"},
            {data: 'Nr_unico_novo', class:"d-none d-sm-table-cell d-md-table-cell d-lg-table-cell d-xl-table-cell"},
            {data: 'NPJ', class:"d-none d-sm-none d-md-none d-lg-table-cell d-xl-table-cell"},
            {data: 'tipo_protocolo', class:""},
            {data: 'protocolo',class:""},
            {data: 'dt_inicio', class:"d-none d-sm-none d-md-none d-lg-table-cell d-xl-table-cell"},
            {data: 'etapa', class:"d-none d-sm-none d-md-none d-lg-table-cell d-xl-table-cell"},
            {data: 'prot_vinculado', class:"d-none d-sm-none d-md-none d-lg-none d-xl-table-cell"},
            {data: 't100_demanda_vinculada', class:"d-none"}
        ]
        
    })
}