const router = require("express").Router();
const productController = require('../controllers/product.controller');
const authMiddleware = require('../middlewares/auth');
const orderController = require('../controllers/order.controller');

router.use(authMiddleware.auth);

router.post('/product', authMiddleware.authRole('admin'), productController.createProduct);
router.put('/product/:id', authMiddleware.authRole('admin'), productController.updateProduct);
router.delete('/product/:id', authMiddleware.authRole('admin'), productController.deleteProduct);
router.get('/orders', authMiddleware.authRole('admin'), orderController.getAllOrders);
router.put('/order/:id', authMiddleware.authRole('admin'), orderController.updateOrder);
router.delete('/order/:id', authMiddleware.authRole('admin'), orderController.deleteOrder);
router.put('/order/:id/status', authMiddleware.authRole('admin'), orderController.updateOrderStatus);

module.exports = router;