# a99 Final Project: HeelMeals

## Overview

Food is important to college students. That’s why we decided to create a dining hall meal review website for students at UNC.

Sometimes, the name of a dining hall dish isn’t enough to decide whether to indulge in it. Reading the opinions of peers, and seeing the meal itself, will help students determine their future fare.

On HeelMeals, users can create an account and log in to see other students’ reviews. They can post their own reviews, which include a title, description, star rating and photo. And once they move on from their dining hall days, users can delete their account.


## Demo Video

[Link](https://youtu.be/6em9L2bTO6g)
	

## Installation + Run Instructions

1. Clone this repository
2. Inside the directory, run `npm install` to install all required dependencies
3. Run `npm run` to see all of the app's server scripts
4. To start the application, run `npm test` or `npm start`
	- The application on default will be reachable at localhost:3000/
	- To choose a different port, run the app with `node backend/server.js -—port=[insert port number]`
5. Type `Ctrl + C` to terminate the application


## Dependency List
- alert-node: ^5.0.3
- better-sqlite3: ^8.2.0
- body-parser: ^1.20.2
- ejs: ^3.1.9
- express: ^4.18.2
- multer: ^1.4.5-lts.1
- nodemon: ^2.0.22
- morgan: ^1.10.0


## Future Additions
We are proud of the features we implemented! However, we have several future additions in mind for the site
- Delete and edit reviews 
	- Allows users to delete/edit a review if they made a mistake
- Report reviews
	- Allows users to report inappropriate content
- Filtering reviews by various criteria
	- Allows users to apply filters (i.e. Lenoir, Chase, lunch, dinner, dietary restrictions, star level, etc) and see only corresponding reviews
	- Our reviews table is already set up with fields for location and mealtime to implement this in the future	
- Searching for reviews 
	- Allows users to search for terms that match up to a review's title and/or description and see only corresponding reviews

## More Documentation

For more documentation, see the following pages:
- [API Endpoints](https://github.com/comp426-2023-spring/a99-TeamNoTeam/blob/main/docs/api_endpoints.md): info about all our API endpoints, with links to the code for each route
- [Database](https://github.com/comp426-2023-spring/a99-TeamNoTeam/blob/main/docs/database.md): info about the structure of our users, reviews, and logs database tables
- [Roles](https://github.com/comp426-2023-spring/a99-TeamNoTeam/blob/main/docs/roles.md): info about the roles each of the team members performed
- [Meeting Notes](https://github.com/comp426-2023-spring/a99-TeamNoTeam/blob/main/docs/meeting_notes.md): notes from each of our team meetings 
