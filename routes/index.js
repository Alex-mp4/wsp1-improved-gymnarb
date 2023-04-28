const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const session = require('express-session');
const mysql = require('mysql2');
const { response } = require('express');
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
});
const promisePool = pool.promise();

module.exports = router;

router.get('/', async function (req, res, next) {
    res.render('index.njk', {
        title: 'Landing page',
        login: req.session.login || false
    });
});

router.get('/login', async function (req, res, next) {
    // const [user] = await promisePool.query('SELECT * FROM dbusers');

    res.render('login.njk', { 
        title: 'Log',
        login: req.session.login || false
    });
});

router.post('/login', async function (req, res, next) {
    const { username, password } = req.body;
    const [users] = await promisePool.query('SELECT * FROM adh31customers WHERE name = ?', [username]);


    if (username.length == 0) {
        return res.send('Username is Required')
    }
    if (password.length == 0) {
        return res.send('Password is Required')
    }

    const [user] = await promisePool.query('SELECT * FROM adh31customers WHERE name = ?', [username]);

    if (user.length > 0) {
        bcrypt.compare(password, user[0].password, function (err, result) {
            //logga in eller nåt
    
            if (result === true) {
                // return res.send('Welcome')
                req.session.username = username;
                req.session.login = true;
                req.session.userid = users[0].id;
                return res.redirect('/cart');
            }
    
            else {
                return res.redirect('/login')
            }
    
        })
    } else {
        return res.redirect('/login')
    }
    
});

router.get('/logout', async function (req, res, next) {

    res.render('logout.njk', { title: 'Logout', login: req.session.login || false });
    req.session.login = false;
});

router.get('/crypt/:password', async function (req, res, next) {
    const password = req.params.password
    // const [password] = await promisePool.query('SELECT password FROM dbusers WHERE none = ?', [password]);
    bcrypt.hash(password, 10, function (err, hash) {
        return res.json({ hash });

    })
});

router.get('/register', function (req, res, next) {
    res.render('register.njk', { title: 'register', login: req.session.login || false });

});

router.post('/register', async function (req, res, next) {
    const { username, password, passwordConfirmation } = req.body;

    if (username === "") {
        console.log({ username })
        return res.send('Username is Required')

    }
    else if (password.length === 0) {
        return res.send('Password is Required')
    }
    else if (passwordConfirmation.length === 0) {
        return res.send('Password is Required')
    }
    else if (password !== passwordConfirmation) {
        return res.send('Passwords do not match')
    }

    const [user] = await promisePool.query('SELECT name FROM adh31customers WHERE name = ?', [username]);
    console.log({ user })

    if (user.length > 0) {
        return res.send('Username is already taken')
    } else {
        bcrypt.hash(password, 10, async function (err, hash) {
            const [creatUser] = await promisePool.query('INSERT INTO adh31customers (name, password) VALUES (?, ?)', [username, hash]);
            res.redirect('/login')
        })
    }

});

router.get('/delete', async function (req, res, next) {

    res.render('delete.njk', { title: 'Delete', login: req.session.login || false });

});

router.post('/delete', async function (req, res, next) {
    const { password } = req.body;
    if (req.session.login === true) {
        const [Delet] = await promisePool.query('DELETE FROM adh31customers WHERE password = ?', [password]);
        req.session.login = false
        res.redirect('/')
    }
});

router.get('/accessdenied', async function (req, res, next) {

    res.render('accessdenied.njk', { title: 'Access Denied', login: req.session.login || false });

});