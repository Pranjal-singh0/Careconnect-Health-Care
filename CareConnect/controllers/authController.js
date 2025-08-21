const User = require('../models/User'); // adjust path if needed

exports.getLogin = (req, res) => {
    res.render('auth/login', { error: null });
};

exports.getRegister = (req, res) => {
    res.render('auth/registration', { error: null });
};

exports.postRegister = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.render('auth/registration', { error: 'User already exists' });
        }

        await User.create({ name, email, password });
        res.redirect('/login');
    } catch (err) {
        res.send('Error: ' + err.message);
    }
};

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;

    console.log('Login attempt:', email); // 🔹 Show email trying to log in

    try {
        const user = await User.findByEmail(email); // must return user object

        if (!user || user.password !== password) {
            return res.render('auth/login', { error: 'Invalid credentials' });
        }

        // ✅ Set session
        req.session.user = {
            id: user._id,
            username: user.name
        };

        res.redirect('/home'); // redirect after login
    } catch (err) {
        res.send('Error logging in');
    }

};
