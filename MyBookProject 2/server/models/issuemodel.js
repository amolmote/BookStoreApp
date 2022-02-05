const mongoose =  require('mongoose')
const Schema = mongoose.Schema

const IssueRequest = new Schema(
    {
        useremail:{ type:String,required:true},
        bookid:{ type:String,required:true},
        bookname:{ type:String,required:true},
        status:{ type:String,required:true},
        requestDate:{ type:Date,required:true},
        acceptDate:{ type:Date},
        numberOfDays:{ type:Number,required:true},   
    }
)

module.exports=mongoose.model('IssueRequest',IssueRequest)