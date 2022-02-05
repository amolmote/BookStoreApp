const bookmodel=require('../models/bookmodel');


addBook = (req,res) =>
{
    const book = new bookmodel(req.body)

    book.save().then( () => {
            return res.status(201).json({
                success:true,
                message: 'book added'
            })
        }
    ).catch(
        (error) => {
            return res.status(400).json({
                success:false,
                error:error
            })
        }
    )
}


updateBook = (req,res) => 
{
    // this will be a put call, hence we will have both req.params and req.body
 
    bookmodel.findOne({bookid: req.params.id} , (err,result) => {

        if(err){
            return res.status(400).json({
                error:err,
                message:"Something went wrong!"
            })
        }

        //req.body ma navo data che
        //result ma juno data che

        //old data       new data
        result.name = req.body.name
        result.author = req.body.author
        result.quantity = req.body.quantity
        // cannot update likes and id

        
        result.save().then( () => {
            return res.status(201).json({
                success:true,
                message:"Book details updated!"
            })
        }).catch(()=>{
            return res.status(400).json({
                success:false,
                message:'Could not update book'
            })
        })

    })

}



deleteBook =  (req,res) =>
{
     bookmodel.findOneAndDelete({bookid: req.params.id}, (err,result) => {                //{bookid: req.params.id} means it use like IF that  a = 5  a ni value 5 hoy to j   , 
        if(err){
            return res.status(400).json({
                error:err,
                message:'Something went wrong'
            })
        }

        else{
            return res.status(201).json({
                message:'Book deleted'
            })
        }
    })
}




updateBookQuantity = (req,res) => 
{
    // this will be a put call, hence we will have both req.params and req.body
 
    bookmodel.findOne({bookid: req.params.id} , (err,result) => {

        if(err){
            return res.status(400).json({
                error:err,
                message:"Something went wrong!"
            })
        }

        //old data       new data
        result.quantity = result.quantity - 1
        // cannot update likes and id

        
        result.save().then( () => {
            return res.status(201).json({
                success:true,
                message:"Book details updated!"
            })
        }).catch(()=>{
            return res.status(400).json({
                success:false,
                message:'Could not update book'
            })
        })


    })

}


module.exports = {
   addBook ,
   updateBook,
   deleteBook,
   updateBookQuantity,
   
}



