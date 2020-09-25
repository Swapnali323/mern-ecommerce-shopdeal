require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = {
  
  apis: ['./routes/*.js'],
  
  swaggerDefinition: {
           info:{
                 version: "1.5.0",
                 title: 'Shopdeal Swagger Documentation',
                 description: 'A api documentation page',
                 contact: {
                     name: 'Swapnali Jadhav'
                 },
                 servers: ["http://localhost:5000"]
             }
         },
};
const specs = swaggerJsdoc(options);

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))



// Routes
app.use('/api', require('./routes/productRouter'))
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/upload'))
app.use('/api', require('./routes/categoryRouter'))
app.use('/api', require('./routes/paymentRouter'))

// Connect to MongoDB
const URI = process.env.MONGODB_URI
mongoose.connect(URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}, err =>{
    if(err) throw err;
    console.log("Connected to Database")
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req, res) =>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    });
}

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>{
    console.log("Server is running on port", PORT)
})

