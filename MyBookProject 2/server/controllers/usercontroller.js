const usermodel=require('../models/usermodel');
const bookmodel=require('../models/bookmodel');

// getDetails = (req,res) =>
// {
//     usermodel.find({}).then((result)=>
//    {
//         console.log("user found");
//         res.send(result);
//    }).catch((error) =>
//    {
//         console.log("user not found");
//         res.send(error);
//    });   
// }




// registration 
addUser = (req,res) =>
{
    const body = req.body
    const user = new usermodel(body)

        user.save().then(
            () => {
                return res.status(201).json({
                    success:true,
                    message: 'User created!'
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


getUserbyEmail =   (req,res) =>
{
//    const email = req.params.email
//    console.log('EMAIL:',email)

     usermodel.findOne({'email':req.params.email} , (err,result) => 
    {
        if(err){
            return res.status(400).json({
                success:false,
                message:"Error in searching user"
            })
        }

        if(result){
            return res.status(201).json({
                success:true,
                data:result
            })
        }
        else{
            return res.status(201).json({
                success:false,
                message:"User not found"
            })
        }
    })
    .catch(error => {
        console.log(error)
    })  
}





updateBookLike =  (req,res) => {
    
     bookmodel.findOne({bookid:req.params.id}, (err,result) => {

        if(err){
            return res.status(400).json({
                error:err,
                message:'Something went wrong'
            })
        }
        
        result.likes = req.body.likes

        result.save().then(()=>{
            return res.status(200).json({
                message:'Updated successfully',
                success:true
            })
        }).catch(err=>{
            console.log(err)
        })
    })
}


module.exports = {
    // getDetails,
    addUser,
    getUserbyEmail,
    updateBookLike,
}


