const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
require('dotenv').config()
const app = express();
const bcrypt = require('bcryptjs');
app.use(express.json());
const jwtSecret  = 'srfgadfgadfg';
const jwt = require('jsonwebtoken');
const CookieParser = require('cookie-parser');
const cookieParser = require('cookie-parser');
const secretKey = bcrypt.genSaltSync(10);
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));
app.use(cookieParser());
app.get('/test',(req,res)=>{
    res.json('test ok');
});
//const err = '';
//const token = '';

mongoose.connect(process.env.MONGO_URL);
app.post('/register',async (req,res)=>{
    const{name,email,password} = req.body;
    try {
        const userDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password, secretKey),
        });
        res.json(userDoc);
    } catch (error) {
       // alert('Registeration Failed.')
        res.status(422).json(error)
    }
});



app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email });
    if (userDoc) {
       // console.log('api');
      const passwordOk = bcrypt.compareSync(password, userDoc.password);
      //console.log('api2');
      if (passwordOk) {
        console.log('password');
        jwt.sign({ email: userDoc.email, id: userDoc._id , name: userDoc.name}, jwtSecret,{},(err,token)=>{
           // console.log('apitoken');
            if(err){
                console.log(err);
                throw err;
            }
            
            else{
                console.log('good block');
                res.cookie('token', token).json(userDoc);}
        }
        );
       
      } else {
        res.json('incorrect password');
      }
    } else {
      res.status(422).json('user not found');
    }
  } catch (error) {
    res.status(422).json('login failed');
  }
});


app.get('/profile',(req,res)=>{
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, jwtSecret, {}, (err, user)=>{
            if(err) throw err;
            res.json(user);
        });
    }else{
        req.json(null);
    }
    res.json(token);
})
app.listen(4000);