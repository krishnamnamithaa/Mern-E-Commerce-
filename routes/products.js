const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const User = require('../models/User');
const seedProducts = require('../seedData');
const { protect, admin } = require('../middleware/auth');

// Helper to get or create default admin seller
async function getOrCreateAdminSeller() {
  let adminUser = await User.findOne({ role: 'admin' });
  if (!adminUser) {
    adminUser = await User.create({
      name: 'Admin Store Manager',
      email: 'admin@auraecommerce.com',
      password: 'adminpassword123',
      role: 'admin'
    });
  }
  return adminUser._id;
}

function formatSeedProducts(sellerId) {
  return seedProducts.map(p => ({
    ...p,
    seller: sellerId,
    reviews: (p.reviews || []).map(r => ({
      ...r,
      user: sellerId
    }))
  }));
}

// @route   POST /api/products/seed
// @desc    Seed sample products into database
// @access  Public (for demo ease)
router.post('/seed', async (req, res) => {
  try {
    const sellerId = await getOrCreateAdminSeller();
    await Product.deleteMany({});
    const createdProducts = await Product.insertMany(formatSeedProducts(sellerId));
    res.json({ message: 'Database seeded successfully', count: createdProducts.length, products: createdProducts });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ message: error.message || 'Error seeding database' });
  }
});

// @route   GET /api/products
// @desc    Get all products with filtering & searching
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { keyword, category, minPrice, maxPrice, sort, featured } = req.query;
    let query = {};

    if (keyword) {
      query.name = { $regex: keyword, $options: 'i' };
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    if (featured === 'true') {
      query.isFeatured = true;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let sortOption = { createdAt: -1 };
    if (sort === 'price_asc') sortOption = { price: 1 };
    if (sort === 'price_desc') sortOption = { price: -1 };
    if (sort === 'rating') sortOption = { rating: -1 };

    let products = await Product.find(query).sort(sortOption);
    
    // Auto-seed if database is empty so app works immediately
    if (products.length === 0 && !keyword && (!category || category === 'All') && !minPrice && !maxPrice) {
      const sellerId = await getOrCreateAdminSeller();
      products = await Product.insertMany(formatSeedProducts(sellerId));
    }

    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product details
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/products
// @desc    Create a product
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const { name, price, description, category, stock, images, brand, features, specifications } = req.body;
    
    const product = new Product({
      name,
      price,
      description,
      category,
      stock,
      brand,
      seller: req.user._id,
      images: images && images.length ? images : [{ public_id: 'sample', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80' }],
      features: features || [],
      specifications: specifications || []
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/products/:id
// @desc    Update a product
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    Object.assign(product, req.body);
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/products/:id/reviews
// @desc    Create new review
// @access  Private
router.post('/:id/reviews', protect, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const alreadyReviewed = product.reviews.find(
      r => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ message: 'Product already reviewed by you' });
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id
    };

    product.reviews.push(review);
    product.calculateAverageRating();

    await product.save();
    res.status(201).json({ message: 'Review added successfully', product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
