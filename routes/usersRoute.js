const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs')
const bcrypt = require('bcryptjs')
const { body } = require('express-validator');

const userControllers = require(path.resolve(__dirname,'../controllers/userController'));

let soloLetrasRGEX = /^[a-zA-Z\s]*$/;
let diaRGEX = /^\b(0?[1-9]|[12][0-9]|3[01])\b/;
let mesRGEX = /0[1-9]|1[0-2]/;
let añoRGEX = /(?:(?:19|20)[0-9]{2})/;
let fechaRGEX = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
let emailRGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
let contraseñaRGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;


const validacionesLogin = [
  body('email').custom((value, { req }) => {
    let usersDatabase = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json')));
    let userLogin = usersDatabase.find(usuario => usuario.email == req.body.email);
    if (!userLogin) {
      return false;
    } else if(bcrypt.compare(req.body.contraseña,  userLogin.contraseña)){
      return true;
    }else{
      return false;
    }
  })
]

const ValidationRegister = [
  body('nombre').notEmpty().withMessage('El nombre no puede estar vacío'),
  body('nombre').matches(soloLetrasRGEX).withMessage('El nombre solo puede contener letras'),
  body('apellido').notEmpty().withMessage('El apellido no puede estar vacío'),
  body('apellido').matches(soloLetrasRGEX).withMessage('El apellido solo puede contener letras'),
  body('dia').matches(diaRGEX).withMessage('El dia ingresada es inválido'),
  body('mes').matches(mesRGEX).withMessage('El mes ingresada es inválido'),
  body('año').matches(añoRGEX).withMessage('El año ingresada es inválido'),
  body('año').custom((value, {req}) =>{
    if( fechaRGEX.test(req.body.dia + "/" + req.body.mes + "/" + req.body.año)){
      return true    
    }else{
      return false
    }    
  }).withMessage('La fecha ingresada es invalida'),
  body('email').matches(emailRGEX).withMessage('El email ingresado es inválido'),
  body('email').custom((value, {req}) => {
    let usersDatabase = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json')));
    let checkEmailResult = usersDatabase.some(user => user.email === value);
    if(checkEmailResult){
      return false    
    }else{
      return true
    }    
  }).withMessage('El email ingresado ya esta registrado'),
  body('contraseña').matches(contraseñaRGEX).withMessage('La contraseña debe tener un mínimo de 8 caractéres y contener mayusculas, minusculas y numeros o caracteres especiales'),
  body('repetirContraseña').matches(contraseñaRGEX).withMessage('La confirmación de la contraseña debe tener un mínimo de 8 caractéres'),
  body('repetirContraseña').custom((value, {req}) =>{
    if(req.body.contraseña == value ){
      return true    
    }else{
      return false
    }    
  }).withMessage('Las contraseñas deben ser iguales'),
]


/* GET users listing. */
router.get('/login', userControllers.login);
router.post('/login', validacionesLogin, userControllers.access);
router.get('/logout', userControllers.logout);

router.get('/register', userControllers.register);
router.post('/register', ValidationRegister, userControllers.create);

router.post('/checkEmail', userControllers.checkEmail);
router.post('/checkLogin', userControllers.checkLogin);

module.exports = router;
