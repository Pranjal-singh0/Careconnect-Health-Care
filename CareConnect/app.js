const express = require('express');
const path = require('path');
const session = require('express-session');

const authRoutes = require('./routes/authRoutes');
const homeRoutes = require('./routes/home');
const inventoryRoutes = require('./routes/inventory/inventoryRoutes');
const careConnectRoutes = require('./routes/chatRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'supersecretkey',
    resave: false,
    saveUninitialized: false
  })
);

// 🔹 Landing page route (first page)
app.get('/', (req, res) => {
  if (req.session && req.session.user) {
    return res.redirect('/home'); // redirect if already logged in
  }
  res.render('landing'); // render landing page for non-logged-in users
});

// 🔹 Auth routes (login/register)
app.use('/', authRoutes);

// 🔹 Home route (protected)
app.use('/', homeRoutes);

// Other routes
app.use('/inventory', inventoryRoutes);
app.use('/', careConnectRoutes);
app.use('/admin', adminRoutes);

// 404 Page
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

module.exports = app;
