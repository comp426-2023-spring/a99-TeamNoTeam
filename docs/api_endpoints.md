## API Endpoints

### Display entry page
- app.get('/')
- Endpoint renders the entry page of our website, designed in the index.ejs file
- [View Code](https://github.com/comp426-2023-spring/a99-TeamNoTeam/blob/main/backend/server.js#L68)


### Display login page
- app.get('/app/login')
- Endpoint renders the login page of our website, designed in the login.ejs file
- [View Code](https://github.com/comp426-2023-spring/a99-TeamNoTeam/blob/main/backend/server.js#L73)


### Display signup page
- app.get('/app/signup')
- Endpoint renders the account sign up page of our website, designed in the signup.ejs file
- [View Code](https://github.com/comp426-2023-spring/a99-TeamNoTeam/blob/main/backend/server.js#L78)


### Display create review page
- app.get('/app/post')
- Endpoint renders the create review page of our website, designed in the post-review.ejs file
- [View Code](https://github.com/comp426-2023-spring/a99-TeamNoTeam/blob/main/backend/server.js#L83)


### Create new user 
- app.post('/app/user/new')
- Endpoint checks if the requested username is already in the database. If not, a new user is created and added based on the request body.
- [View Code](https://github.com/comp426-2023-spring/a99-TeamNoTeam/blob/main/backend/server.js#L89)


### Log in a user if username is correct
- app.post('/app/login')
- Endpoint checks if the given username is in the database. If so, the user is taken to the home page and the corresponding internal settings are set.
- [View Code](https://github.com/comp426-2023-spring/a99-TeamNoTeam/blob/main/backend/server.js#L124)


### Fetch current user's info and display on the profile page
- app.get('/app/profile')
- Endpoint shows the current user's name, username, password, and email on their profile page.
- [View Code](https://github.com/comp426-2023-spring/a99-TeamNoTeam/blob/main/backend/server.js#L155)


### Update current user's profile info
- app.post('/app/profile')
- Endpoint updates the current user's information and refreshes the profile page, as long as the requested username is not taken.
- [View Code](https://github.com/comp426-2023-spring/a99-TeamNoTeam/blob/main/backend/server.js#L166)


### Delete current user
- app.post('/app/profile/delete')
- Endpoint deletes the current user from the database and redirects to the site's entry page.
- [View Code](https://github.com/comp426-2023-spring/a99-TeamNoTeam/blob/main/backend/server.js#L254)


### Logout current user
- app.get('/app/profile/logout')
- Endpoint resets the app's current user settings to empty and redirects the user to the entry page.
- [View Code](https://github.com/comp426-2023-spring/a99-TeamNoTeam/blob/main/backend/server.js#L266)


### Create new review
- app.post('/app/home')
- Endpoint creates a new review with the given title, description, photo, etc and adds it to the database, then redirects the user to the reviews page.
- [View Code](https://github.com/comp426-2023-spring/a99-TeamNoTeam/blob/main/backend/server.js#L280)


### Fetch all reviews from the database
- app.get('/app/home')
- Endpoint selects all reviews from the database, with the most recently created first.
- [View Code](https://github.com/comp426-2023-spring/a99-TeamNoTeam/blob/main/backend/server.js#L325)


### Fetch all reviews posted by the current user
- app.get('/app/user-reviews/reviews'), etc
- Endpoint selects all reviews from the database with a uid that matches the current user's id, with the most recently created first.
- [View Code](https://github.com/comp426-2023-spring/a99-TeamNoTeam/blob/main/backend/server.js#L343)
