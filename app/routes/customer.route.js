const router = require("express").Router();
const productController = require('../controllers/product.controller');
const authMiddleware = require('../middlewares/auth');
const orderController = require('../controllers/order.controller');
const cartController = require('../controllers/cart.controller');

router.use(authMiddleware.auth);

router.get('/products', productController.getAllProducts);
router.get('/product/:id', productController.getOneProduct);
router.post('/order', authMiddleware.authRole('customer'), orderController.createOrder);
router.get('/order/:id', authMiddleware.authRole('customer'), orderController.getOneOrder);
router.get('/order/:id/status', authMiddleware.authRole('customer'), orderController.getOrderStatus);
router.post('/:userId/cart', cartController.addToCart);
router.put('/:userId/cart', cartController.updateCart);
router.get('/:userId/cart', cartController.getCart);

module.exports = router;


