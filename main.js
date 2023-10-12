// Imput DOM variables

const inputName = document.querySelector('#inputName')
const inputNumber = document.querySelector('#inputNumber')
const inputNickname = document.querySelector('#inputNickname')
const inputSubmit = document.querySelector('#inputSubmit')

// End of imput DOM variables

// DOM variables

const tabela = document.querySelector('#tabela')
const errorAlert = document.querySelector('#errorAlert')
const form = document.querySelector('form')


// End of DOM variables

// Other variables 

let deleteMeNow = 0
let tHeadActive = false
const tableHeader = document.querySelector('thead')
const tableFooter = document.querySelector('tfoot')
const informations = document.querySelector('#informations')

// end of other variables

function  inputSelector(i){
    if(i === 'name'){
        inputName.focus();
    } else if(i === 'nickname'){
        inputNickname.focus();
    } else if(i === 'number'){
        inputNumber.focus();
    }
}

function formatPhoneNumber(input) {
    let phoneNumber = inputNumber.value.replace(/\D/g, '')
    if(input.key == 'Backspace'){
        phoneNumber = phoneNumber.slice(0, -1)
        return 
    }
    if (phoneNumber.length === 11 || phoneNumber.length === 10) {
        phoneNumber = `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7)}`
        console.log('Valid phone number.')
    } else if (phoneNumber.length <= 5) {
        phoneNumber = `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`
    } else if (phoneNumber.length > 5) {
        phoneNumber = `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 6)}-${phoneNumber.slice(6)}`
    } else {
        console.log('Invalid phone number.');
    }
    inputNumber.value = phoneNumber;
}
inputNickname.addEventListener('keydown', function(){
    if(inputNickname.value.length == 11){
        alert('Existe um limite de 10 caracteres para o apelido')
    }
})



inputSubmit.addEventListener('click', function(event){
    event.preventDefault = true
    deleteMeNow +=1
    //Add Names to the table
    const testInputName = inputName.value.replace(/\s+/g, '')
    if(testInputName == ''){
        alert('É preciso preencher um nome')
    } else if(inputNumber.value.length < 14){
        alert('É preciso preencher um numero de telefone valido, incluindo o DDD')
    }
    else{
            //Add the header for the table
        if(tHeadActive === false){tHeadFunction()}
        tabela.innerHTML += `
        <td class='deleteRow${deleteMeNow}'>${inputName.value}</td>
        <td class='deleteRow${deleteMeNow} cell-one'>${inputNickname.value}</td>
        <td class='deleteRow${deleteMeNow} cell-two'>${inputNumber.value}</td>
        <td class='deleteRow${deleteMeNow} delete-btn' onclick='deleteRow(${deleteMeNow})'>DELETAR</td>
        `
        inputName.value = ''
        inputNumber.value = ''
        inputNickname.value = ''
        informationsFunction()
    }
})

function tHeadFunction(){
    tableHeader.innerHTML = `
    <tr>
    <th>Nome</th>
    <th>Apelido</th>
    <th>Telefone</th>
    <th></th>
    </tr>`
    tableFooter.innerHTML = '<th colspan="4"></th>'
    informationsFunction()
    tHeadActive = true 
}
function tHeadFunctionHider(){
    tHeadActive = false
    tableHeader.innerHTML = ``
    tableFooter.innerHTML = ``
    informations.innerHTML= ``
}


function deleteRow(id) {
    const elements = document.querySelectorAll(`.deleteRow${id}`)
    elements.forEach(function(element) {
        element.parentNode.removeChild(element);
    })
    deleteMeNow -= 1
    informationsFunction()
    if(deleteMeNow <= 0){
        tHeadFunctionHider()
    }
}

/// delete all


function deleteAllBtn(){
    if(deleteMeNow >= 1){
        const X = confirm('Você esta prestes a deletar todos os contatos, tem certeza?')
        if(X === true){
            tabela.innerHTML = ''
            deleteMeNow = 0
            tHeadFunctionHider()
        }
    }
}

function informationsFunction(){
    informations.innerHTML= `
    <div ><h2>Total de contatos: ${deleteMeNow}</h2></div>
    <div class="large"><h2></h2></div>
    <div onclick='deleteAllBtn()'><img src='logo/trashcan.svg'></div>`
}
