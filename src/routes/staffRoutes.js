const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication');
const StaffController = require('../controllers/StaffController');

const staff = new StaffController();

router.post('/register', staff.register);
router.post('/login', staff.login);
router.get('/refresh', staff.getNewAccessToken);
router.get('/logout', authentication, staff.logout);
router.get('/user', authentication, staff.getStaff);
router.post('/presensi', authentication, staff.addStaffPresensi);
router.get('/presensi', authentication, staff.getStaffPresensi);
router.put('/presensi', authentication, staff.updateStaffPresensi);
router.get('/presensi/all', authentication, staff.getStaffPresensiByUserLogin);

module.exports = router;