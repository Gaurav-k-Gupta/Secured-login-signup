const ensureAuthenticated = require('../Middlewares/Authentication.jsx');

const router = require('express').Router();

router.get('/',ensureAuthenticated,(req,res)=>{
    console.log('--- Logged in user details---' , req.user);
    res.status(200).json([
        {
            name : "mobile",
            price: "10000"
        },
        {
            name : "TV",
            price : "50000"
        }
    ])
})

module.exports = router;