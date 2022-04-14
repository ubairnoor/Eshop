const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const morgan = require('morgan');
const mongoose = require('mongoose')
const cors = require('cors');

require('dotenv/config');

//middleware 
app.use(bodyParser.json());
app.use(morgan('tiny'))
app.use(cors());
app.options('*',cors())


const api = process.env.API_URL;
//Routes
const productRouter = require('./routers/products')
const categoriesRouter = require('./routers/categories');
const usersRoutes = require('./routers/users');
//Middle Ware
app.use(`${api}/products`,productRouter)
app.use(`${api}/categories`, categoriesRouter)
app.use(`${api}/users`,usersRoutes)


//Database 
mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
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

