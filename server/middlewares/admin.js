export function checkAdminAuth(req, res, next) { 
    if(!req.cookies) return res.redirect('/admin/signIn');

    let tokenAdmin = req.cookies.admTk;

    next();
};