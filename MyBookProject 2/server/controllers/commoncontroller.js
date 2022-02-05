const bookmodel = require('../models/bookmodel')
const issuemodel=require('../models/issuemodel');


getBooks = (req,res) =>
{
    bookmodel.find({}).then((result)=>
   {
        // console.log("book found");
        res.send(result);

   }).catch((error) =>
   {
       //  console.log("book not found");
        res.send(error);
   });   
}














addRequest = (req,res) => {
    
    issuemodel.insertMany(req.body).then(()=>{
        return res.status(200).json({
            success:true,
            message:"Request successfully added"
        })
    }).catch((error)=>{
        return res.status(400).json({
            error:error,
            message:'Request not added'
        })
    })
}



statusUpdate = (req,res) => {

    issuemodel.findOne({useremail:req.params.email,bookid:req.params.id, status:'requested'}, (err,result) => {
        if(err){
            return res.status(400).json({
                error:err,
                message:'Something went wrong'
            })
        }

        result.status = req.body.status
        result.acceptDate = req.body.acceptDate

        result.save().then(()=>{
            return res.status(200).json({
                success:true,
                message:'Status updated'
            })
        }).catch(err=>{
            return res.status(200).json({
                error:err,
                message:'Status not updated'
            })
        })
    })
}





getIssueRequest = (req,res) => {
    issuemodel.find({}).then( (result) => {
            return res.status(200).json({
                success : true,
                message : 'Data recieved',
                data: result
            })
    }).catch((error) => {
            return res.status(400).json({
                success : false,
                message :'Something went wrong'
            })
    })
}




deleteRequest = (req,res) => {

    issuemodel.findOneAndDelete({bookid : req.params.id , useremail : req.params.email, status:'requested'} , (err,result) => {
        if(err)
        {
            return res.status(400).json({
                error : err,
            })
        }
        return res.status(200).json({
            success : true,
            message : 'Request Successfully deleted'
        })

    })

}





module.exports = {
    getBooks,
    addRequest,
    statusUpdate,
    getIssueRequest,
    deleteRequest
}