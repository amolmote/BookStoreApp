const express = require('express')
const router = express.Router()


const commoncontroller = require('../controllers/commoncontroller')

router.get('/books',commoncontroller.getBooks)

router.post('/addrequest',commoncontroller.addRequest)

router.put('/statusupdate/:id/:email',commoncontroller.statusUpdate)

router.get('/issuerequest',commoncontroller.getIssueRequest)

router.delete('/deleterequest/:id/:email',commoncontroller.deleteRequest)


module.exports = router