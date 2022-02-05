var express=require('express');
var router=express.Router()

const usercontroller=require('../controllers/usercontroller')

// router.get('/users',usercontroller.getDetails)
router.post('/adduser',usercontroller.addUser)
router.get('/user/:email',usercontroller.getUserbyEmail)

router.put('/updatelike/:id',usercontroller.updateBookLike)

module.exports=router