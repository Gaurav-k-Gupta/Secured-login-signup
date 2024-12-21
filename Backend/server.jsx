const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter.jsx');
const ProductRouter = require('./Routes/ProductRouter.jsx');

require('dotenv').config();
require('./Models/db.jsx');


const PORT = process.env.PORT || 8080;

app.get('/ping',(req,res)=>{
    res.send('PONG');
})


app.use(bodyParser.json());
app.use(cors());
app.use('/auth',AuthRouter);
app.use('/products',ProductRouter);


app.listen(PORT,()=>{
    console.log(`app is running on ${PORT}`);
})