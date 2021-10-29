let form = document.querySelector('form')
let nombre = document.getElementById('nombre');
let apellido = document.getElementById('apellido')
let dia = document.getElementById('dia')
let mes = document.getElementById('mes')
let año = document.getElementById('año')
let email = document.getElementById('email')
let contraseña = document.getElementById('contraseña')
let repetirContraseña = document.getElementById('repetirContraseña');
let aceptarTyC = document.getElementById('aceptarTyC');

let soloLetrasRGEX = /^[a-zA-Z\s]*$/;
let diaRGEX = /^\b(0?[1-9]|[12][0-9]|3[01])\b/;
let mesRGEX = /0[1-9]|1[0-2]/;
let añoRGEX = /(?:(?:19|20)[0-9]{2})/;
let emailRGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
let contraseñaRGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

let vacioError = "El campo esta vacio"
let soloLetrasError = "El campo solo puede contener letras"
let emailError = "El campo no contiene un email valido"
let contraseñaError = "El campo debe contener letras mayusculas, minusculas y numeros "
let repetirContraseñaError = "Las contraseñas no coinciden"

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

function blurTextInput(input, error, RGEX){
    let errorMsg = input.parentElement.children[2]
    input.classList.remove("input-neutral-selected")
    input.classList.remove("input-error-selected")
    if(input.value === ""){
        setErrorClass(input)
        setErrorMsg(errorMsg ,vacioError)
        return false
    }else if (!RGEX.test(input.value)){
        setErrorClass(input)
        setErrorMsg(errorMsg, error)
        return false
    }else{
        setSuccessClass(input)
        setSuccessMsg(errorMsg)
        return true
    }
}

function blurDateInput(input){
    let errorMsg = document.getElementById('dateErrorMsg');
    let error = "El campo " + input.id + " esta vacio"
    input.classList.remove("input-neutral-selected")
    input.classList.remove("input-error-selected")
    if (input.value === "") {
        setErrorClass(input)
        setErrorMsg(errorMsg ,error)
        return false
    }else{
        setSuccessClass(input)
        setSuccessMsg(errorMsg)
        return true
    }
}

function submitDateCheck(){
    let errorMsg = document.getElementById('dateErrorMsg');
    let dates = [dia,mes,año]
    let errorDates = []
    dates.forEach((date)=>{
        if(date.value === ""){
            if (!errorDates.length){
                errorDates = errorDates + " " + date.id
            }else{
                errorDates = errorDates + ", " + date.id
            }
        }
    })

    let error = "El campo " + errorDates + " esta vacio"
    if(dia.value === "" || mes.value === "" || año.value === ""){
        setErrorMsg(errorMsg ,error)
    }else{
        setSuccessMsg(errorMsg)
    }
}

function submitCheckboxCheck(input){
    let errorMsg = document.getElementById('checkboxErrorMsg');
    console.log(input.value)
}

function blurPasswordRepeat(input){
    let errorMsg = input.parentElement.children[2]
    let passwordErrorMsg = contraseña.parentElement.children[2]
    if(input.value === contraseña.value && input.value != "" && contraseñaRGEX.test(input.value)){
        setSuccessClass(input)
        setSuccessMsg(errorMsg)
        return true
    }else{
        setErrorMsg(errorMsg ,repetirContraseñaError)
        setErrorClass(input)
        setErrorMsg(passwordErrorMsg ,repetirContraseñaError)
        setErrorClass(contraseña)
        return false
    }
}

////////////////////////////////// nombre ////////////////////////////////////

nombre.addEventListener("focus", function( event ) {
    focusInput(event.target)
}, true);

nombre.addEventListener("blur", function( event ) {
    blurTextInput(event.target, soloLetrasError, soloLetrasRGEX)
}, true);

////////////////////////////////// apellido ////////////////////////////////////

apellido.addEventListener("focus", function(event){
    focusInput(event.target)
}, true);

apellido.addEventListener("blur", function( event ) {
    blurTextInput(event.target, soloLetrasError, soloLetrasRGEX)
}, true);

////////////////////////////////// dia ////////////////////////////////////

dia.addEventListener("focus", function(event){
    focusInput(event.target)
}, true);

dia.addEventListener("blur", function( event ) {
    blurDateInput(event.target)
}, true);

////////////////////////////////// mes ////////////////////////////////////

mes.addEventListener("focus", function(event){
    focusInput(event.target)
}, true);

mes.addEventListener("blur", function( event ) { 
    blurDateInput(event.target)
}, true);

////////////////////////////////// año ////////////////////////////////////

año.addEventListener("focus", function(event){
    focusInput(event.target)
}, true);

año.addEventListener("blur", function( event ) {
    blurDateInput(event.target)
}, true);

////////////////////////////////// email ////////////////////////////////////

email.addEventListener("focus", function(event){
    focusInput(event.target)
}, true);

email.addEventListener("blur", function( event ) {
    blurTextInput(event.target, emailError, emailRGEX)
}, true);

////////////////////////////////// contraseña ////////////////////////////////////

contraseña.addEventListener("focus", function(event){
    focusInput(event.target)
}, true);

contraseña.addEventListener("blur", function( event ) {
    blurTextInput(event.target, contraseñaError, contraseñaRGEX)
}, true);

repetirContraseña.addEventListener("focus", function(event){
    focusInput(event.target)
}, true);

repetirContraseña.addEventListener("blur", function( event ) {
    blurPasswordRepeat(event.target)
}, true);

form.addEventListener("submit", function( submit ) {
    nombreResultado = blurTextInput(nombre, soloLetrasError, soloLetrasRGEX)
    apellidoResultado = blurTextInput(apellido, soloLetrasError, soloLetrasRGEX)
    diaResultado = blurDateInput(dia)
    mesResultado = blurDateInput(mes)
    añoResultado = blurDateInput(año)
    submitDateCheck()
    emailResultado = blurTextInput(email, emailError, emailRGEX)
    contraseñaResultado = blurTextInput(contraseña, contraseñaError, contraseñaRGEX)
    repetirContraseñaResultado = blurPasswordRepeat(repetirContraseña)
    submitCheckboxCheck(aceptarTyC)
    if(nombreResultado && apellidoResultado && diaResultado && mesResultado && añoResultado &&  emailResultado && contraseñaResultado && repetirContraseñaResultado){
        form.submit()
    }else{
        submit.preventDefault()

    }

}, true);
