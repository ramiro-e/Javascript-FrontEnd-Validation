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

////////////////////////////////// expresiones regulares ////////////////////////////////////

let soloLetrasRGEX = /^[a-zA-Z\s]*$/;
let fechaRGEX = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
let emailRGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
let contraseñaRGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

////////////////////////////////// mensajes de error ////////////////////////////////////

let vacioError = "El campo esta vacio"
let soloLetrasError = "El campo solo puede contener letras"
let emailError = "El email ingresado no es valido"
let emailExistError = "El email ingresado ya esta registrado"
let contraseñaError = "La contraseña contener letras mayusculas, minusculas y numeros "
let repetirContraseñaError = "Las contraseñas no coinciden"
let aceptarTyCError = "Debe aceptar los terminos y condiciones"

////////////////////////////////// eventos en focus ////////////////////////////////////

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

function removeSelected(input) {
    input.classList.remove('input-neutral-selected')
    input.classList.remove('input-error-selected')
}

function focusInput(input){
    if(input.classList.contains("input-error")){
        setSelectError(input)
    }else{
        setSelect(input)
    }
}

////////////////////////////////// eventos en blur y submit////////////////////////////////////

function blurTextInput(input, error, RGEX){
    let errorMsgId = "small#" + input.id
    let errorMsg = document.querySelector(errorMsgId);
    removeSelected(input)
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
    removeSelected(input)
    let dates = [dia,mes,año]
    let errorDates = []
    let datePosition = dates.indexOf(input)
    dates.forEach((date, index)=>{
        if ((index <= datePosition && date.value === "") || date.classList.contains('input-error')) {
            if (!errorDates.length){
                errorDates = errorDates + date.id
            }else{
                errorDates = errorDates + ", " + date.id
            }
            setErrorClass(date)
        } else if(index <= datePosition && date.value != "") {
            setSuccessClass(date)
        }
    })
    let error = "El campo " + errorDates + " esta vacio"
    if(errorDates.length > 0){
        setErrorMsg(errorMsg ,error)
        return false
    }else{
        setSuccessMsg(errorMsg)
        return true
    }   
}

function checkInputFecha() {
    let fecha = dia.value + "/" + mes.value + "/" + año.value
    if (fechaRGEX.test(fecha)){
        return true
    }else{
        return false
    }
}

const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

(function populateMonths(){
    for(let i = 0; i < months.length; i++){
        const option = document.createElement('option');
        option.textContent = months[i];
        let value = i + 1
        if(i<9){
            option.value = '0' + value;
        }else{
            option.value = value;
        }
        mes.appendChild(option);
    }

})();

let diaAnterior;

function populateDays(mesNum){
    while(dia.firstChild){
        dia.removeChild(dia.firstChild);
    }
    let diaNum;
    let añoNum = año.value;

    if(mesNum === '01' || mesNum === '03' || mesNum === '05' || mesNum === '07' || mesNum === '08' || mesNum === '10' || mesNum === '12' || mesNum === "") {
        diaNum = 31;
    } else if(mesNum === '04' || mesNum === '06' || mesNum === '09' || mesNum === '11') {
        diaNum = 30;
    }else{
        if(new Date(añoNum, 1, 29).getMonth() === 1){
            diaNum = 29;
        }else{
            diaNum = 28;
        }
    }
    const mesOption = document.createElement('option');
    mesOption.textContent = "Dia";
    mesOption.value = ''
    dia.appendChild(mesOption);
    for(let i = 1; i <= diaNum; i++){
        const option = document.createElement('option');
        option.textContent = i;
        let value = i + 1
        if(i<9){
            option.value = '0' + value;
        }else{
            option.value = value;
        }
        dia.appendChild(option);
    }
    if(diaAnterior){
        dia.value = diaAnterior;
        if(dia.value === ''){
            dia.value = diaAnterior - 1;
        }
        if(dia.value === ''){
            dia.value = diaAnterior - 2;
        }
        if(dia.value === ''){
            dia.value = diaAnterior - 3;
        }
    }
}

function populateYears(){
    let añoNum = new Date().getFullYear();
    for(let i = 0; i < 101; i++){
        const option = document.createElement('option');
        option.textContent = añoNum - i;
        option.value = añoNum - i;
        año.appendChild(option);
    }
}

populateDays(mes.value);
populateYears();


function submitCheckboxCheck(input, error){
    let errorMsg = document.querySelector('small#aceptarTyC');
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
    removeSelected(input)
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

async function blurEmailInput(){
    let errorMsg = document.querySelector('small#email');
    removeSelected(email)
    let emailExistResult = await checkIfEmailExists()
    if(email.value === ""){
        setErrorClass(email)
        setErrorMsg(errorMsg ,vacioError)
        return false
    }else if (!emailRGEX.test(email.value)){
        setErrorClass(email)
        setErrorMsg(errorMsg, emailError)
        return false
    }else if (emailExistResult){
        setErrorClass(email)
        setErrorMsg(errorMsg, emailExistError)
        return false
    }else{
        setSuccessClass(email)
        setSuccessMsg(errorMsg)
        return true
    }

}



async function checkIfEmailExists() {
    let currentEmail = JSON.stringify({email:email.value})
    let response = await fetchEmail(currentEmail)
    let data = await response.json();
    let checkEmail = data.checkEmail

    return checkEmail
}

async function fetchEmail(email) {
    let response = await fetch('http://localhost:3000/users/checkEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: email
    })
    return response;
}

////////////////////////////////// nombre ////////////////////////////////////

nombre.addEventListener('focus', function( event ) {
    focusInput(event.target)
}, true);

nombre.addEventListener('blur', function( event ) {
    blurTextInput(event.target, soloLetrasError, soloLetrasRGEX)
}, true);

////////////////////////////////// apellido ////////////////////////////////////

apellido.addEventListener('focus', function(event){
    focusInput(event.target)
}, true);

apellido.addEventListener('blur', function( event ) {
    blurTextInput(event.target, soloLetrasError, soloLetrasRGEX)
}, true);

////////////////////////////////// dia ////////////////////////////////////

dia.addEventListener('focus', function(event){
    focusInput(event.target)
}, true);

dia.addEventListener('blur', function( event ) {
    blurDateInput(event.target)
}, true);

dia.addEventListener('change', function( event ) {
    blurDateInput(event.target)
    diaAnterior = dia.value;
}, true);

////////////////////////////////// mes ////////////////////////////////////

mes.addEventListener('focus', function(event){
    focusInput(event.target)
}, true);

mes.addEventListener('blur', function( event ) { 
    blurDateInput(event.target)
}, true);

mes.addEventListener('change', function( event ) {
    blurDateInput(event.target) 
    populateDays(mes.value);
}, true);

////////////////////////////////// año ////////////////////////////////////

año.addEventListener('focus', function(event){
    focusInput(event.target)
}, true);

año.addEventListener('blur', function( event ) {
    blurDateInput(event.target)
}, true);

año.addEventListener('change', function( event ) {
    blurDateInput(event.target)
    populateDays(mes.value);
}, true);

////////////////////////////////// email ////////////////////////////////////

email.addEventListener('focus', function(event){
    focusInput(event.target)
}, true);

email.addEventListener('blur', function( event ) {
    blurEmailInput()
}, true);

////////////////////////////////// contraseña ////////////////////////////////////

contraseña.addEventListener('focus', function(event){
    focusInput(event.target)
}, true);

contraseña.addEventListener('blur', function( event ) {
    blurTextInput(event.target, contraseñaError, contraseñaRGEX)
}, true);

////////////////////////////////// repetir contraseña ////////////////////////////////////

repetirContraseña.addEventListener('focus', function(event){
    focusInput(event.target)
}, true);

repetirContraseña.addEventListener('blur', function( event ) {
    blurPasswordRepeat(event.target)
}, true);

////////////////////////////////// aceptarTyC ////////////////////////////////////

aceptarTyC.addEventListener('change', function( event ) {
    submitCheckboxCheck(aceptarTyC, aceptarTyCError)
}, true);

////////////////////////////////// submit ////////////////////////////////////

form.addEventListener('submit', async function( submit ) {
    submit.preventDefault()
    nombreResultado = blurTextInput(nombre, soloLetrasError, soloLetrasRGEX)
    apellidoResultado = blurTextInput(apellido, soloLetrasError, soloLetrasRGEX)
    blurDateInput(dia)
    blurDateInput(mes)
    blurDateInput(año)
    emailResultado = await blurEmailInput()
    contraseñaResultado = blurTextInput(contraseña, contraseñaError, contraseñaRGEX)
    repetirContraseñaResultado = blurPasswordRepeat(repetirContraseña)
    aceptarTyCResultado = submitCheckboxCheck(aceptarTyC, aceptarTyCError)
    fechaResultado = checkInputFecha()
    submit.preventDefault()
    if(nombreResultado && apellidoResultado && fechaResultado &&  emailResultado && contraseñaResultado && repetirContraseñaResultado && aceptarTyCResultado){
        form.submit()
    }else{
        submit.preventDefault()
    }

}, true);