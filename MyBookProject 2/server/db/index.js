const mongoose=require('mongoose');

const db = mongoose.connection;

mongoose.connect('mongodb://localhost:27017/library',{ })           //27017 is common port number for connect mongo

db.once('open',()=>
{
    console.log("Database connect");
})

module.exports = db