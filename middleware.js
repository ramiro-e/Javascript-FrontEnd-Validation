const path = require('path');
const fs = require('fs'); 
let usersDatabase = JSON.parse(fs.readFileSync(path.resolve(__dirname, './database/users.json')));
module.exports = (req,res,next) =>{
    res.locals.usuario = false;
    if(req.session.usuario){
        res.locals.usuario = req.session.usuario;
        return next();
    }else if(req.cookies.email){
        let usuario = usersDatabase.find(usuario => usuario.email == req.cookies.email);
        delete usuario.password
        req.session.usuario = usuario;
        res.locals.usuario = usuario;
        return next();
    } else{
        return next();
    }
}
