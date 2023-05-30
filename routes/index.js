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
    const [products1] = await promisePool.query('SELECT * FROM adh31products LIMIT 5');
    const [products2] = await promisePool.query('SELECT * FROM adh31products ORDER BY id DESC LIMIT 5');
    const [bestsellers] = await promisePool.query('SELECT * FROM adh31products ORDER BY sales DESC LIMIT 3');
    res.render('index.njk', {
        rows: bestsellers,
        prod: products1,
        prod2: products2,
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

router.get('/collection', async function (req, res, next) {
    const [rows] = await promisePool.query('SELECT * FROM adh31products');
    res.render('collection.njk', {
        rows: rows,
        title: 'Collection',
        login: req.session.login || false
    });
});

router.get('/product/:id', async function (req, res, next) { //kontrollera att id finns, sanitera den (ifall det hade vart en bokstav eller inte existant siffra)
    const [rows] = await promisePool.query("SELECT * FROM adh31products WHERE adh31products.id = ?;", [req.params.id]);
    let [id] = req.params.id;
    console.log(rows)
    console.log(id)
    console.log(req.session.login)
    res.render('product.njk', {
        row: rows[0],
        id: id,
        title: 'Product',
        login: req.session.login || false
    });
});

router.post('/product/:id', async function (req, res, next) { //kontrollera att de finns
    if (req.session.userid > 0) {
        const [rows] = await promisePool.query('INSERT INTO adh31cart (userid, productid) VALUES (?, ?)', [req.session.userid, req.params.id]);
    }
    else {
        res.redirect('/login')
    }
})

router.get('/cart', async function (req, res, next) {
    const [rows] = await promisePool.query("SELECT adh31products.* FROM adh31cart INNER JOIN adh31products ON adh31cart.productid=adh31products.id WHERE adh31cart.userid = ?", [req.session.userid]);
    console.log(rows)
    res.render('cart.njk', { 
        title: 'Cart', 
        rows: rows, 
        login: req.session.login || false 
    })
});

router.post('/cart', async function (req, res, next) { 
    let { productid } = req.body;
    if (productid > 0) {
        productid = parseInt(productid);
        const [rows] = await promisePool.query('DELETE FROM adh31cart WHERE userid = ? AND productid = ? LIMIT 1;', [req.session.userid, productid]);
        res.redirect('/cart');

    }
    else {
        const [rows] = await promisePool.query('DELETE FROM adh31cart WHERE userid = ?;', [req.session.userid]);
        res.redirect('/cart');
    }
})

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
                return res.redirect('/');
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

    res.render('logout.njk', { 
        title: 'Logout', 
        login: req.session.login || false });
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

    res.render('accessdenied.njk', { 
        title: 'You need to be logged in to use this feature', 
        login: req.session.login || false 
    });
});