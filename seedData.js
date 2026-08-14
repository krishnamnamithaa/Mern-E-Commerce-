const seedProducts = [
  {
    name: "UltraBook Pro 15 - M3 Max 32GB",
    description: "Experience unprecedented performance with the UltraBook Pro 15. Features a brilliant 15.6-inch Liquid Retina XDR display, 32GB unified memory, 1TB NVMe SSD storage, and up to 22 hours of battery life.",
    price: 1899,
    originalPrice: 2099,
    category: "Electronics",
    subcategory: "Laptops",
    brand: "ApexTech",
    stock: 25,
    discount: 10,
    isFeatured: true,
    rating: 4.9,
    numReviews: 128,
    images: [
      {
        public_id: "laptop_1",
        url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
      }
    ],
    features: [
      "15.6-inch Liquid Retina XDR Display",
      "32GB High-Speed Unified RAM",
      "1TB PCIe Gen4 NVMe Storage",
      "Thunderbolt 4 & HDMI 2.1 ports",
      "MagSafe 3 Fast Charging"
    ],
    specifications: [
      { name: "Processor", value: "Octa-Core 3.5GHz" },
      { name: "RAM", value: "32 GB" },
      { name: "Storage", value: "1 TB SSD" },
      { name: "Weight", value: "1.6 kg" }
    ],
    reviews: [
      {
        name: "Alex Rivera",
        rating: 5,
        comment: "Absolute beast of a machine! Compiles code seamlessly and battery lasts all day.",
        createdAt: new Date()
      },
      {
        name: "Sarah Jenkins",
        rating: 5,
        comment: "The screen quality and brightness are unbelievable. High quality build.",
        createdAt: new Date()
      }
    ]
  },
  {
    name: "SonicX Noise-Canceling Wireless Headphones",
    description: "Immerse yourself in rich, high-resolution audio with industry-leading Active Noise Cancellation. Features 40mm drivers, 40-hour playback, multipoint Bluetooth 5.3, and ultra-plush memory foam ear cushions.",
    price: 299,
    originalPrice: 349,
    category: "Electronics",
    subcategory: "Audio",
    brand: "SonicX",
    stock: 40,
    discount: 14,
    isFeatured: true,
    rating: 4.8,
    numReviews: 94,
    images: [
      {
        public_id: "headphones_1",
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
      }
    ],
    features: [
      "Adaptive ANC with Transparency Mode",
      "40-hour Battery Life with Fast Charge",
      "Spatial Audio with Head Tracking",
      "Dual Mic Environmental Noise Reduction"
    ],
    specifications: [
      { name: "Battery Life", value: "40 hours" },
      { name: "Bluetooth Version", value: "5.3" },
      { name: "Weight", value: "250g" }
    ],
    reviews: [
      {
        name: "David Kim",
        rating: 5,
        comment: "Noise cancellation is amazing on flights. Super comfortable for long sessions.",
        createdAt: new Date()
      }
    ]
  },
  {
    name: "Aura Smartwatch Series 7 - Obsidian Black",
    description: "Stay ahead with advanced health tracking including ECG, Blood Oxygen monitoring, sleep scoring, and 50+ workout modes. Sapphire glass display with titanium alloy casing.",
    price: 399,
    originalPrice: 449,
    category: "Electronics",
    subcategory: "Wearables",
    brand: "Aura",
    stock: 18,
    discount: 11,
    isFeatured: true,
    rating: 4.7,
    numReviews: 67,
    images: [
      {
        public_id: "smartwatch_1",
        url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
      }
    ],
    features: [
      "Always-on AMOLED Sapphire Glass",
      "5 ATM Water Resistance (50m)",
      "Built-in Dual Frequency GPS",
      "Heart Rate & SpO2 Continuous Monitoring"
    ],
    specifications: [
      { name: "Display", value: "1.4-inch AMOLED" },
      { name: "Waterproofing", value: "5 ATM" },
      { name: "Battery", value: "Up to 7 Days" }
    ],
    reviews: []
  },
  {
    name: "CyberCam 4K Mirrorless Digital Camera",
    description: "Capture unforgettable moments in stunning 4K 60fps video and 24.2MP RAW still photos. Includes 18-55mm IS lens kit, high-speed autofocus, and Wi-Fi instant sharing.",
    price: 899,
    originalPrice: 999,
    category: "Electronics",
    subcategory: "Cameras",
    brand: "OptiCam",
    stock: 12,
    discount: 10,
    isFeatured: false,
    rating: 4.6,
    numReviews: 45,
    images: [
      {
        public_id: "camera_1",
        url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80"
      }
    ],
    features: [
      "24.2 MP APS-C CMOS Sensor",
      "4K UHD Video Recording at 60fps",
      "Fast Hybrid Auto-Focus System",
      "Vari-angle Touch Screen LCD"
    ],
    specifications: [
      { name: "Sensor", value: "24.2 MP CMOS" },
      { name: "Video", value: "4K 60fps" }
    ],
    reviews: []
  },
  {
    name: "Urban Runner Pro Sneakers - Midnight Edition",
    description: "Engineered for maximum cushion and energy return. Lightweight breathable mesh upper with high-traction rubber outsole for all-day comfort and road running performance.",
    price: 139,
    originalPrice: 169,
    category: "Clothing",
    subcategory: "Footwear",
    brand: "Velocity",
    stock: 50,
    discount: 17,
    isFeatured: true,
    rating: 4.8,
    numReviews: 82,
    images: [
      {
        public_id: "sneakers_1",
        url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
      }
    ],
    features: [
      "Responsive Foam Midsole Cushioning",
      "Engineered Air-Mesh Upper",
      "Anti-Slip Durable Rubber Tread",
      "Reflective Accents for Night Safety"
    ],
    specifications: [
      { name: "Size Range", value: "7 - 13 US" },
      { name: "Material", value: "Recycled Flyknit Synthetic" }
    ],
    reviews: []
  },
  {
    name: "Minimalist Leather Backpack & Laptop Sleeves",
    description: "Crafted from premium full-grain top leather. Fits laptops up to 16 inches with dedicated padded compartment, water-resistant interior lining, and hidden anti-theft pocket.",
    price: 179,
    originalPrice: 210,
    category: "Clothing",
    subcategory: "Bags",
    brand: "Kavalan",
    stock: 30,
    discount: 14,
    isFeatured: false,
    rating: 4.7,
    numReviews: 53,
    images: [
      {
        public_id: "backpack_1",
        url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"
      }
    ],
    features: [
      "100% Genuine Full-Grain Leather",
      "Padded 16-inch Laptop Pocket",
      "Luggage Strap for Travel Convenience",
      "Water-Repellent Interior Fabric"
    ],
    specifications: [
      { name: "Capacity", value: "22 Liters" },
      { name: "Dimensions", value: "42 x 30 x 14 cm" }
    ],
    reviews: []
  },
  {
    name: "Barista Touch Espresso Machine",
    description: "Brew coffeehouse-quality espresso, lattes, and cappuccinos right at home. Built-in precision conical burr grinder, automatic micro-foam milk texturing, and intuitive touchscreen control.",
    price: 649,
    originalPrice: 749,
    category: "Home & Garden",
    subcategory: "Kitchen Appliances",
    brand: "ArtisanCraft",
    stock: 15,
    discount: 13,
    isFeatured: true,
    rating: 4.9,
    numReviews: 110,
    images: [
      {
        public_id: "coffee_machine_1",
        url: "https://images.unsplash.com/photo-1517668808822-9eaa03afd2af?auto=format&fit=crop&w=800&q=80"
      }
    ],
    features: [
      "Integrated Stainless Steel Burr Grinder",
      "19-Bar Italian High-Pressure Pump",
      "Automatic ThermoJet Heating System",
      "Touch Screen Preset Drink Menus"
    ],
    specifications: [
      { name: "Water Tank", value: "2.0 Liters" },
      { name: "Pump Pressure", value: "19 Bar" }
    ],
    reviews: []
  },
  {
    name: "Architectural Modern Desk Lamp",
    description: "Sleek matte finish LED desk lamp with dimmable brightness levels, color temperature adjustments (2700K - 6500K), built-in Qi wireless phone charging pad, and USB-C port.",
    price: 79,
    originalPrice: 99,
    category: "Home & Garden",
    subcategory: "Lighting",
    brand: "Lumiere",
    stock: 35,
    discount: 20,
    isFeatured: false,
    rating: 4.5,
    numReviews: 38,
    images: [
      {
        public_id: "lamp_1",
        url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80"
      }
    ],
    features: [
      "10W Integrated Fast Qi Wireless Charging",
      "5 Color Temperatures & 5 Brightness Levels",
      "Flicker-Free Eye Protection Technology",
      "Auto Shut-off Memory Timer"
    ],
    specifications: [
      { name: "Power Output", value: "12W LED" },
      { name: "Qi Charger", value: "10W Wireless" }
    ],
    reviews: []
  }
];

module.exports = seedProducts;
