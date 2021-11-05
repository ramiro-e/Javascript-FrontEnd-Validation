let email = document.querySelector('input#email')
let contraseña = document.querySelector('input#contraseña')

let emailRGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

let vacioError = "El campo esta vacio"
let emailError = "El email introducido es invalido"
let contraseñaError = "El email o la contraseña intrducidos son invalidos"

function setErrorClass(input){
    input.classList.remove("input-success")
    input.classList.add("input-error")
}

function setErrorMsg(errorMsg, error){
    errorMsg.classList.remove("hide-error-msg")
    errorMsg.innerText = error
}

function setSuccessClass(input){
    input.classList.remove("input-error")
    input.classList.add("input-success")
}

function setSuccessMsg(errorMsg){
    errorMsg.classList.add("hide-error-msg")
}

function setSelect(input){
    input.classList.remove("input-success")
    input.classList.add("input-neutral-selected")
}

function setSelectError(input){
    input.classList.remove("input-error")
    input.classList.add("input-error-selected")
}

function focusInput(input){
    if(input
        .classList.contains("input-error")){
        setSelectError(input)
    }else{
        setSelect(input)
    }
}

function blurEmail(){
    let errorMsg = document.querySelector("small#email");
    email.classList.remove("input-neutral-selected")
    email.classList.remove("input-error-selected")
    if(email.value === ""){
        setErrorClass(email)
        setErrorMsg(errorMsg ,vacioError)
        return false
    }else if (!emailRGEX.test(email.value)){
        setErrorClass(email)
        setErrorMsg(errorMsg, emailError)
        return false
    }else{
        setSuccessClass(email)
        setSuccessMsg(errorMsg)
        return true
    }
}

////////////////////////////////// email ////////////////////////////////////

email.addEventListener("focus", function(event){
    focusInput(event.target)
}, true);

email.addEventListener("blur", function( event ) {
    blurEmail()
}, true);

////////////////////////////////// contraseña ////////////////////////////////////

contraseña.addEventListener("focus", function(event){
    focusInput(event.target)
}, true);

contraseña.addEventListener("blur", function( event ) {
    blurTextInput(event.target, contraseñaError, contraseñaRGEX)
}, true);