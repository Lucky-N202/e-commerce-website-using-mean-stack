const router = require("express").Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.use(authMiddleware.auth);

router.get('/logout', authController.logout);

module.exports = router;


