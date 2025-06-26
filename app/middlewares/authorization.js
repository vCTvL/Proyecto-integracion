import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import pool from "../db.js";

dotenv.config();

function revisarCookie(req){
    try{
        const cookieJWT= req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4);
        const decodificada= jsonwebtoken.verify(cookieJWT,process.env.JWT_SECRET)
        console.log(decodificada)
        const usuarioARevisar = usuarios.find(usuario => usuario.user === decodificada.user)
        console.log(usuarioARevisar)
        if (!usuarioARevisar) {
            return false
    
        }
        return true;

    }catch{
        return false;
    }
    
}


async function middleware(req, res, next) {
    const usuario = await revisarCookie(req);
    if (!usuario) return next();
    
    if (usuario === "Vicente") {
        return res.redirect("/admin");
    } else {
        return res.redirect("/public");
    }
}

export const methods = {
    
    middleware
};