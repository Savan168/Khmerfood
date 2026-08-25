export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: 'customer';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  productCount: number;
}

export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  image?: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  khmerName: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  price: number;
  discountPrice?: number;
  images: string[];
  description: string;
  ingredients: string[];
  origin: string;
  weight: string;
  stock: number;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  isDiscount?: boolean;
  isRecommended?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
  addedAt: string;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  province: string;
  district: string;
  commune: string;
  streetHouse: string;
  additionalInfo?: string;
  isDefault: boolean;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Processing' | 'Shipping' | 'Delivered' | 'Cancelled';
export type PaymentStatus = 'Pending' | 'Processing' | 'Paid' | 'Failed' | 'Cancelled' | 'Refunded';
export type PaymentMethod = 'Wallet' | 'KHQR' | 'Bank Transfer' | 'Cash on Delivery';
export type DeliveryMethod = 'Standard Delivery' | 'Express Delivery';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  shippingAddress: Address;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export type WalletTransactionType = 'TOP_UP' | 'PURCHASE' | 'REFUND';

export interface WalletTransaction {
  id: string;
  userId: string;
  type: WalletTransactionType;
  amount: number;
  description: string;
  referenceId?: string;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'order' | 'payment' | 'wallet' | 'system';
  isRead: boolean;
  createdAt: string;
  link?: string;
}
