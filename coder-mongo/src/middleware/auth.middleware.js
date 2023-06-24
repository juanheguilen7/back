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
    console.log(req.session.user.rol, "auntenticador de admin")
    if (req.session.user.rol !== 'Admin') {

        return res.redirect('/api/products'); // Redirigir a la página de productos si no es administrador
    }
    // Si el es administrador, continuar con la siguiente función de middleware
    next()
};
