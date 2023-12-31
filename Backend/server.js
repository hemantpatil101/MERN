const path = require('path');
require('dotenv').config({path:path.resolve(__dirname,'./.env')});
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const {chat} = require('./data');
const {errorHandler,notFound} = require('./middleware/errorMiddleware');

//const dotenv = require('dotenv');
const connectDB = require('./config/db');

//dotenv.config();
connectDB();

const app = express();

app.use(express.json());//TO ACCEPT JSON DATA

app.get('/',(req,res)=>{
    res.send('APi started');
})

app.use('/api/user',userRoutes);
app.use("/api/chat", chatRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log(`Server started on server ${PORT}`));