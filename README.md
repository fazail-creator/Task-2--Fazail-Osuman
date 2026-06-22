Authenticator App
[ Node.js ]  [ Express ]  [ MySQL ]  [ bcrypt ]


About
Authenticator App is a lightweight authentication starter that demonstrates a complete login/register flow. It is suitable as a learning project or as a foundation for building more complex web applications.

Features
•	User registration with hashed passwords (bcrypt)
•	Login with email and password
•	Persistent session via localStorage
•	Protected dashboard with personalised welcome message
•	List of all registered users
•	Logout functionality

Tech Stack
•	Backend: Node.js + Express.js
•	Database: MySQL (mysql2 driver)
•	Password hashing: bcryptjs
•	Config: dotenv
•	Frontend: HTML5, CSS, Vanilla JavaScript

API Endpoints

Method	Endpoint	Body	Response
POST	/api/auth/register	{ name, email, password }	201 / 400
POST	/api/auth/login	{ email, password }	200 / 400 / 401
GET	/api/auth/users	—	200 array of users

Project Structure
auth-app/
├── server.js
├── db.js
├── .env
├── routes/auth.js
└── frontend/
    ├── index.html
    ├── register.html
    ├── dashboard.html
    ├── script.js
    └── styles.css
