let form = document.querySelector('form')
let email = document.querySelector('input#email')
let contraseña = document.querySelector('input#contraseña')

////////////////////////////////// expresiones regulares ////////////////////////////////////

let emailRGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

////////////////////////////////// mensajes de error ////////////////////////////////////

let vacioError = "El campo esta vacio"
let emailError = "El email introducido es invalido"
let contraseñaError = "El email o la contraseña intrducidos son invalidos"
let usuarioError = "La combinacion de email y contraseña no es correcta"

////////////////////////////////// eventos en focus ////////////////////////////////////

function setErrorClass(input){
    input.classList.remove('input-success')
    input.classList.add('input-error')
}

function setErrorMsg(errorMsg, error){
    errorMsg.classList.remove('hide-error-msg')
    errorMsg.innerText = error
}

function setSuccessMsg(errorMsg){
    errorMsg.classList.add('hide-error-msg')
}

function setSelect(input){
    input.classList.remove('input-success')
    input.classList.add('input-neutral-selected')
}

function setSelectError(input){
    input.classList.remove('input-error')
    input.classList.add('input-error-selected')
}

function removeSelected(input) {
    input.classList.remove('input-neutral-selected')
    input.classList.remove('input-error-selected')
}

function focusInput(input){
    if(input.classList.contains('input-error')){
        setSelectError(input)
    }else{
        setSelect(input)
    }
}

////////////////////////////////// eventos en blur ////////////////////////////////////

function blurEmail(){
    let errorMsg = document.querySelector('small#email');

    if(email.value === ""){
        setErrorClass(email)
        setErrorMsg(errorMsg ,vacioError)
        return false
    }else if (!emailRGEX.test(email.value)){
        setErrorClass(email)
        setErrorMsg(errorMsg, emailError)
        return false
    }else{
        setSuccessMsg(errorMsg)
        return true
    }
}

function blurContraseña(){
    let errorMsg = document.querySelector('small#contraseña');

    if(contraseña.value === ""){
        setErrorClass(contraseña)
        setErrorMsg(errorMsg ,vacioError)
        return false
    }else{
        setSuccessMsg(errorMsg)
        return true
    }
}

////////////////////////////////// eventos en submit ////////////////////////////////////

async function checkContraseña(){
    let errorMsg = document.querySelector('small#contraseña');
    let emailExistsResult = await checkForm()
    if(contraseña.value === ""){
        setErrorClass(contraseña)
        setErrorMsg(errorMsg ,vacioError)
        return false
    }else if (emailExistsResult == false){
        setErrorMsg(errorMsg, usuarioError)
        return false
    }else if (emailExistsResult == true){
        setSuccessMsg(errorMsg)
        return true
    }else{
        return true
    }

}

async function checkForm() {
    let currentForm = JSON.stringify({password: contraseña.value, email: email.value})
    let response = await fetchForm(currentForm)
    let data = await response.json();
    let checkLogin = data.checkLogin
    return checkLogin
}

async function fetchForm(form) {
    let response = await fetch('http://localhost:3000/users/checkLogin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: form
    })
    return response;
}


////////////////////////////////// email ////////////////////////////////////

email.addEventListener('focus', function(event){
    focusInput(event.target)
}, true);

email.addEventListener('blur', function( event ) {
    removeSelected(event.target)
    blurEmail()
}, true);

////////////////////////////////// contraseña ////////////////////////////////////

contraseña.addEventListener('focus', function(event){
    focusInput(event.target)
}, true);

contraseña.addEventListener('blur', function( event ) {
    removeSelected(event.target)
    blurContraseña()
}, true);

////////////////////////////////// submit ////////////////////////////////////

form.addEventListener('submit',async function (submit) {
    submit.preventDefault()
    checkSubmitResultado = await checkContraseña()
    if (checkSubmitResultado) {
        form.submit()
    }
})