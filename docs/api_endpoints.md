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


### Display home page
- app.get('/home')
- Endpoint renders the home page of our website containing the meal reviews, designed in the home.ejs file
- [View Code](https://github.com/comp426-2023-spring/a99-TeamNoTeam/blob/bb388fa61a63236d6b6e0d85b7fdf7b3de40707f/backend/server.js#L48)


### Create new user and add it to the database
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




## Template to continue updating as needed
### Title of endpoint
- app.get('/'), etc
- Endpoint description
- [View Code](insert permalink here)

