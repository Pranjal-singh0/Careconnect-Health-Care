const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Middleware to require login
function requireLogin(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }
    return res.redirect('/login');
}

// Auth pages
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);

// Logout
router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) console.error(err);
            res.clearCookie('connect.sid');
            return res.redirect('/login');
        });
    } else {
        res.redirect('/login');
    }
});

// Protected home page
router.get('/home', requireLogin, (req, res) => {
    res.render('home', { username: req.session.user.username });
});

module.exports = router;
