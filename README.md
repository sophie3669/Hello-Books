[![Build Status](https://travis-ci.org/sophie3669/Hello-Books.svg?branch=develop)](https://travis-ci.org/sophie3669/Hello-Books)
[![Coverage Status](https://coveralls.io/repos/github/sophie3669/Hello-Books/badge.svg?branch=develop)](https://coveralls.io/github/sophie3669/Hello-Books?branch=develop)

# Hello-Books
Hello-Books is a simple application that helps manage a library and its processes like stocking, tracking and renting books. 
With this application users are able to find and rent books. The application also has an admin section where the admin can do things 
like add books, delete books, increase the quantity of a book etc.

## Development
This application is broken into two parts, server(API) and client(reactjs).
The backend(API) was developed using NodeJs with express for routing. PostgreSQL was used for persisting data with sequelizejs as ORM.
The frontend was built using html 5, Css and bootstrap 4

## API DOCUMENTATION
API documentation was designed using swagger, which can be visited via this link                    ```'https://app.swaggerhub.com/apis/HelloBook/HelloBook/1.0.0#/'```
### API FEATURES
HelloBooks has the following API features:

#### Authentication
- It makes use of jsonwebtoken(jwt) for authentication
- It generates a token on successful login and send it as part of response
- It accepts the generated token before given access to all the protected routes

#### Users
- It allows user to create account
- It allows user to login
- It allows user to make favorites and post reviews
- it allows users to borrow a book
- It allows users to return a book
- It allows users to upvote and downvote an existing book

#### Admin
- It allows user to create an account
- It allows user to login with a jwt web token
- It allows users to accept a book to be borrowed
- It allows users to accept a book to be returned
- It allows users to add a book to the library
- It allows users to update a book

#### Messages

- SMS and email notification is sent to group members for Critical messages
- Email notification is sent to users whose books are being reviewed
- In-app notification is sent to users when any of their favorite books get reviewed


 
## Installation
- Clone this repository to have the app on your machine with ```git clone https://github.com/sophie3669/Hello-Books.git```
- Change directory to the app's root with ```cd Hello-Books```
- Pull the development branch with ```git pull origin development```
- Then run ```npm install```  to install the dependencies
- Tranpile, bundle the neccessary files and start the app with ```npm start```
- Then visit ```http://localhost:3000``` to view the app.
- Run ```npm run test``` to run the API tests
- Run ```npm run start``` to run the app


It is also hosted on heroku at <a href="https://hellobooks-sophie.herokuapp.com/" target="_blank">Hello-Books API</a>.

### To test the API with postman:

The API contains different endpoints with their respective payloads as stated below:

| Endpoints                    | Functions                                                               | Payloads                 | Request Methods |
|------------------------------|-------------------------------------------------------------------------|--------------------------|-----------------|
| /api/v1/user/signup             | It allows users to register                                | username, email, firstName, lastName, userName, password and confirmPassword    | POST            |
| /api/v1/user/signin             | It logs users into the app                                       | username and     | POST            |
| /api/v1/group                   | It allows users to create group for notifications                    | groupName and email | POST            |
| /api/v1/books     | It allows admin users to add another book to the book library | userId                | POST            |
| /api/v1/books/:bookId  | It allows admin user to modify a book                    | message and priority     | PUT            |
| /api/v1/users/:userId/borrow/:bookId | It allows admin users to accept a borrowed book        | UserId and bookId              | PUT             |
| /api/v1/users/:userId/return/:bookId            | It enables admin users to accept a returned book                      | userId and bookId               | PUT            |
| /api/v1/books             | It gets all books                     | No payload               | GET            |
| /api/v1/users/:userId/review/:bookId             | It enables users to review books          | userid, bookid              | PUT           |
| /api/v1/users/:userId/fav/:bookId             | it creates a favorite table for a user     | userid, bookid            | POST       
| /api/v1/users/:userId/favbooks  | it retrieves all favorited books for a particular user | userid | GET
| /api/v1/books?sort=upvotes&order=ascending | it returns all books in ascending order by upvotes  | No payload | GET
| /api/v1/users/:userId/return/:bookId         | users can return a book |                   userid, bookid |  POST
| '/api/v1/users/:userId/upVotes/:bookId     |  users can upvote a book |           userid, bookid    |  POST
|  /api/v1/users/:userId/downVotes/:bookId    |  users can downvote a book |           userid, bookid    |  POST
|  /api/v1/users/:userId/borrow/:bookId       |  users can borrow a book |           userid, bookid    |  POST

Note: Login token must be supplied in the headers before accessing all the routes except for ```/api/v1/user/signup``` and ```/api/v1/user/signin```


## Technologies Used
* [NodeJS:](https://nodejs.org/en/) is an open-source, cross-platform JavaScript run-time environment for executing JavaScript code on the server-side.
* [Javascript ES6:](https://en.wikipedia.org/wiki/ECMAScript) ES6 is the sixth major release of the javascript language specification. It enables features like constants, arrow functions, template literals, spread opeartor, etc.

* [PostgreSQL:](https://www.postgresql.org/) PostgreSQL is a powerful, open source object-relational database system (ORDBMS) that offers modern database features such as complex queries, foreign keys, etc.
* [Sequelize:](http://docs.sequelizejs.com/) Sequelize is a promise-based ORM for Node.js that supports different dialects such PostgreSQL, MySQL, and SQLite.
* [Babel:](https://babeljs.io/)  Babel transpiles es6 codes to es5.

## Limitations
- No deletions can occur only editings by the admin user

## Coding Style
- Airbnb: Airbnb is a coding style guide that guides developers to write clean codes

## How to Contribute
- Fork this repository.
- Clone it.
- Create your feature branch on your local machine with ```git checkout -b your-feature-branch```
- Push your changes to your remote branch with ```git push origin your-feature-branch```
- Open a pull request to the master branch, and describe how your feature works


Ensure your codes follow <a href="https://github.com/airbnb/javascript">AirBnB Javascript Styles Guide</a>

The full API documentation can be viewed at <a href=```'https://app.swaggerhub.com/apis/HelloBook/HelloBook/1.0.0#/'``` target="_blank">here</a>

### Author
Princess
Ebokam Sophia Somtochukwu Frances 
E.S.S