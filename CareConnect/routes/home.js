const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/core/authMiddleware');

router.get('/home', ensureAuthenticated, (req, res) => {
    res.render('home', { username: req.session.user.username });
});

module.exports = router;
