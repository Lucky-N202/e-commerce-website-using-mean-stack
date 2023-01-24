const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
              },
            quantity: { type: Number, required: true },
            size: { type: String },
            color: { type: String },
            price: { type: Number }
        }
    ],
    totalPrice: { type: Number, required: true }
});

module.exports = mongoose.model('Cart', cartSchema);
