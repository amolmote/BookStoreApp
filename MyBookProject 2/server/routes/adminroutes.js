var express = require('express');           
var router  = express.Router()

const admincontroller = require('../controllers/admincontroller')

router.post('/addbook',admincontroller.addBook)
router.put('/updatebook/:id',admincontroller.updateBook)
router.delete('/deletebook/:id',admincontroller.deleteBook)

router.put('/updatebookquantity/:id',admincontroller.updateBookQuantity)


module.exports=router