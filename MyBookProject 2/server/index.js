const express = require('express')
const bodyparser = require('body-parser')

const cors = require('cors')

const app=express()
const port = 4444


const UserRoute = require('./routes/userroutes')
const AdminRoute = require('./routes/adminroutes')
const CommonRoute = require('./routes/commonroutes')

// var path = require('path')



const db = require('./db')

app.use(bodyparser.urlencoded({extended : true}))         //parsing url encodeed request...extended true parse object will take anytype of datatype

app.use(cors())

app.use(bodyparser.json())          //parsing json request

// app.get('/',(req,res)=>
// {
//     res.send("Get method called");
// })

// app.post('/',(req,res)=>
// {
//     res.send("Post method called");
// })

app.use('/', UserRoute)
app.use('/', AdminRoute)
app.use('/',CommonRoute)


db.on('error',console.error.bind(console,'MongoDB Connection Error'))       


app.listen(port,()=>
    console.log(`server running on port ${port}`)
)