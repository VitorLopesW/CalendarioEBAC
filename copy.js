const formulario = document.getElementById('formulario')
const footer =document.getElementById('footer')
const totalArray = []
const totalNumero = []

let linhas = '' //escopo global para ter seu valor resetado a cada evento

formulario.addEventListener('submit', function(e) {
    e.preventDefault()

    novaLinha()
    atualizaLinha()
    atualizaContatos()
})

function recarregarAPagina() {
    window.location.reload()
} 

function pressionaReset() {
    let confirmacao = confirm('Tem certeza que deseja limpar a agenda?')
    if (confirmacao == true){
        recarregarAPagina()    
}}

function  novaLinha() {
    const inputNome = document.getElementById('inputNome')
    const inputSobrenome = document.getElementById('inputSobrenome')
    const inputNumero = document.getElementById('inputNumero')
    const inputApelido = document.getElementById('inputApelido')
    let quantidade = 0

    if (totalNumero.includes(inputNumero.value)) {
        alert(`O número ${inputNumero.value} já está atribuído a um outro contato`)
    } else {
        totalNumero.push(inputNumero.value)

        let linha = '<tr>'
        linha += `<td>${inputNome.value}</td>`
        linha += `<td>${inputSobrenome.value}</td>`
        linha += `<td>${inputNumero.value}</td>`
        linha += `<td>${inputApelido.value}</td>`
        linha += `</tr>`
        quantidade += 1
    
        totalArray.push(quantidade)

        linhas += linha
    }

    inputNome.value = '';
    inputSobrenome.value = '';
    inputNumero.value = '';
    inputApelido.value = '';
}

function atualizaLinha() {
    const Tabela = document.querySelector('tbody') //substituimos o tbody pela let linhas dentro do HTML 
    Tabela.innerHTML = linhas
}

function totalContatos() {
    let somaContatos = 0

    for (let i = 0; i < totalArray.length; i++) {
        somaContatos += totalArray[i];
    }

    return somaContatos
}

function atualizaContatos() {
    const contatos = totalContatos()

    document.getElementById('total').innerHTML = 'Total de contatos: ' + contatos
}