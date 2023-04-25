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
import morgan from 'morgan';

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

/* Use morgan to log each api call and add each log to an access log file,
as well as add each log to our logs table in the database
*/
const accesslog = fs.createWriteStream('./access.log', {flags: 'a'})
app.use(morgan('combined', { stream: accesslog }));

const args = minimist(process.argv.slice(2));
// if no port argument is passed in, use 3000 as the default
const port = args.port || 3000

app.listen(port, () => {
    console.log("Server listening on port " + port)
});

/* gets information to enter into log database
 this will run each time one of our routes is called 
 resources for this part (from previous COMP426 semester): https://github.com/comp426-2022-fall/schedule/blob/main/16-logs.md#notes,
 https://uncch.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=a0fa1748-080d-4546-bdc3-af3b00e2da90 
 */
app.use((req, res, next) => {
	let logdata = {
		remote_addr: req.ip,
		remote_user: req.remote_user,
		datetime: new Date().toISOString(),
		method: req.method,
		url: req.originalUrl,
		http_version: req.httpVersion,
		status: res.statusCode,
		content_length: req.content_length,
		referer_url: req.get('referer'),
		user_agent: req.get('user-agent')
	}
	const statement = db.prepare('INSERT INTO logs (remote_addr, remote_user, date, method, url, http_version, status, content_length, referer_url, user_agent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
	const info = statement.run(logdata.remote_addr, logdata.remote_user, logdata.datetime, logdata.method, logdata.url, logdata.http_version, logdata.status, logdata.content_length, logdata.referer_url, logdata.user_agent);
	next();
})

// Endpoint shows the entry page
app.get('/', (req, res, next) => {
    res.render("index");
});

// Endpoint shows the login page
app.get('/app/login', (req, res, next) => {
    res.render("login");
});

// Endpoint shows the signup page
app.get('/app/signup', (req, res, next) => {
    res.render("signup");
});

// Endpoint shows the create review page
app.get('/app/post', (req, res, next) => {
    res.render("post-review");

});

// Endpoint creates user and adds it to the database
app.post('/app/user/new/', (req, res, next) => {
	
    // Consolidate data from request
    let userdata = {
        name: req.body.name,
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
	}

    // Insert a user with the correct info

    // See if username is already in the database
    const stmt1 = db.prepare(`SELECT * FROM users WHERE username=?`);
    let found_user = stmt1.get(userdata.username);
    try {
        // If the username is not already in the database, insert it
        if (found_user === undefined) {
            const stmt = `INSERT INTO users (name, username, password, email) VALUES (?, ?, ?, ?);`;
            db.prepare(stmt).run(userdata.name, userdata.username, userdata.password, userdata.email);
            console.log(userdata.name + " created user " + userdata.username);
            alert(userdata.username + ' is now registered!')
            res.render("index");

        } else {
            alert('Username already taken. Please try again.')
            res.redirect('/app/signup')
        }
    } catch {
        alert('Email is already registered under another account.')
    }
});


// Endpoint allows a registered user to login and access the reviews page
app.post('/app/login', (req, res, next) => {
    // Consolidate data from request
    let userdata = {
		username: req.body.username,
		password: req.body.password
	}

    // See if username and corresponding password are in the database
    const stmt1 = db.prepare(`SELECT * FROM users WHERE username=? and password=?`);
    //const stmt1 = db.prepare(`SELECT * FROM users WHERE username='${userdata.username}'`);
    let found_user = stmt1.get(userdata.username, userdata.password);

    // If the username is not in the database (invalid login), refresh login page and present error message
    if (found_user === undefined) {
        alert('Incorrect username, please try again.')
        res.redirect('/app/login');
    // If login was valid, navigate to reviews page
    } else { 
        // Set settings to certain values for displaying login info later
        req.app.set('id', found_user['id']);
        req.app.set('name', found_user['name']);
        req.app.set('username', found_user['username']);
        req.app.set('password', found_user['password']);
        req.app.set('email', found_user['email']);
        res.redirect('/app/home'); 
    }

});


// Endpoint shows the logged in user's info on the profile page
app.get('/app/profile', (req, res, next) => {
    // This sends the needed data to the profile view if we configure that file correctly
    // req.app.get() is able to be used because the login route used req.app.set()
    res.render('profile', {name: req.app.get('name'), 
                            username: req.app.get('username'), 
                            password: req.app.get('password'), 
                            email: req.app.get('email')});
});


// Endpoint updates a user's profile information
app.post('/app/profile', (req, res, next) => {
    
    // Consolidate data from request
    let update = {
        name: req.body.name,
		username: req.body.username,
		password: req.body.password,
	}

    if (update.name == "" && (update.username != "" || update.password != "")) {
        if (update.username == "" && update.password != "") {
            // name and username are not being changed, only update password
            const stmt = db.prepare(`UPDATE users SET password=? WHERE id='${req.app.get('id')}'`);
            stmt.run(update.password)
        } else if (update.username != "" && update.password == "") {
            // name and password are not being changed, only update username
            if (!validUsername(update.username)) {
                alert('Username is taken. Please try again.')
                res.redirect('/app/profile')
                return
            }
            const stmt = db.prepare(`UPDATE users SET username=? WHERE id='${req.app.get('id')}'`);
            stmt.run(update.username)
        } else if (update.username != "" && update.password != "") {
            // name is not being changed, update username and password
            if (!validUsername(update.username)) {
                alert('Username is taken. Please try again.')
                res.redirect('/app/profile')
                return
            }
            const stmt = db.prepare(`UPDATE users SET username=?, password=? WHERE id='${req.app.get('id')}'`);
            stmt.run(update.username, update.password)
        }
    } else if (update.password == "" && (update.username != "" || update.name != "")) {
        if (update.username == "" && update.name != "") {
            // password and username are not being changed, only update name
            const stmt = db.prepare(`UPDATE users SET name=? WHERE id='${req.app.get('id')}'`);
            stmt.run(update.name)
        } else if (update.username != "" && update.name != "") {
            // password is not being changed, update username and name
            if (!validUsername(update.username)) {
                alert('Username is taken. Please try again.')
                res.redirect('/app/profile')
                return
            }
            const stmt = db.prepare(`UPDATE users SET username=?, name=? WHERE id='${req.app.get('id')}'`);
            stmt.run(update.username, update.name)
        }
    } else if (update.username == "" && (update.password != "" || update.name != "")) {
        if (update.password != "" && update.name != "") {
            // username is not being changed, update password and name
            const stmt = db.prepare(`UPDATE users SET password=?, name=? WHERE id='${req.app.get('id')}'`);
            stmt.run(update.password, update.name)
        }
    } else if (update.username != "" && update.name != "" && update.password != null) {
        // update username, name, and password
        if (!validUsername(update.username)) {
            alert('Username is taken. Please try again.')
            res.redirect('/app/profile')
            return
        }
        const stmt = db.prepare(`UPDATE users SET username=?, password=?, name=? WHERE id='${req.app.get('id')}'`);
            stmt.run(update.username, update.name, update.password)
    }

    // Get the new updated user from the database
    const stmt2 = db.prepare(`SELECT * FROM users WHERE id='${req.app.get('id')}'`);
    let found_new_user = stmt2.get();

    // Since the current user has now been updated, we need to reset our settings accordingly
    req.app.set('name', found_new_user['name']);
    req.app.set('username', found_new_user['username']);
    req.app.set('password', found_new_user['password']);
    req.app.set('email', found_new_user['email']);
    alert('Account has been updated!')
    // Refresh the profile page
    res.redirect('/app/profile');
});

function validUsername(name) {
    // returns true if the username is not already in the database
    const stmt1 = db.prepare(`SELECT * FROM users WHERE username=?`);
    let found_user = stmt1.get(name)
    return found_user === undefined
}


// Endpoint deletes an account
app.post('/app/profile/delete', (req, res, next) => {

    // Delete the user from the database
    const stmt1 = db.prepare(`DELETE FROM users WHERE username=?`);
    let deletion = stmt1.run(req.app.get('username'));
    alert(req.app.get('username') + "'s account has been deleted. We're sorry to see you go!")
    // Redirect to the entry page
    res.redirect('/');
});


// Endpoint logs out the current user
app.get('/app/profile/logout', (req, res, next) => {

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
app.post('/app/home', upload.single('photo'), (req, res, next) => {
    // gets the time the review was posted
    const time_posted = new Date();
    const isoDate = time_posted.toISOString(); // converts date object to ISO format for SQL
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
        created: isoDate
	}
    // Insert new review into database
    try {
        const stmt = db.prepare(`INSERT INTO reviews (uid, title, description, rating, photo, created) 
        VALUES (?, ?, ?, ?, ?, ?);`)
        stmt.run(review.uid, review.title, review.desc, review.rating, review.photo, review.created)
        console.log(req.app.get('name') + " created review " + review.title);

        // Refresh the reviews page
        // res.render("home");
        res.redirect('/app/home')
    } catch {
        alert("Oops! Something went wrong...")
        res.redirect('/app/post')
    }
});


// Endpoint gets all reviews from the database
app.get('/app/home', (req, res, next) => {

    // Select all reviews from the database
    const stmt = db.prepare(`SELECT reviews.*, users.username 
    FROM reviews, users 
    WHERE reviews.uid=users.id
    ORDER BY created DESC;`);
    let reviews = stmt.all();

    if (reviews === undefined) {
        res.render('home');
    } else {
        res.render('home', {reviews: reviews});
    }
});


// Endpoint gets all reviews posted by the current user
app.get('/app/user-reviews/reviews', (req, res, next) => {

    // Select all reviews from the database made by the current user (through the uid column)
    const stmt = db.prepare(`SELECT * FROM reviews WHERE uid='${req.app.get('id')}' ORDER BY created DESC;`);
    let reviews = stmt.all();

    if(reviews === undefined) {
        res.render('user-reviews')
    } else {
        res.render('user-reviews', {reviews: reviews})
    }
});