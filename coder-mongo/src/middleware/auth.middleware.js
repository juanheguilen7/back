import jwt from "jsonwebtoken";

export function isAuth(req, res, next) {
    //si existe un suuario lo dejo seguir
    if (req.session.user) {
        return res.redirect('/api/products');
    }
    next();

}

export function isGuest(req, res, next) {

    //si no existe un obj usuario en la sesion se llama a next
    if (!req.session.user) {
        return res.redirect('/');
    }
    //si existe un obj usurio en session se redirije 
    next();
}

// Middleware para verificar la autenticación y los permisos de administrador
export function isAdmin(req, res, next) {

    // Verificar si el usuario tiene permisos de administrador
    console.log(req.session.user.role, "auntenticador de admin")
    if (req.session.user.role !== 'Admin') {

        return res.redirect('/api/products'); // Redirigir a la página de productos si no es administrador
    }
    // Si el es administrador, continuar con la siguiente función de middleware
    next()
};

export function authToken(req, res, next) {
    
    if (req.session.user) {
        // Genera el token y firmalo
        const user = req.session.user;
        const token = jwt.sign({ user }, 'B2zdY3B$pHmxW%');

        // Envía el token en una cookie
        res.cookie('jwt', token, { httpOnly: true });

        return next();
    } else {
        return res.send({ err: 'No hay usuario autorizado' });
    }
}
export function notForAdmin (req,res, next){
    if(req.session.user.role === 'Admin'){
        return res.redirect('/api/products')
    }
    next()
}
