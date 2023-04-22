## Heelmeals Database

### Tables:
There are three tables in this database:

- **users** - stores user information including name, username, email, and password
- **reviews** - stores food reviews for our site, and keeps note of who posted each one
- **logs** - [Need to add]

### Schemas:
**users Table**:
| field | type |
| --- | ----------- |
| id | INTEGER PRIMARY KEY AUTOINCREMENT |
| name | VARCHAR |
| username | VARCHAR |
| password | VARCHAR |
| email | VARCHAR UNIQUE |

Notes:
- any one email can only be registered under one account.

**reviews Table**:
| field | type |
| --- | ----------- |
| rid | INTEGER PRIMARY KEY AUTOINCREMENT |
| uid | INTEGER |
| title | VARCHAR |
| description | VARCHAR |
| rating | VARCHAR |
| photo | VARCHAR |
| created | DATE |
| location | VARCHAR |
| meal | VARCHAR |
| | FOREIGN KEY(uid) REFERENCES users(id) ON DELETE CASCADE| 

Notes:
- uid references a user id of who posted that review.
- location is for a future extension and refers to the dining hall location (e.g. Chase, Lenoir, etc.)
- meal is for a future extension and refers to the "time of day" the meal is (e.g. Breakfast, Brunch, Lunch, Dinner)

**logs Table**:
| field | type |
| --- | ----------- |



