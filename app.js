const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const morgan = require('morgan');
const mongoose = require('mongoose')
const cors = require('cors');
const Product = require('./models/products');
const Category = require('./models/category');
require('dotenv/config');

//middleware 
app.use(bodyParser.json());
app.use(morgan('tiny'))
app.use(cors());
app.options('*',cors())


const api = process.env.API_URL;
//Routes
const productRouter = require('./routers/products')
const categoriesRouter = require('./routers/categories')
//Middle Ware
app.use(`${api}/products`,productRouter)
app.use(`${api}/categories`, categoriesRouter)


//Database 
mongoose.connect(process.env.CONNECTION_STRING,{
    dbName:'eshop-database'
})
.then(()=>{
    console.log('Database Connection is Ready')
})
.catch((err)=>{
    console.log(err);
})
app.listen(3000,()=>{
    console.log(api)
    console.log('Server is running http://localhost:3000')
})

