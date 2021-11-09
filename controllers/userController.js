const path = require('path');
const fs = require('fs');    
const multer = require('multer');
const bcrypt = require('bcryptjs');

const { validationResult } = require('express-validator');

const userControllers = {
    login: (req, res) => {
        return  res.render(path.resolve(__dirname, '../views/login'), {
            title: "Iniciar Sesión"
        })
    },
    access: (req, res) => {
        const errors = validationResult(req);

        if(errors.isEmpty()){
            let usersDatabase = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json')));
            let userLogin = usersDatabase.find(usuario => usuario.email == req.body.email);           //return res.send(userLogin);
            delete userLogin.contraseña;
            req.session.usuario = userLogin;
            if(req.body.recordarme != undefined){
                res.cookie('email', user.email,{maxAge: 1000 * 60 * 60 * 24 * 365})
            }
            return res.redirect('/');
        }else{      
            res.render(path.resolve(__dirname, '../views/login'),{
                title: "Iniciar Sesión"
            });        
        }
    },
    logout: (req,res) =>{
        req.session.destroy();
        res.cookie('email',null,{maxAge: -1});
        res.redirect('/')
    },
    register: (req, res) => {
        return  res.render(path.resolve(__dirname, '../views/register'), {
            title: "Registrarme"
        })
    },
    create: (req, res) => {
        let validation = validationResult(req);
        let errors = validation.errors
        let usersFile = fs.readFileSync(path.resolve(__dirname, '../database/users.json'), {
            encoding: 'utf-8'
        });
        if(validation.isEmpty()){
            let user = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                fecha: req.body.dia + "/" + req.body.mes + "/" + req.body.año,
                contraseña: bcrypt.hashSync(req.body.contraseña, 10),
                role: 1
            }
            let usersFile = fs.readFileSync(path.resolve(__dirname, '../database/users.json'), {encoding: 'utf-8'});
            let users;
            if (usersFile == "") {
                users = [];
            } else {
                users = JSON.parse(usersFile);
            };
            users.push(user);
            usersJSON = JSON.stringify(users, null, 2);
            fs.writeFileSync(path.resolve(__dirname, '../database/users.json'), usersJSON);
            return  res.render(path.resolve(__dirname, '../views/success'), {
                title: "felicitaciones",
            })
        } else {
            return  res.render(path.resolve(__dirname, '../views/register'), {
                title: "Registrarme",
                errors
            })
        }
    },
    checkEmail: (req, res) => {
        console.log("hola")
        console.log(req)
        let usersDatabase = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json')));
        let checkEmailResult
        if(usersDatabase.find(usuario => usuario.email == req.body.email)){
            checkEmailResult = true
        }else{
            checkEmailResult = false 
        }
        res.json(checkEmailResult)
        console.log(checkEmailResult)
        

    }
}

module.exports = userControllers;