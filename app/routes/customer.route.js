const router = require("express").Router();
const productController = require('../controllers/product.controller');
const authMiddleware = require('../middlewares/auth');
const orderController = require('../controllers/order.controller');

router.use(authMiddleware.auth);

router.get('/products', productController.getAllProducts);
router.get('/product/:id', productController.getOneProduct);
router.post('/order', authMiddleware.authRole('customer'), orderController.createOrder);
router.get('/order/:id', authMiddleware.authRole('customer'), orderController.getOneOrder);
router.get('/order/:id/status', authMiddleware.authRole('customer'), orderController.getOrderStatus);

module.exports = router;


