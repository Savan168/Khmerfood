import { Category, Product, ProductReview, Address, Order, WalletTransaction, NotificationItem } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Khmer Snacks',
    slug: 'khmer-snacks',
    image: 'https://images.unsplash.com/photo-1599487488170-ded1ec9ed391?auto=format&fit=crop&q=80&w=600',
    description: 'Crispy traditional Khmer rice crackers, banana chips, and palm sugar sweets.',
    productCount: 8
  },
  {
    id: 'cat-2',
    name: 'Dried Food',
    slug: 'dried-food',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
    description: 'Sun-dried snakehead fish, marinated beef jerky, and crispy river shrimp.',
    productCount: 6
  },
  {
    id: 'cat-3',
    name: 'Khmer Desserts',
    slug: 'khmer-desserts',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=600',
    description: 'Sweet sticky rice cakes wrapped in banana leaves, mung bean treats, and coconut jellies.',
    productCount: 5
  },
  {
    id: 'cat-4',
    name: 'Spices',
    slug: 'spices',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600',
    description: 'World-famous organic Kampot Pepper (black, red, white), turmeric, and galangal powder.',
    productCount: 6
  },
  {
    id: 'cat-5',
    name: 'Sauces & Pastes',
    slug: 'sauces-pastes',
    image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&q=80&w=600',
    description: 'Authentic Prahok Ktis, Prohoc, Kreung curry paste, and Tamarind dipping sauces.',
    productCount: 7
  },
  {
    id: 'cat-6',
    name: 'Rice Products',
    slug: 'rice-products',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600',
    description: 'Phka Malis Jasmine fragrant rice, sticky rice (Baob), and rice noodle vermicelli.',
    productCount: 4
  },
  {
    id: 'cat-7',
    name: 'Traditional Food',
    slug: 'traditional-food',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600',
    description: 'Ready-to-eat Amok paste pouches, preserved duck eggs, and pickled mustard greens.',
    productCount: 5
  },
  {
    id: 'cat-8',
    name: 'Gift Sets',
    slug: 'gift-sets',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600',
    description: 'Exquisite bamboo hampers filled with Kampot pepper, palm sugar, and dried delicacies.',
    productCount: 3
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Premium Kampot Black Pepper (Organic)',
    khmerName: 'ម្រេចកំពតខ្មៅ',
    slug: 'premium-kampot-black-pepper',
    categoryId: 'cat-4',
    categoryName: 'Spices',
    price: 12.50,
    discountPrice: 10.99,
    images: [
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1588562480614-38634e402b85?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Hand-harvested in the fertile quartz-rich soils of Kampot province. Renowned worldwide for its intense aroma, floral notes, and warm spicy bite.',
    ingredients: ['100% Organic Kampot Black Peppercorns'],
    origin: 'Kampot Province, Cambodia',
    weight: '250g',
    stock: 45,
    rating: 4.9,
    reviewCount: 38,
    isFeatured: true,
    isPopular: true
  },
  {
    id: 'prod-2',
    name: 'Traditional Palm Sugar Brick (Kampong Speu)',
    khmerName: 'ស្ករត្នោតកំពង់ស្ពឺ',
    slug: 'traditional-palm-sugar-brick',
    categoryId: 'cat-1',
    categoryName: 'Khmer Snacks',
    price: 6.00,
    discountPrice: 5.00,
    images: [
      'https://images.unsplash.com/photo-1599487488170-ded1ec9ed391?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Natural unrefined palm sugar harvested from mature sugar palm trees in Kampong Speu. Rich caramel flavor with low glycemic index.',
    ingredients: ['100% Pure Palm Sap'],
    origin: 'Kampong Speu, Cambodia',
    weight: '500g',
    stock: 60,
    rating: 4.8,
    reviewCount: 24,
    isFeatured: true,
    isDiscount: true
  },
  {
    id: 'prod-3',
    name: 'Sun-Dried Snakehead Fish (Treung Trey Riel)',
    khmerName: 'ត្រីងៀត',
    slug: 'sun-dried-snakehead-fish',
    categoryId: 'cat-2',
    categoryName: 'Dried Food',
    price: 15.00,
    images: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Fresh Tonle Sap lake snakehead fish lightly salted and sun-dried to perfection. Ideal for frying and serving with mango salad.',
    ingredients: ['Snakehead Fish', 'Sea Salt', 'Garlic', 'Sugar'],
    origin: 'Tonle Sap Lake, Siem Reap',
    weight: '400g',
    stock: 18,
    rating: 4.7,
    reviewCount: 19,
    isPopular: true
  },
  {
    id: 'prod-4',
    name: 'Authentic Prahok Ktis (Pork & Fish Dip)',
    khmerName: 'ប្រហុកខ្ទិះ',
    slug: 'authentic-prahok-ktis',
    categoryId: 'cat-5',
    categoryName: 'Sauces & Pastes',
    price: 8.50,
    discountPrice: 7.50,
    images: [
      'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'A rich, creamy Cambodian dipping sauce made with fermented fish (prahok), minced pork, coconut milk, kaffir lime leaves, and pea eggplants.',
    ingredients: ['Fermented Fish (Prahok)', 'Minced Pork', 'Coconut Milk', 'Lemongrass', 'Kaffir Lime', 'Pea Eggplant'],
    origin: 'Phnom Penh, Cambodia',
    weight: '350g',
    stock: 30,
    rating: 4.9,
    reviewCount: 45,
    isFeatured: true,
    isRecommended: true
  },
  {
    id: 'prod-5',
    name: 'Num Ansorm Chrok (Sticky Rice Cake with Pork)',
    khmerName: 'អន្សមជ្រូក',
    slug: 'num-ansorm-chrok',
    categoryId: 'cat-3',
    categoryName: 'Khmer Desserts',
    price: 5.50,
    images: [
      'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Traditional cylindrical sticky rice cake stuffed with marinated pork belly and mung beans, wrapped in aromatic banana leaves.',
    ingredients: ['Sticky Rice', 'Mung Beans', 'Pork Belly', 'Banana Leaves', 'Salt', 'Pepper'],
    origin: 'Takeo Province, Cambodia',
    weight: '600g',
    stock: 12,
    rating: 4.6,
    reviewCount: 15,
    isNew: true
  },
  {
    id: 'prod-6',
    name: 'Royal Phka Malis Jasmine Fragrant Rice',
    khmerName: 'អង្ករផ្ការំដួល / ផ្ការម្លិះ',
    slug: 'royal-phka-malis-jasmine-rice',
    categoryId: 'cat-6',
    categoryName: 'Rice Products',
    price: 18.00,
    discountPrice: 16.50,
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Award-winning Cambodian jasmine rice with a natural pandan-like fragrance and soft, fluffy texture upon cooking.',
    ingredients: ['100% Pure Phka Malis Rice'],
    origin: 'Battambang Province, Cambodia',
    weight: '5kg',
    stock: 25,
    rating: 5.0,
    reviewCount: 52,
    isFeatured: true,
    isPopular: true,
    isDiscount: true
  },
  {
    id: 'prod-7',
    name: 'Khmer Traditional Kroeung Paste (Yellow)',
    khmerName: 'គ្រឿងខ្មែរ',
    slug: 'khmer-traditional-kroeung-paste',
    categoryId: 'cat-5',
    categoryName: 'Sauces & Pastes',
    price: 4.50,
    images: [
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'The aromatic foundation of Khmer cuisine. Blend of lemongrass, galangal, turmeric, kaffir lime zest, garlic, and shallots.',
    ingredients: ['Lemongrass', 'Galangal', 'Turmeric', 'Kaffir Lime', 'Garlic', 'Shallots'],
    origin: 'Siem Reap, Cambodia',
    weight: '250g',
    stock: 40,
    rating: 4.8,
    reviewCount: 22,
    isRecommended: true
  },
  {
    id: 'prod-8',
    name: 'Crispy Lotus Root Chips with Salted Egg',
    khmerName: 'នំបញ្ចុកឈូក',
    slug: 'crispy-lotus-root-chips',
    categoryId: 'cat-1',
    categoryName: 'Khmer Snacks',
    price: 4.00,
    images: [
      'https://images.unsplash.com/photo-1599487488170-ded1ec9ed391?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Sliced fresh lotus roots from Tonle Sap wetlands fried to a golden crisp and dusted with rich salted egg yolk seasoning.',
    ingredients: ['Lotus Root', 'Salted Egg Yolk', 'Vegetable Oil', 'Curry Leaves', 'Sugar'],
    origin: 'Kampong Thom, Cambodia',
    weight: '180g',
    stock: 50,
    rating: 4.7,
    reviewCount: 31,
    isNew: true
  },
  {
    id: 'prod-9',
    name: 'Cambodian Marinated Beef Jerky (Sach Ko Ang)',
    khmerName: 'សាច់គោងៀត',
    slug: 'cambodian-marinated-beef-jerky',
    categoryId: 'cat-2',
    categoryName: 'Dried Food',
    price: 14.00,
    discountPrice: 12.00,
    images: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Tender slices of premium Cambodian beef marinated in palm sugar, garlic, galangal, and sesame seeds, then air-dried.',
    ingredients: ['Beef', 'Palm Sugar', 'Garlic', 'Galangal', 'Sesame', 'Fish Sauce'],
    origin: 'Phnom Penh, Cambodia',
    weight: '300g',
    stock: 22,
    rating: 4.9,
    reviewCount: 40,
    isPopular: true,
    isDiscount: true
  },
  {
    id: 'prod-10',
    name: 'Organic Kampot Red Pepper',
    khmerName: 'ម្រេចកំពតក្រហម',
    slug: 'organic-kampot-red-pepper',
    categoryId: 'cat-4',
    categoryName: 'Spices',
    price: 14.50,
    images: [
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Fully ripened red peppercorns hand-picked and sun-dried. Offers a sweet, fruity aroma followed by a powerful pungent heat.',
    ingredients: ['100% Organic Kampot Red Peppercorns'],
    origin: 'Kampot Province, Cambodia',
    weight: '200g',
    stock: 20,
    rating: 5.0,
    reviewCount: 17,
    isFeatured: true
  },
  {
    id: 'prod-11',
    name: 'Khmer Royal Lotus Flower Tea',
    khmerName: 'តែផ្កាឈូក',
    slug: 'khmer-royal-lotus-flower-tea',
    categoryId: 'cat-3',
    categoryName: 'Khmer Desserts',
    price: 9.00,
    images: [
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Delicate green tea scented with fresh sacred lotus stamens harvested at dawn from Siem Reap lotus ponds.',
    ingredients: ['Green Tea Leaves', 'Lotus Stamens & Petals'],
    origin: 'Siem Reap, Cambodia',
    weight: '150g',
    stock: 35,
    rating: 4.8,
    reviewCount: 26,
    isNew: true
  },
  {
    id: 'prod-12',
    name: 'Traditional Khmer Bamboo Gift Hamper',
    khmerName: 'កន្ត្រកកាដូប្រពៃណីខ្មែរ',
    slug: 'traditional-khmer-bamboo-gift-hamper',
    categoryId: 'cat-8',
    categoryName: 'Gift Sets',
    price: 45.00,
    discountPrice: 39.99,
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Hand-woven bamboo basket containing Kampot Black Pepper (250g), Kampong Speu Palm Sugar (500g), Dried Lotus Seeds, and Tamarind Candy.',
    ingredients: ['Kampot Pepper', 'Palm Sugar', 'Lotus Seeds', 'Tamarind Candy', 'Handmade Bamboo Basket'],
    origin: 'Kampong Chhnang, Cambodia',
    weight: '1.8kg',
    stock: 10,
    rating: 5.0,
    reviewCount: 14,
    isFeatured: true,
    isRecommended: true
  }
];

export const INITIAL_REVIEWS: ProductReview[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    userId: 'user-1',
    userName: 'Sophea Chan',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'Absolute top quality Kampot pepper! The aroma hits you as soon as you open the bag. Reminds me of home.',
    createdAt: '2026-08-10T10:30:00Z'
  },
  {
    id: 'rev-2',
    productId: 'prod-1',
    userId: 'user-2',
    userName: 'Dara Vong',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'Authentic taste. Perfect for beef lok lak and stir-fries.',
    createdAt: '2026-08-14T14:20:00Z'
  },
  {
    id: 'rev-3',
    productId: 'prod-4',
    userId: 'user-1',
    userName: 'Sophea Chan',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'The Prahok Ktis is out of this world with fresh cucumbers and eggplants! So rich and flavorful.',
    createdAt: '2026-08-18T09:15:00Z'
  }
];

export const INITIAL_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    fullName: 'Sophea Chan',
    phone: '+855 12 345 678',
    province: 'Phnom Penh',
    district: 'Daun Penh',
    commune: 'Phsar Kandal I',
    streetHouse: 'House #45, Street 19',
    additionalInfo: 'Near National Museum, blue gate',
    isDefault: true
  },
  {
    id: 'addr-2',
    fullName: 'Sophea Chan (Office)',
    phone: '+855 12 345 678',
    province: 'Phnom Penh',
    district: 'Chamkar Mon',
    commune: 'Tonle Bassac',
    streetHouse: 'Exchange Square, Floor 12',
    additionalInfo: 'Leave at reception desk',
    isDefault: false
  }
];

export const INITIAL_WALLET_TRANSACTIONS: WalletTransaction[] = [
  {
    id: 'tx-1',
    userId: 'user-1',
    type: 'TOP_UP',
    amount: 50.00,
    description: 'Initial Wallet Top Up',
    createdAt: '2026-08-01T08:00:00Z'
  },
  {
    id: 'tx-2',
    userId: 'user-1',
    type: 'PURCHASE',
    amount: 18.50,
    description: 'Order #AT-88214 Payment',
    referenceId: 'ord-1',
    createdAt: '2026-08-10T11:25:00Z'
  },
  {
    id: 'tx-3',
    userId: 'user-1',
    type: 'TOP_UP',
    amount: 25.00,
    description: 'Wallet Top Up via KHQR',
    createdAt: '2026-08-15T15:10:00Z'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1',
    orderNumber: 'AT-88214',
    userId: 'user-1',
    items: [
      {
        id: 'item-1',
        productId: 'prod-1',
        productName: 'Premium Kampot Black Pepper (Organic)',
        productImage: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600',
        price: 10.99,
        quantity: 1,
        subtotal: 10.99
      },
      {
        id: 'item-2',
        productId: 'prod-2',
        productName: 'Traditional Palm Sugar Brick (Kampong Speu)',
        productImage: 'https://images.unsplash.com/photo-1599487488170-ded1ec9ed391?auto=format&fit=crop&q=80&w=600',
        price: 5.00,
        quantity: 1,
        subtotal: 5.00
      }
    ],
    subtotal: 15.99,
    discount: 0.00,
    deliveryFee: 2.51,
    total: 18.50,
    shippingAddress: INITIAL_ADDRESSES[0],
    deliveryMethod: 'Standard Delivery',
    paymentMethod: 'Wallet',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    createdAt: '2026-08-10T11:20:00Z',
    updatedAt: '2026-08-12T14:30:00Z'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    userId: 'user-1',
    title: 'Order Delivered 🎉',
    message: 'Your order #AT-88214 has been successfully delivered. You can now leave a product review!',
    type: 'order',
    isRead: false,
    createdAt: '2026-08-12T14:30:00Z',
    link: '/orders/ord-1'
  },
  {
    id: 'notif-2',
    userId: 'user-1',
    title: 'Wallet Top-Up Successful 💰',
    message: 'Successfully topped up $25.00 to your AngkorTaste digital wallet.',
    type: 'wallet',
    isRead: true,
    createdAt: '2026-08-15T15:10:00Z',
    link: '/wallet'
  }
];
