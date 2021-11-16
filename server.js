const express = require('express')
const db = require('./db')
const app = express()
const port = 8080
const bodyParser = require("body-parser");
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 
// GET
app.get('/get_dates', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    console.log("Getting dates available");
    try {
        const result = await db.pool.query("SELECT DISTINCT date FROM ping_results order by date desc;");
        res.send(result);
    } catch (err) {
        throw err;
    }
});
app.get('/get_pings', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    console.log("Getting todays data");
    try {
        const result = await db.pool.query("SELECT * FROM ping_results ORDER BY date desc, time asc;");
        res.send(result);
    } catch (err) {
        throw err;
    }
});

app.get('/get_today_pings', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    console.log("Getting todays data");
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    console.log(today);
    try {
        const sql = "SELECT * FROM ping_results WHERE date = '" + today.toString() +"' ORDER BY time asc;";
        const result = await db.pool.query(sql);
        res.send(result);
    } catch (err) {
        throw err;
    }
});

// POST
app.post('/get_pings', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    let ping_query = req.body;
    console.log("Getting all pings with a post request of date = " + ping_query.date);
    try {
        const sql = "SELECT * FROM ping_results WHERE date = '" + ping_query.date +"' ORDER BY date desc, time asc;";
        const result = await db.pool.query(sql);
        res.send(result);
    } catch (err) {
        throw err;
    }
});
 
app.listen(port, () => console.log(`Listening on port ${port}`));