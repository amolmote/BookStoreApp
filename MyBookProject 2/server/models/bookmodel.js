const mongoose =  require('mongoose')
const Schema = mongoose.Schema

const BookDetails=new Schema(

    {
        bookid:{ type:String,unique:true,required:true},
        name:{ type:String,required:true},
        author:{ type:String,required:true},
        quantity:{ type:String,required:true},
        likes: {type:String,default:0},
        
    })

module.exports=mongoose.model('bookdetails',BookDetails)
