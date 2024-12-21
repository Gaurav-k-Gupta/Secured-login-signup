# Secured-login-signup-system
- This is a secured login and signup system using MERN stack.

### Authentication and Encryption
- The system uses **JWT** and **Bcrypt** packages to verify and authenticate user.
- The critical detail such as password is encryptyed for data security and then stored in the database.

### Database 
- **MongoDB** is used for the database which stores the encrypted password and usernames.

### Protected Routes
- The personal routes and pages are protected and can only be accessed after successfull authentication.
- This feature has been implemented using the JWT (JsonWebTokens) library.


---------------------------------
## Quick set up guide 

### Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (version 14 or above)
- [npm](https://www.npmjs.com/)
- [nodemon](https://nodemon.io/) (for backend development)

### Steps to follow
----

- Clone this Repository

```bash
git clone https://github.com/Gaurav-k-Gupta/Secured-login-signup.git

```
- Navigate to the directory
```bash
    cd Secured-login-signup
```

- start the backend server 
```bash
    cd Backend
    npm install
    nodemon server.jsx
```

- open a new terminal
- Start the frontend server
```bash
    cd Frontend
    npm install
    npm run dev
```

