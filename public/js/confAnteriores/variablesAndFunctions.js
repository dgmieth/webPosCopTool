//====================================================================================================
//                                         FUNÇÕES
//====================================================================================================
//----------------------------------------------------------------------------------------------------
//                     Trata objeto retornado da rota /getRelatorioProAbertos
//----------------------------------------------------------------------------------------------------
function tratarLog(data){
    table = $('#relConfAnteriores').DataTable({
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
            {  "targets": 0, "width":"20px"},
            {  "targets": 1, "width":"30px"},
            {  "targets": 2, "width":"60px"},
            {  "targets": 3, "width":"60px"},
            {  "targets": 4, "width":"60px"},
            {  "targets": 5, "width":"60px"},
            {  "targets": 6, "width":"210px"},
            {  "targets": 7, "width":"60px"},
            {  "targets": 8, "width":"60px"},
            {  "targets": 9, "width":"30px"},
            {  "targets": 10, "width":"60px"}
        ],
        order: [[1, 'desc']],
        columns: [
            {data: 'Ativa', class:"d-table-cell d-sm-none d-md-table-cell d-lg-table-cell d-xl-table-cell"},
            {data: 'data_criacao', class:"d-none d-sm-none d-md-none d-lg-none d-xl-table-cell"},
            {data: 'criadoPor', class:"d-none d-sm-none d-md-none d-lg-table-cell d-xl-table-cell"},
            {data: 'publico_alvo', class:"d-none"},
            {data: 'sistema_responsavel',class:"d-none d-sm-table-cell d-md-table-cell d-lg-table-cell d-xl-table-cell"},
            {data: 'prefixo_gecor', class:"d-none d-sm-table-cell d-md-table-cell d-lg-table-cell d-xl-table-cell"},
            {data: 'situacao_vinc', class:"d-none d-sm-table-cell d-md-table-cell d-lg-table-cell d-xl-table-cell"},
            {data: 'acordo_registrado', class:"d-none d-sm-table-cell d-md-table-cell d-lg-table-cell d-xl-table-cell"},
            {data: 'quantidade', class:"d-none d-sm-table-cell d-md-table-cell d-lg-table-cell d-xl-table-cell"},
            {data: 'data_exclusao', class:"d-none d-sm-none d-md-none d-lg-none d-xl-table-cell"},
            {data: 'excluidoPor', class:"d-none d-sm-none d-md-none d-lg-none d-xl-table-cell"}
        ]
        
    })
}