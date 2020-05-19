const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const bcrypt = require('bcrypt')
const app = express()
const register = require('./controller/register')
const signin = require('./controller/signin')
const profile = require('./controller/profile')
const img = require('./controller/image')
const db = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'aryan',
      password : 'rn47',
      database : 'cleverbrain'
    }
  });


app.use(bodyParser.json())
app.use(cors())

app.post('/signin',signin.handleSignIn(db,bcrypt))
app.post("/register",register.handleRegister(db,bcrypt))
app.get("/profile/:id",(req,res)=>{profile.handleProfile(req,res,db)})
app.put("/image",(req,res)=>{img.handleImage(req,res,db)})
app.post("/imageUrl",(req,res)=>{img.handleImageUrl(req,res)})

app.listen(process.env.PORT|| 3000,()=>{
    console.log(`App is running on port ${process.env.PORT}`)
})



