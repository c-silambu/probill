const express = require('express');
const router = express.Router();

const {getDashboardSummary,getRecentBills} = require('../controllers/dashbordcontroller');

const {isAuth} = require('../middelwares/authmiddlewar');

router.get('/summary', isAuth,getDashboardSummary);
router.get('/recentbill',isAuth,getRecentBills);


module.exports = router;
