"""The main file controlling the backend functionality of our website."""

from fastapi import FastAPI

app = FastAPI()


### What the route does ###

# fill in route @app...



### Create new review based on user input ###

@app.post("/api/reviews")
def create_review():
    # create new review in the database
    # TODO: fill in params and return type 
    return


### Get all reviews from the database ###

@app.get("/api/reviews")
def get_reviews():
    # TODO
    # returns a list of reviews from the database


### Create new user based on user input ###

@app.post("/api/users")
def create_user():
    # TODO
    # adds a new user to the database


### Deletes a user from the database ###

@app.delete("/api/users")
def delete_user():
    # TODO
    # deletes a user from the database



