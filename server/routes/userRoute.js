const { CreateUser } = require('../controller/usercontroller');

const router = require('express').Router();


router.post('/',CreateUser)

module.exports=router