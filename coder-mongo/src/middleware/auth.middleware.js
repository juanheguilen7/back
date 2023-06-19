export function isAuth(req, res, next) {
    //si existe un usuario sigue
    if (req.session.user) {
        next();
    } else {
        //si se redirecciona al login
        res.redirect('/');
    }
}

export function isGuest(req, res, next) {
    //en caso de que sea invita puede avanzar sino debe logear
    if (!req.session.user) {
        next();
    } else {
        res.redirect('/');
    }
}

// Middleware para verificar la autenticación y los permisos de administrador
export function isAdmin(req, res, next) {

    // Verificar si el usuario tiene permisos de administrador
    if (req.session.user.rol !== 'Admin') {
        return res.redirect('/api/products'); // Redirigir a la página de productos si no es administrador
    }

    // Si el es administrador, continuar con la siguiente función de middleware
    next();
};
