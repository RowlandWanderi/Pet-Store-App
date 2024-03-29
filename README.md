# Phase 4 Pet Store Agency
# By Rowland Wanderi, Samwel Kimote, Pat Aloo
# 25/01/2024

# Project Description

The Pet Store Application is an engaging web-based platform that brings the joy of exploring pet stores and interacting with adorable pets to users. This application provides a seamless experience for users to discover various pet stores, view available pets, leave reviews, and manage their account activities.


## Project Structure

- **Frontend:**
  - The `src` folder contains React components, context providers, and CSS styles.
  - Routing is managed using React Router.
  - User authentication is handled using JWT tokens.

- **Backend:**
  - The Flask application is structured with routes, models, and middleware.
  - SQLAlchemy is used for database models, and Flask JWT Extended manages authentication.


## Setup Instructions

1. **Clone the repository:**
 - clone this repo from github and cd into the cloned directory using vs code
    ```bash
    `git clone https://github.com/your-username/pet-store-app.git`
    `cd pet-store-app` 
    ```
    ```

2. **Install dependencies and run backend:**
- install the dependencies and packages required to run the server . in the terminal enter:

    ```bash
    `pipenv install`
    `pipenv shell`
    `cd server` 
    `flask --debug run`
    ```


3. **Run the application:**
- open a new terminal and then enter the following to install packages and start the front end:
    ```bash
     `cd client` 
    `npm install`
    `npm start`
    ```


    Access the application at `http://localhost:3000`.


    or to view the fully functional deployed website, just visit `https://jovial-creponne-97cf89.netlify.app`

## Testing
 
- To test all our deliverables just run the app and test its functionality.

# Known Bugs

- The petstore app works perfectly.

# Technologies Used

## Frontend
- Context API for state management
- React.js
- React Router
- Bootstrap

## Backend

- Flask (Python)
- Flask SQLAlchemy for database interaction
- Flask JWT Extended for JWT authentication
    


# Contact details

- emails: rowland.wanderi@student.moringaschool.com, samwel.kimote@student.moringaschool.com, pat.aloo@student.moringaschool.com
- phone numbers: 0718074885


# License

-MIT LICENSE Copyright (c) 2024 Pat Aloo, Samel Kimote, Rowland Wanderi