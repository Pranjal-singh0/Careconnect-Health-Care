// CareConnect/middleware/core/authMiddleware.js

function ensureAuthenticated(req, res, next) {
    // If not logged in → send to login
    if (!req.session || !req.session.user) {
        return res.redirect('/login');
    }
    // Otherwise → allow access
    next();
}

// If user is already logged in → redirect them away from login/register pages
function redirectIfAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return res.redirect('/home');
    }
    next();
}

module.exports = {
    ensureAuthenticated,
    redirectIfAuthenticated
};
