const router = require("express").Router();

const auth = require('./auth.route');
const customer = require('./customer.route');
const admin = require('./admin.router');

router.use("/auth", auth);
router.use("/customer", customer);
router.use("/admin", admin);

module.exports = router;