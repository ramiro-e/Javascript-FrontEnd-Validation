let form = document.querySelector('form')
let nombre = document.querySelector('input#nombre');
let apellido = document.querySelector('input#apellido')
let dia = document.querySelector('select#dia')
let mes = document.querySelector('select#mes')
let año = document.querySelector('select#año')
let email = document.querySelector('input#email')
let contraseña = document.querySelector('input#contraseña')
let repetirContraseña = document.querySelector('input#repetirContraseña');
let aceptarTyC = document.querySelector('input#aceptarTyC');

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
let aceptarTyCError = "Debe aceptar los terminos y condiciones"

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
    let errorMsgId = "small#" + input.id
    let errorMsg = document.querySelector(errorMsgId);
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
    let errorMsg = document.querySelector('small#date')
    input.classList.remove("input-neutral-selected")
    input.classList.remove("input-error-selected")
    let dates = [dia,mes,año]
    let errorDates = []
    let datePosition
    dates.forEach((date, index)=>{
        if (input.id === dates[index].id) {
            datePosition = index
        }
    })
    for (let i = 0; i <= datePosition; i++) {
        let date = dates[i]
        if(date.value === ""){
            if (!errorDates.length){
                errorDates = errorDates + date.id
            }else{
                errorDates = errorDates + ", " + date.id
            }
            setErrorClass(date)
        }else{
            setSuccessClass(date)
        }
    }
    let error = "El campo " + errorDates + " esta vacio"
    if(errorDates.length > 0){
        setErrorMsg(errorMsg ,error)
        return false
    }else{
        setSuccessMsg(errorMsg)
        return true
    }   
}

// function submitDateCheck(){
//     let errorMsg = document.querySelector('date');
//     let dates = [dia,mes,año]
//     let errorDates = []
//     dates.forEach((date)=>{
//         if(date.value === ""){
//             if (!errorDates.length){
//                 errorDates = errorDates + date.id
//             }else{
//                 errorDates = errorDates + ", " + date.id
//             }
//         }
//     })

//     let error = "El campo " + errorDates + " esta vacio"
//     if(!errorDates.length){
//         setErrorMsg(errorMsg ,error)
//     }else{
//         setSuccessMsg(errorMsg)
//     }
// }

function submitCheckboxCheck(input, error){
    let errorMsg = document.querySelector('small#aceptarTyC');
    console.log(errorMsg)
    if(!input.checked){
        setErrorMsg(errorMsg , error)
        return false
    }else{
        setSuccessMsg(errorMsg)
        return true
    }
}



function blurPasswordRepeat(input){
    let errorMsg = document.querySelector('small#repetirContraseña');
    input.classList.remove("input-neutral-selected")
    input.classList.remove("input-error-selected")
    if(input.value === ""){
        setErrorClass(input)
        setErrorMsg(errorMsg ,vacioError)
        return false
    }else if(input.value === contraseña.value && input.value != "" && contraseñaRGEX.test(input.value)){
        setSuccessClass(input)
        setSuccessMsg(errorMsg)
        return true
    }else{
        setErrorMsg(errorMsg ,repetirContraseñaError)
        setErrorClass(input)
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

////////////////////////////////// repetir contraseña ////////////////////////////////////

repetirContraseña.addEventListener("focus", function(event){
    focusInput(event.target)
}, true);

repetirContraseña.addEventListener("blur", function( event ) {
    blurPasswordRepeat(event.target)
}, true);


////////////////////////////////// submit ////////////////////////////////////

form.addEventListener("submit", function( submit ) {
    submit.preventDefault()
    nombreResultado = blurTextInput(nombre, soloLetrasError, soloLetrasRGEX)
    apellidoResultado = blurTextInput(apellido, soloLetrasError, soloLetrasRGEX)
    diaResultado = blurDateInput(dia)
    mesResultado = blurDateInput(mes)
    añoResultado = blurDateInput(año)
    emailResultado = blurTextInput(email, emailError, emailRGEX)
    contraseñaResultado = blurTextInput(contraseña, contraseñaError, contraseñaRGEX)
    repetirContraseñaResultado = blurPasswordRepeat(repetirContraseña)
    aceptarTyCResultado = submitCheckboxCheck(aceptarTyC, aceptarTyCError)
    console.log(aceptarTyCResultado)
    if(nombreResultado && apellidoResultado && diaResultado && mesResultado && añoResultado &&  emailResultado && contraseñaResultado && repetirContraseñaResultado && aceptarTyCResultado){
        form.submit()
    }else{
        submit.preventDefault()
    }

}, true);
