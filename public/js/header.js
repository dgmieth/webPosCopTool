const getAllpages = document.querySelectorAll('.nav-item')
const mainPage = document.getElementById('mainPage')
const relProtAbertos = document.getElementById('relProtAbertos')
const regerarProt = document.getElementById('regerarProt')
const confAnteriores = document.getElementById('confAnteriores')

getAllpages.forEach(page => {
    page.classList.remove('active')
})

switch (document.title) {
    case 'Relatório Protocolos':
        relProtAbertos.classList.add('active')
        break;
    case 'Re-gerar Protocolos':
        regerarProt.classList.add('active')
        break;
    case 'Configurações Anteriores':
        confAnteriores.classList.add('active')
        break;
    default:
        mainPage.classList.add('active')
        break;
}





