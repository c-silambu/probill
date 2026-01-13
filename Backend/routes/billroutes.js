const express = require('express');
const router = express.Router();
const {isAuth} = require('../middelwares/authmiddlewar');
const { createBill, getAllbills, getMyBills } = require('../controllers/billcontroller');


router.post('/create',isAuth,createBill);


router.get('/my-bills', isAuth, getMyBills);


router.get('/all', isAuth, getAllbills);

module.exports = router;

