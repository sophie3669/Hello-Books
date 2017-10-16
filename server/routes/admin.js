let express = require('express');
const admin = require('../controllers/admincontroller');
const adminuser = admin.admincontroller;
const router = express.Router();

router.post('/api/books', adminuser.addbook);






module.export;
