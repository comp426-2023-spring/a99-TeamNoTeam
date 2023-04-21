## API Endpoints

### Display entry page
- app.get('/')
- Endpoint renders the entry page of our website, designed in the index.ejs file
- [View Code](https://github.com/comp426-2023-spring/a99-TeamNoTeam/blob/bb388fa61a63236d6b6e0d85b7fdf7b3de40707f/backend/server.js#L33)


### Display login page
- app.get('/login')
- Endpoint renders the login page of our website, designed in the login.ejs file
- [View Code](https://github.com/comp426-2023-spring/a99-TeamNoTeam/blob/bb388fa61a63236d6b6e0d85b7fdf7b3de40707f/backend/server.js#L38)


### Display signup page
- app.get('/signup')
- Endpoint renders the account sign up page of our website, designed in the signup.ejs file
- [View Code](https://github.com/comp426-2023-spring/a99-TeamNoTeam/blob/bb388fa61a63236d6b6e0d85b7fdf7b3de40707f/backend/server.js#43)


### Create new user 
- app.post('/user/new')
- Endpoint checks if the requested username is already in the database. If not, a new user is created and added based on the request body.
- [View Code](https://github.com/comp426-2023-spring/a99-TeamNoTeam/blob/bb388fa61a63236d6b6e0d85b7fdf7b3de40707f/backend/server.js#L53)


### Log in a user if username is correct
- app.post('/login')
- Endpoint checks if the given username is in the database. If so, the user is taken to the home page and the corresponding internal settings are set.
- [View Code](https://github.com/comp426-2023-spring/a99-TeamNoTeam/blob/bb388fa61a63236d6b6e0d85b7fdf7b3de40707f/backend/server.js#L86)


### Fetch current user's info and display on the profile page
- app.get('/profile')
- Endpoint shows the current user's name, username, password, and email on their profile page.
- [View Code](https://github.com/comp426-2023-spring/a99-TeamNoTeam/blob/bb388fa61a63236d6b6e0d85b7fdf7b3de40707f/backend/server.js#L118)


### Update current user's profile info
- app.post('/profile')
- Endpoint updates the current user's information and refreshes the profile page, as long as the requested username is not taken.
- [View Code](https://github.com/comp426-2023-spring/a99-TeamNoTeam/blob/bb388fa61a63236d6b6e0d85b7fdf7b3de40707f/backend/server.js#L129)


### Delete current user
- app.post('/profile/delete')
- Endpoint deletes the current user from the database and redirects to the site's entry page.
- [View Code](https://github.com/comp426-2023-spring/a99-TeamNoTeam/blob/bb388fa61a63236d6b6e0d85b7fdf7b3de40707f/backend/server.js#L178)


### Logout current user
- app.get('/profile/logout')
- Endpoint resets the app's current user settings to empty and redirects the user to the entry page.
- [View Code](https://github.com/comp426-2023-spring/a99-TeamNoTeam/blob/373f1874ef0ce8124457eb02fd9c61234241478c/backend/server.js#L195)


### Create new review
- app.post('/home')
- Endpoint creates a new review with the given title, description, photo, etc and adds it to the database, then redirects the user to the reviews page.
- [View Code](https://github.com/comp426-2023-spring/a99-TeamNoTeam/blob/373f1874ef0ce8124457eb02fd9c61234241478c/backend/server.js#L209)


### Fetch all reviews from the database
- app.get('/home')
- Endpoint selects all reviews from the database, with the most recently created first.
- [View Code](https://github.com/comp426-2023-spring/a99-TeamNoTeam/blob/373f1874ef0ce8124457eb02fd9c61234241478c/backend/server.js#L273)


### Fetch all reviews posted by the current user
- app.get('/profile/reviews'), etc
- Endpoint selects all reviews from the database with a uid that matches the current user's id, with the most recently created first.
- [View Code](insert permalink here)

## Template to continue updating as needed
### Title of endpoint
- app.get('/'), etc
- Endpoint description
- [View Code](insert permalink here)

