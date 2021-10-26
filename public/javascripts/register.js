let form = document.querySelector('form')
let nombre = document.getElementById('nombre');
let apellido = document.getElementById('apellido')
let dia = document.getElementById('dia')
let mes = document.getElementById('mes')
let año = document.getElementById('año')
let email = document.getElementById('email')
let contraseña = document.getElementById('contraseña')
let repetirContraseña = document.getElementById('repetirContraseña').value;

let nombreRGEX = /^[a-zA-Z]/;
let apellidoRGEX = /^[a-zA-Z]/;
let diaRGEX = /^\b(0?[1-9]|[12][0-9]|3[01])\b/;
let mesRGEX = /0[1-9]|1[0-2]/;
let añoRGEX = /(?:(?:19|20)[0-9]{2})/;
let emailRGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
let contraseñaRGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

let vacioError = "El campo no puede estar vacio"
let soloLetrasError = "El campo no puede contener numeros o caracteres especiales"
let emailError = "El campo no contiene un email valido"
let constraseñaError = "La constraseña debe tener almenos 8 caracteres y contener letras y numeros o caracteres especiales"

function setError(event , error){
    event.target.classList.remove("input-success")
    event.target.classList.add("input-error")
}

nombre.addEventListener("focus", function( event ) {
    event.target.classList.remove("input-error")
    event.target.classList.remove("input-success")
    if(event.target.classList.contains("input-error") && event.target.value === ""){
        event.target.classList.add("input-error-selected")
    }else{
        event.target.classList.add("input-neutral-selected")
    }
}, true);

nombre.addEventListener("blur", function( event ) {
    event.target.classList.remove("input-neutral-selected")
    event.target.classList.remove("input-error-selected")
    if(event.target.value === ""){
        setError(event)
    }else if (!nombreRGEX.test(event.target.value)){
        console.log("RGEX")
        setError(event)
    }else{
        event.target.classList.remove("input-error")
        event.target.classList.add("input-success")        
    }
    console.log(nombreRGEX.test(event.target.value))
}, true);

apellido.addEventListener("blur", function( event ) {
    if(event.target.value === ""){
        event.target.classList.add("input-error")

    }
}, true);

dia.addEventListener("blur", function( event ) {
    if(event.target.value === ""){
        event.target.classList.add("input-error")

    }
}, true);

mes.addEventListener("blur", function( event ) {
    if(event.target.value === ""){
        event.target.classList.add("input-error")

    }
}, true);

año.addEventListener("blur", function( event ) {
    if(event.target.value === ""){
        event.target.classList.add("input-error")

    }
}, true);

email.addEventListener("blur", function( event ) {
    if(event.target.value === ""){
        event.target.classList.add("input-error")

    }
}, true);

contraseña.addEventListener("blur", function( event ) {
    if(event.target.value === ""){
        event.target.classList.add("input-error")

    }
}, true);

repetirContraseña.addEventListener("blur", function( event ) {

}, true);

function setError(event){
    event.target.classList.add("input-error")

}



