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

// enables us to pass in file names from the public directory
app.use(express.static(__dirname + '/public'));

const args = minimist(process.argv.slice(2));
// if no port argument is passed in, use 3000 as the default
const port = args.port || 3000

app.listen(port, () => {
    console.log("Server listening on port " + port)
});

// Endpoint shows the entry page
app.get('/*', (req, res, next) => {
    res.render("index")
})

// Endpoint shows the login page
app.get('/login', (req, res, next) => {
    res.render(login);
});

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


// Endpoint allows a registered user to login and access the reviews page
app.post('/login', (req, res, next) => {
    // Consolidate data from request
    let userdata = {
		username: req.body.username,
		password: req.body.password
	}

    // See if username and corresponding password are in the database
    const stmt1 = db.prepare(`SELECT * FROM users WHERE username='${userdata.username} and password='${userdata.password}'`);
    let found_user = stmt1.get();

    // If the username is not in the database (invalid login), refresh login page
    // TODO: should we make a separate view for after a bad login, or just refresh the login?
    if (found_user === undefined) {
        res.redirect('/login');
    // If login was valid, navigate to reviews page
    } else { 
        // Set settings to certain values for displaying login info later
        req.app.set('name', found_user['name']);
        req.app.set('username', found_user['username']);
        req.app.set('password', found_user['password']);
        req.app.set('email', found_user['email']);
        res.redirect('/reviews'); 
    }

});


// Endpoint shows the logged in user's info on the profile page
app.get('/profile', (req, res, next) => {
    // This sends the needed data to the profile view if we configure that file correctly
    // req.app.get() is able to be used because the login route used req.app.set()
    res.render('profile', {name: req.app.get('name'), 
                            username: req.app.get('username'), 
                            password: req.app.get('password'), 
                            email: req.app.get('email')});
});
