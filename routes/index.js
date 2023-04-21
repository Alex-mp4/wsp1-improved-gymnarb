const express = require('express');
const router = express.Router();
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
    const [rows] = await promisePool.query("SELECT adh31forum.*, adh31users.name FROM adh31forum JOIN adh31users WHERE adh31forum.authorId = adh31users.id ORDER BY createdAt DESC");
    res.render('index.njk', {
        rows: rows,
        title: 'Forum',
        login: req.session.login || false
    });
});