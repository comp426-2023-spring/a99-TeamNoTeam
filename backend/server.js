// Main file controlling the backend functionality of our website

// Import statements
import minimist from 'minimist';
import sqlite3 from 'better-sqlite3';
import express from 'express';
import db from './database.js';
import {default as path} from 'path';

const __dirname = path.resolve();

const app = express();
// enables us to pass in file names in the frontend directory to res.render statements
app.set('views', path.join(__dirname, '/frontend'))
app.set("view engine", "ejs")

const args = minimist(process.argv.slice(2));
// if no port argument is passed in, use 3000 as the default
const port = args.port || 3000

app.listen(port, () => {
    console.log("Server listening on port " + port)
})

// Endpoint shows the entry page
app.get('/*', (req, res, next) => {
    res.render("index")
})

// Endpoint creates user and adds it to the database
app.post('/user/new/', (req, res, next) => {
	
    // Consolidate data from request
    let userdata = {
        name: req.body.name,
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
	}

    // Insert a user with the correct info

    // See if username is already in the database
    const stmt1 = db.prepare(`SELECT * FROM users WHERE username='${userdata.username}'`);
    let found_user = stmt1.get();

    // If the username is not already in the database, insert it
    if (found_user === undefined) {
        const stmt = `INSERT INTO users (name, username, password, email) VALUES ('${userdata.name}', '${userdata.username}', '${userdata.password}', '${userdata.email}');`;
        db.exec(stmt)
        res.status(200).json({"message": userdata.name + " created user " + userdata.username});
        // TODO: Fill in what to render here when HTML files are created
        // res.render();

    } else {
        // If the user is already in the database and cannot be created
        // TODO: Fill in what is rendered in this case
        // res.render();
    }
});


