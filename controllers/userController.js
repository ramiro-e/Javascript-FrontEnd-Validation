const path = require('path');
const fs = require('fs');    
const multer = require('multer');
const bcrypt = require('bcryptjs');
const session = require('express-session')

const { validationResult } = require('express-validator');

const userControllers = {
    login: (req, res) => {
        return  res.render(path.resolve(__dirname, '../views/login'), {
            title: "Iniciar Sesión"
        })
    },
    access: (req, res) => {
        let validation = validationResult(req);
        let errors = validation.errors
        if(validation.isEmpty()){
            let usersDatabase = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json')));
            let userLogin = usersDatabase.find(usuario => usuario.email == req.body.email);           //return res.send(userLogin);
            delete userLogin.contraseña;
            req.session.usuario = userLogin;
            if(req.body.recordarme != undefined){
                res.cookie('email', userLogin.email,{maxAge: 1000 * 60 * 60 * 24 * 365})
            }
            return res.redirect('/');
        }else{      
            res.render(path.resolve(__dirname, '../views/login'),{
                title: "Iniciar Sesión",
                errors
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
        let usersDatabase = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json')));
        let result = usersDatabase.some(user => user.email === req.body.email);
        res.json({ checkEmail: result})
    },
    checkLogin: (req, res) => {
        let usersDatabase = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json')));
        let checkUser = usersDatabase.find(usuario => usuario.email == req.body.email);
        if (checkUser) {
            bcrypt.compare(req.body.password, checkUser.contraseña, function(err, result) {
                res.json({ checkLogin: result})
            });
        }else{
            res.json({ checkLogin: false})
        }

    },
}

module.exports = userControllers;