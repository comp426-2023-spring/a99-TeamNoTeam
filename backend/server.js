// Main file controlling the backend functionality of our website

// Import statements
import minimist from 'minimist';
import sqlite3 from 'better-sqlite3';
import express from 'express';
import db from './database.js';
import {default as path} from 'path';
import bodyParser from 'body-parser';
import multer from 'multer';
import fs from 'fs';
import alert from 'alert-node';

const upload = multer({ dest: 'public/images/'})

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

// Endpoint shows the create review page
app.get('/post', (req, res, next) => {
    res.render("post-review");

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
        console.log(userdata.name + " created user " + userdata.username);
        alert(userdata.username + ' is now registered!')
        res.render("index");

    } else {
        alert('Username already taken. Please try again.')
        res.redirect('/signup')
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

    // If the username is not in the database (invalid login), refresh login page and present error message
    if (found_user === undefined) {
        alert('Incorrect username, please try again.')
        res.redirect('/login');
    // If login was valid, navigate to reviews page
    } else { 
        // Set settings to certain values for displaying login info later
        req.app.set('id', found_user['id']);
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
    let update = {
        name: req.body.name,
		username: req.body.username,
		// password: req.body.password,
		// email: req.body.email,
	}

    // ------ Update user info based on the given username --------

    // See if requested username is already in the database
    const stmt1 = db.prepare(`SELECT * FROM users WHERE username='${update.username}'`);
    let found_user = stmt1.get();

    // If the username is not already in the database, update the current user
    if (found_user === undefined) { 
        const stmt1 = db.prepare(`UPDATE users SET name='${update.name}', username='${update.username}' WHERE id='${req.app.get('id')}'`);
        let updated_user = stmt1.run();
    } else {
        // If requested username is in the database and the id in that row matches the current row, do the update (in case where username isn't being changed)
        if (found_user['id'] === req.app.get('id')) {
            const stmt1 = db.prepare(`UPDATE users SET name='${update.name}', username='${update.username}' WHERE id='${req.app.get('id')}'`);
            let updated_user = stmt1.run();
        } else {
            // If requested username is in the database and the id does NOT match, do not allow the user to change their username (it's taken)
            // TODO: communicate to the user what happened instead of just refreshing
            res.redirect('/profile');
            return; // Stop here in this case
        } 
    }

    // Get the new updated user from the database
    const stmt2 = db.prepare(`SELECT * FROM users WHERE id='${req.app.get('id')}'`);
    let found_new_user = stmt1.get();

    // Since the current user has now been updated, we need to reset our settings accordingly
    req.app.set('name', found_new_user['name']);
    req.app.set('username', found_new_user['username']);
    req.app.set('password', found_new_user['password']);
    req.app.set('email', found_new_user['email']);

    // Refresh the profile page
    res.redirect('/profile');
});


// Endpoint deletes an account
app.post('/profile/delete', (req, res, next) => {

    // Delete the user from the database
    const stmt1 = db.prepare(`DELETE FROM users WHERE username='${req.app.get('username')}'`);
    let deletion = stmt1.run();

    // Redirect to the entry page
    res.redirect('/');
});


// Endpoint logs out the current user
app.get('/profile/logout', (req, res, next) => {

    // Reset the settings
    req.app.set('id', -1) // dummy id 
    req.app.set('name', '');
    req.app.set('username', '');
    req.app.set('password', '');
    req.app.set('email', '');

    // Take the user back to the entry page
    res.redirect('/');
});

// Endpoint creates a new review and adds it to the database
app.post('/home', upload.single('photo'), (req, res, next) => {
    // gets the time the review was posted
    const time_posted = new Date();
    // gets the path to the image buffer that was saved in /images folder
    let path = req.file.path;

    // converts image buffer to image and saves the image to the /images folder
    const imageBuffer = fs.readFileSync(path)
    fs.writeFile((path + '.jpg'), imageBuffer, err => {
        if (err) {
          console.error(err);
        } else {
          console.log('Image saved to file system');
        }
      });
    // edits path so that the photo field in the database can be used on the frontend by excluding 'public/' from all path names
    path = path.slice(7)
    // Consolidate data from request and current user settings
    let review = {
        uid: req.app.get('id'),
        title: req.body.title,
		desc: req.body.description,
		rating: req.body.rating,
        photo: path,
        created: time_posted
	}
    // Question: do I need to do anything with a foreign key here?
    // not exactly sure how the reviews and users link 

    // Another question: should we add a username field to the reviews db so we can 
    // access the username who posted it to display?

    // Insert new review into database
    const stmt = `INSERT INTO reviews (uid, title, description, rating, photo, created) 
        VALUES ('${review.uid}', '${review.title}', 
        '${review.desc}', '${review.rating}',
        '${review.photo}', '${review.created}');`;
    db.exec(stmt)
    console.log(req.app.get('name') + " created review " + review.title);

    // Refresh the reviews page
    res.render("home");


});


// Endpoint was used to test the image upload system
// Can be deleted later
app.get('/test', (req, res, next) => {
    const stmt = db.prepare(`SELECT photo FROM reviews;`);
    let response = stmt.get()
    res.render('image', {image: response.photo})
});


// Endpoint gets all reviews from the database
app.get('/home', (req, res, next) => {

    // Select all reviews from the database
    const stmt = db.prepare(`SELECT * FROM reviews;`);
    let reviews = stmt.all();

    if(reviews === undefined) {
        return; // do nothing
    } else {
        res.send(reviews);
    }
});


// Endpoint gets all reviews posted by the current user
app.get('/profile/reviews', (req, res, next) => {

    // Select all reviews from the database made by the current user (through the uid column)
    const stmt = db.prepare(`SELECT * FROM reviews WHERE uid='${req.app.get('id')}'`);
    let reviews = stmt.all();

    if(reviews === undefined) {
        return; // do nothing
    } else {
        res.send(reviews);
    }
});