/* This file creates our website database. It includes three tables:
   1) users
   2) reviews
   3) logs */
import database from "better-sqlite3"
// create a new database connection
const db = new database('heelmeals.db')
// check to see if users table exists
const stmt = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='users';`)
let row = stmt.get();
// if users table doesn't exist, create it
if (row == undefined) {

    const sqlInit = `
        CREATE TABLE users ( 
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name VARCHAR, 
            username VARCHAR, 
            password VARCHAR,
            email VARCHAR UNIQUE
        );
    `
    db.exec(sqlInit)
}
// check to see if reviews table exists
const stmt2 = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='reviews';`)
let row2 = stmt2.get();
// if reviews table doesn't exist, create it
if (row2 == undefined) {
    const sqlInit = `
        CREATE TABLE reviews ( 
            rid INTEGER PRIMARY KEY AUTOINCREMENT,
            uid INTEGER,
            title VARCHAR,
            description VARCHAR,
            rating INTEGER,
            photo VARCHAR,
            created DATE,
            location VARCHAR,
            meal VARCHAR,
            FOREIGN KEY(uid) REFERENCES users(id)
        );
    `
    db.exec(sqlInit)
}
// check to see if access log table exists
const stmt3 = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='logs';`)
if (row === undefined) {
    // the following was found here: https://github.com/comp426-2022-fall/schedule/blob/main/17-database.md#notes
    const sqlInit = `
        CREATE TABLE accesslog ( 
            id INTEGER PRIMARY KEY, 
            remote_addr VARCHAR, 
            remote_user VARCHAR, 
            date VARCHAR, 
            method VARCHAR, 
            url VARCHAR, 
            http_version VARCHAR, 
            status INTEGER, 
            content_length VARCHAR,
            referer_url VARCHAR,
            user_agent VARCHAR
        );
    `

    db.exec(sqlInit)
}
export default db;