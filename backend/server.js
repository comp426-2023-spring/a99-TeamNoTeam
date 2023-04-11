// Main file controlling the backend functionality of our website

// Import statements
import minimist from 'minimist';
import sqlite3 from 'better-sqlite3';
import express from 'express';
import db from './database.js';
import {default as path} from 'path';
import bodyParser from 'body-parser';

const __dirname = path.resolve();

const app = express();
// enables us to pass in file names in the frontend directory to res.render statements
app.set('views', path.join(__dirname, '/frontend'))
app.set("view engine", "ejs")

// enables us to pass in file names from the public directory
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const args = minimist(process.argv.slice(2));
// if no port argument is passed in, use 3000 as the default
const port = args.port || 3000

app.listen(port, () => {
    console.log("Server listening on port " + port)
});

// Endpoint shows the entry page
app.get('/', (req, res, next) => {
    res.render("index");
});

// Endpoint shows the login page
app.get('/login', (req, res, next) => {
    res.render("login");
});

// Endpoint shows the signup page
app.get('/signup', (req, res, next) => {
    res.render("signup");
});

// Endpoint shows the home page
app.get('/home', (req, res, next) => {
    res.render("home");
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
    // Commented out lines that refer to a password for now, but we can add it back later if we add password functionality
    let userdata = {
		username: req.body.username,
		// password: req.body.password
	}

    // See if username and corresponding password are in the database
    // const stmt1 = db.prepare(`SELECT * FROM users WHERE username='${userdata.username}' and password='${userdata.password}'`);
    const stmt1 = db.prepare(`SELECT * FROM users WHERE username='${userdata.username}'`);
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
        res.redirect('/home'); 
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


// Endpoint updates a user's profile information
app.post('/profile', (req, res, next) => {
    
    // Consolidate data from request
    let userdata = {
        name: req.body.name,
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
	}

    // Update user info based on the given username
    // This is a bit buggy right now because it doesn't allow the username to be changed
    // Also, could change another account in the database if the username's taken by another user
    // Frontend may need to assert that the username cannot be changed?
    const stmt1 = db.prepare(`UPDATE users SET name='${userdata.name}', password='${userdata.password}', email='${userdata.email}' WHERE username='${userdata.username}'`);
    let update = stmt1.run();

    // Since the current user has now been updated, we need to set our settings accordingly
    req.app.set('name', found_user['name']);
    req.app.set('username', found_user['username']);
    req.app.set('password', found_user['password']);
    req.app.set('email', found_user['email']);

    // Refresh the profile page
    res.redirect('/profile');
});
