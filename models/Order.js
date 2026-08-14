const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderItems: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  }],
  shippingAddress: {
    fullName: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    }
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['PayPal', 'Stripe', 'Cash on Delivery']
  },
  paymentResult: {
    id: String,
    status: String,
    email_address: String,
    update_time: String
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false
  },
  paidAt: {
    type: Date
  },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false
  },
  deliveredAt: {
    type: Date
  },
  orderStatus: {
    type: String,
    required: true,
    enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Processing'
  },
  orderNotes: {
    type: String,
    maxlength: 500
  },
  trackingNumber: {
    type: String
  },
  estimatedDeliveryDate: {
    type: Date
  },
  discount: {
    type: Number,
    default: 0
  },
  couponCode: {
    type: String
  }
}, {
  timestamps: true
});

// Calculate items price
orderSchema.methods.calculateItemsPrice = function() {
  return this.orderItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
};

// Calculate total price
orderSchema.methods.calculateTotalPrice = function() {
  const itemsPrice = this.calculateItemsPrice();
  return itemsPrice + this.taxPrice + this.shippingPrice - this.discount;
};

// Update order status
orderSchema.methods.updateOrderStatus = function(status) {
  this.orderStatus = status;
  
  if (status === 'Delivered') {
    this.isDelivered = true;
    this.deliveredAt = new Date();
  }
  
  return this.save();
};

// Mark as paid
orderSchema.methods.markAsPaid = function(paymentResult) {
  this.isPaid = true;
  this.paidAt = new Date();
  this.paymentResult = paymentResult;
  return this.save();
};

module.exports = mongoose.model('Order', orderSchema);
