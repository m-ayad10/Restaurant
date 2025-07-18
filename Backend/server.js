const express=require('express')
const db = require('./db')
const bodyParser = require('body-parser')
const app=express()
require('dotenv').config() 
const cors=require('cors')
const AuthRouter = require('./Routes/AuthRoutes')
const CategoryRouter = require('./Routes/CategoryRoutes')
const ItemRouter = require('./Routes/ItemRoutes')
const CartRouter = require('./Routes/CartRoutes')
const AdminRouter = require('./Routes/AdminRoutes')
const OrderRouter = require('./Routes/OrderRoutes')
const fileUpload=require('express-fileupload')
const jwt=require('jsonwebtoken')
const cookieParser = require("cookie-parser");

app.use(cookieParser())
app.use(express.json());  // ✅ Replaces bodyParser.json()
app.use(express.urlencoded({ extended: true }));  // ✅ Replaces bodyParser.urlencoded()
app.use(fileUpload({
    useTempFiles: true,  // ✅ Enables temporary file storage
    tempFileDir: "/tmp/",  // ✅ Directory for temp files
}));
const Port=process.env.PORT

app.listen(Port,'0.0.0.0',()=>
{
    console.log('Server Started at PORT no:',Port);
})

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use('/',AuthRouter)

app.use('/',ItemRouter)//  Item
app.use('/category',CategoryRouter)
app.use('/cart',CartRouter)
app.use('/',OrderRouter)//orders
app.use('/admin',AdminRouter)

app.get('/',(req,res)=>
{
    res.send('Hello')
})
