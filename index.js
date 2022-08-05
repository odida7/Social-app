const express = require('express');
const { default: helmet } = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const uploadRoute = require('./routes/upload')
const path = require("path");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

//connect to mongoDB
mongoose.connect(`mongodb+srv://odida:adido@cluster0.q72p0.mongodb.net/app?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    UseUnifiedTopology: true
}); 

//Mongo connection status
const db = mongoose.connection;
db.on('error', ()=>{
    console.log('error connection');
});
db.once('open',()=>{
    console.log('Connected to MongoDB');
});

app.use('/images', express.static(path.join(__dirname, 'public/images')))

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use(cors());


app.use('/auth', authRoute);
app.use('/users', userRoute);
app.use('/posts', postRoute);
app.use('/upload', uploadRoute)

app.listen(5000, ()=>{
    console.log('Backend is up')
})  

