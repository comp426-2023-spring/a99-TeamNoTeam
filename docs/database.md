## Heelmeals Database

### Tables:
-------------
There are three tables in this database:

- **users** - stores user information including name, username, email, and password
- **reviews** - stores food reviews for our site, and keeps note of who posted each one
- **logs** - stores all interactions on the site (access logs)

### Schemas:
-------------
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
-----------------

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

------------------

**logs Table**:
| field | type |
| --- | ----------- |
| id | INTEGER PRIMARY KEY AUTOINCREMENT |
| remote_addr | VARCHAR |
| remote_user | VARCHAR |
| date | VARCHAR |
| method | VARCHAR |
| url | VARCHAR |
| http_version | VARCHAR |
| status | VARCHAR |
| content_length | VARCHAR |
| referer_url | VARCHAR |
| user_agent | VARCHAR |

Notes:

Information on logs was found from the following (from previous COMP426 semester):
- https://github.com/comp426-2022-fall/schedule/blob/main/16-logs.md#notes 
- https://uncch.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=a0fa1748-080d-4546-bdc3-af3b00e2da90 



