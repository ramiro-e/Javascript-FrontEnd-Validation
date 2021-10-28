let form = document.querySelector('form')
let nombre = document.getElementById('nombre');
let apellido = document.getElementById('apellido')
let dia = document.getElementById('dia')
let mes = document.getElementById('mes')
let año = document.getElementById('año')
let email = document.getElementById('email')
let contraseña = document.getElementById('contraseña')
let repetirContraseña = document.getElementById('repetirContraseña').value;

let soloLetrasRGEX = /^[a-zA-Z\s]*$/;
let diaRGEX = /^\b(0?[1-9]|[12][0-9]|3[01])\b/;
let mesRGEX = /0[1-9]|1[0-2]/;
let añoRGEX = /(?:(?:19|20)[0-9]{2})/;
let emailRGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
let contraseñaRGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

let vacioError = "El campo esta vacio"
let soloLetrasError = "El campo solo puede contener letras"
let emailError = "El campo no contiene un email valido"
let constraseñaError = "La constraseña debe tener almenos 8 caracteres y contener letras y numeros o caracteres especiales"

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

function focusTextInput(event){
    if(event.target.classList.contains("input-error")){
        setSelectError(event)
    }else{
        setSelect(event)
    }
}

function blurTextInput(event, error, RGEX){
    let input = event.target
    let errorMsg = event.target.parentElement.children[2]
    input.classList.remove("input-neutral-selected")
    input.classList.remove("input-error-selected")
    if(input.value === ""){
        setErrorClass(input)
        setErrorMsg(errorMsg ,vacioError)
    }else if (!RGEX.test(input.value)){
        setErrorClass(input)
        setErrorMsg(errorMsg, error)
    }else{
        setSuccessClass(input)
        setSuccessMsg(errorMsg)
    }
}

function focusDateInput(event){
    if(event.target.classList.contains("input-error")){
        setSelectError(event)
    }else{
        setSelect(event)
    }
}

function blurDateInput(event){
    let input = event.target
    let errorMsg = document.getElementById('dateErrorMsg');
    input.classList.remove("input-neutral-selected")
    input.classList.remove("input-error-selected")
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
    console.log(input.value)
    if (input.value === "") {
        setErrorClass(input)
    }else{
        setSuccessClass(input)
    }
}

////////////////////////////////// nombre ////////////////////////////////////

nombre.addEventListener("focus", function( event ) {
    focusTextInput(event)
}, true);

nombre.addEventListener("blur", function( event ) {
    blurTextInput(event, soloLetrasError, soloLetrasRGEX)
}, true);

////////////////////////////////// apellido ////////////////////////////////////

apellido.addEventListener("focus", function(event){
    focusTextInput(event)
}, true);

apellido.addEventListener("blur", function( event ) {
    blurTextInput(event, soloLetrasError, soloLetrasRGEX)
}, true);

////////////////////////////////// dia ////////////////////////////////////

dia.addEventListener("focus", function(event){
    focusTextInput(event)
}, true);

dia.addEventListener("blur", function( event ) {
    blurDateInput(event)
}, true);

////////////////////////////////// mes ////////////////////////////////////

mes.addEventListener("focus", function(event){
    focusTextInput(event)
}, true);

mes.addEventListener("blur", function( event ) {
     blurDateInput(event)
}, true);

////////////////////////////////// año ////////////////////////////////////

año.addEventListener("focus", function(event){
    focusTextInput(event)
}, true);

año.addEventListener("blur", function( event ) {
    blurDateInput(event)
}, true);

////////////////////////////////// email ////////////////////////////////////

email.addEventListener("focus", function(event){
    focusTextInput(event)
}, true);

email.addEventListener("blur", function( event ) {
    blurTextInput(event, soloLetrasError, nombreRGEX)
}, true);

////////////////////////////////// contraseña ////////////////////////////////////

contraseña.addEventListener("focus", function(event){
    focusTextInput(event)
}, true);

contraseña.addEventListener("blur", function( event ) {
    blurTextInput(event, soloLetrasError, nombreRGEX)
}, true);

repetirContraseña.addEventListener("blur", function( event ) {

}, true);


