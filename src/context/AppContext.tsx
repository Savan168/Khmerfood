import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, Category, Product, CartItem, WishlistItem, Address, 
  Order, WalletTransaction, NotificationItem, ProductReview, 
  PaymentMethod, DeliveryMethod, OrderStatus, PaymentStatus 
} from '../types';
import { 
  INITIAL_CATEGORIES, INITIAL_PRODUCTS, INITIAL_REVIEWS, 
  INITIAL_ADDRESSES, INITIAL_WALLET_TRANSACTIONS, INITIAL_ORDERS, 
  INITIAL_NOTIFICATIONS 
} from '../data/mockData';

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, phone: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;

  categories: Category[];
  products: Product[];
  reviews: ProductReview[];
  
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  cartItemCount: number;

  wishlist: WishlistItem[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;

  addresses: Address[];
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;

  orders: Order[];
  createOrder: (addressId: string, deliveryMethod: DeliveryMethod, paymentMethod: PaymentMethod) => { success: boolean; orderId?: string; message: string };
  cancelOrder: (orderId: string) => void;

  walletBalance: number;
  walletTransactions: WalletTransaction[];
  topUpWallet: (amount: number, description?: string) => void;

  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  unreadNotificationCount: number;

  addProductReview: (productId: string, rating: number, comment: string, image?: string) => void;
  getProductReviews: (productId: string) => ProductReview[];
  canUserReviewProduct: (productId: string) => boolean;

  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // User state
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('angkor_user');
    return saved ? JSON.parse(saved) : {
      id: 'user-1',
      name: 'Sophea Chan',
      email: 'sophea.chan@example.com',
      phone: '+855 12 345 678',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      role: 'customer'
    };
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('angkor_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);

  const [reviews, setReviews] = useState<ProductReview[]>(() => {
    const saved = localStorage.getItem('angkor_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('angkor_cart');
    return saved ? JSON.parse(saved) : [
      {
        id: 'cart-1',
        productId: 'prod-1',
        product: INITIAL_PRODUCTS[0],
        quantity: 1
      }
    ];
  });

  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    const saved = localStorage.getItem('angkor_wishlist');
    return saved ? JSON.parse(saved) : [
      {
        id: 'wish-1',
        productId: 'prod-4',
        product: INITIAL_PRODUCTS[3],
        addedAt: new Date().toISOString()
      }
    ];
  });

  const [addresses, setAddresses] = useState<Address[]>(() => {
    const saved = localStorage.getItem('angkor_addresses');
    return saved ? JSON.parse(saved) : INITIAL_ADDRESSES;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('angkor_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>(() => {
    const saved = localStorage.getItem('angkor_wallet_tx');
    return saved ? JSON.parse(saved) : INITIAL_WALLET_TRANSACTIONS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('angkor_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persistence effects
  useEffect(() => {
    if (user) {
      localStorage.setItem('angkor_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('angkor_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('angkor_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('angkor_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('angkor_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('angkor_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('angkor_addresses', JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem('angkor_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('angkor_wallet_tx', JSON.stringify(walletTransactions));
  }, [walletTransactions]);

  useEffect(() => {
    localStorage.setItem('angkor_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Toast handler
  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Auth functions
  const login = (email: string, _password: string): boolean => {
    // Demo login simulator
    const mockUser: User = {
      id: 'user-1',
      name: email.split('@')[0].replace('.', ' ') || 'Sophea Chan',
      email: email,
      phone: '+855 12 345 678',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      role: 'customer'
    };
    setUser(mockUser);
    addToast('Successfully signed in! Welcome back.');
    return true;
  };

  const register = (name: string, email: string, phone: string, _password: string): boolean => {
    const newUser: User = {
      id: 'user-' + Date.now(),
      name,
      email,
      phone,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      role: 'customer'
    };
    setUser(newUser);
    // Give initial wallet bonus
    topUpWallet(50.00, 'Welcome Bonus Top-Up');
    addToast('Account created successfully! $50.00 bonus added to your wallet.');
    return true;
  };

  const logout = () => {
    setUser(null);
    addToast('You have been signed out.', 'info');
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
      addToast('Profile updated successfully.');
    }
  };

  // Cart calculations
  const cartSubtotal = cart.reduce((sum, item) => {
    const price = item.product.discountPrice ?? item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const cartDiscount = cart.reduce((sum, item) => {
    if (item.product.discountPrice) {
      return sum + (item.product.price - item.product.discountPrice) * item.quantity;
    }
    return sum;
  }, 0);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product: Product, quantity = 1) => {
    if (product.stock <= 0) {
      addToast('Sorry, this product is currently out of stock.', 'error');
      return;
    }

    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, product.stock);
        if (newQty > product.stock) {
          addToast(`Cannot add more. Only ${product.stock} in stock.`, 'error');
        } else {
          addToast(`Updated quantity for ${product.name}`);
        }
        return prev.map(item => 
          item.productId === product.id ? { ...item, quantity: newQty } : item
        );
      } else {
        addToast(`Added ${product.name} to your cart.`);
        return [...prev, {
          id: 'cart-item-' + Date.now(),
          productId: product.id,
          product,
          quantity: Math.min(quantity, product.stock)
        }];
      }
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    addToast('Item removed from cart.', 'info');
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.id === cartItemId) {
        if (quantity > item.product.stock) {
          addToast(`Only ${item.product.stock} items available in stock.`, 'error');
          return item;
        }
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist
  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.productId === product.id);
      if (exists) {
        addToast(`Removed ${product.name} from wishlist.`, 'info');
        return prev.filter(item => item.productId !== product.id);
      } else {
        addToast(`Added ${product.name} to your wishlist.`);
        return [...prev, {
          id: 'wish-' + Date.now(),
          productId: product.id,
          product,
          addedAt: new Date().toISOString()
        }];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.productId === productId);
  };

  // Addresses
  const addAddress = (addressData: Omit<Address, 'id'>) => {
    const newAddr: Address = {
      ...addressData,
      id: 'addr-' + Date.now(),
      isDefault: addresses.length === 0 ? true : addressData.isDefault
    };
    if (newAddr.isDefault) {
      setAddresses(prev => prev.map(a => ({ ...a, isDefault: false })).concat(newAddr));
    } else {
      setAddresses(prev => [...prev, newAddr]);
    }
    addToast('New delivery address added.');
  };

  const updateAddress = (id: string, addressData: Partial<Address>) => {
    setAddresses(prev => {
      if (addressData.isDefault) {
        return prev.map(a => ({
          ...a,
          ...addressData,
          isDefault: a.id === id
        }));
      }
      return prev.map(a => a.id === id ? { ...a, ...addressData } : a);
    });
    addToast('Address updated successfully.');
  };

  const deleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
    addToast('Address deleted.', 'info');
  };

  const setDefaultAddress = (id: string) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
    addToast('Default address updated.');
  };

  // Wallet calculation
  const walletBalance = walletTransactions.reduce((sum, tx) => {
    if (tx.type === 'TOP_UP' || tx.type === 'REFUND') {
      return sum + tx.amount;
    } else if (tx.type === 'PURCHASE') {
      return sum - tx.amount;
    }
    return sum;
  }, 0);

  const topUpWallet = (amount: number, description = 'Wallet Top-Up') => {
    const newTx: WalletTransaction = {
      id: 'tx-' + Date.now(),
      userId: user?.id || 'user-1',
      type: 'TOP_UP',
      amount,
      description,
      createdAt: new Date().toISOString()
    };
    setWalletTransactions(prev => [newTx, ...prev]);

    // Add notification
    const newNotif: NotificationItem = {
      id: 'notif-' + Date.now(),
      userId: user?.id || 'user-1',
      title: 'Wallet Topped Up 💵',
      message: `Successfully added $${amount.toFixed(2)} to your wallet.`,
      type: 'wallet',
      isRead: false,
      createdAt: new Date().toISOString(),
      link: '/wallet'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Orders
  const createOrder = (addressId: string, deliveryMethod: DeliveryMethod, paymentMethod: PaymentMethod) => {
    if (cart.length === 0) {
      return { success: false, message: 'Your cart is empty.' };
    }

    const address = addresses.find(a => a.id === addressId) || addresses[0];
    if (!address) {
      return { success: false, message: 'Please provide a shipping address.' };
    }

    const deliveryFee = deliveryMethod === 'Express Delivery' ? 3.50 : 1.50;
    const subtotal = cartSubtotal;
    const discount = cartDiscount;
    const total = subtotal + deliveryFee;

    // Check wallet balance if paying with wallet
    if (paymentMethod === 'Wallet' && walletBalance < total) {
      return { success: false, message: `Insufficient wallet balance ($${walletBalance.toFixed(2)} available, $${total.toFixed(2)} required). Please top up or choose another payment method.` };
    }

    // Check stock for all items
    for (const item of cart) {
      if (item.quantity > item.product.stock) {
        return { success: false, message: `Product "${item.product.name}" exceeds available stock (${item.product.stock} left).` };
      }
    }

    // Process payment deduction if wallet
    if (paymentMethod === 'Wallet') {
      const purchaseTx: WalletTransaction = {
        id: 'tx-' + Date.now(),
        userId: user?.id || 'user-1',
        type: 'PURCHASE',
        amount: total,
        description: `Order Payment #${Date.now().toString().slice(-6)}`,
        createdAt: new Date().toISOString()
      };
      setWalletTransactions(prev => [purchaseTx, ...prev]);
    }

    const orderId = 'ord-' + Date.now();
    const orderNumber = 'AT-' + Math.floor(10000 + Math.random() * 90000);

    const newOrder: Order = {
      id: orderId,
      orderNumber,
      userId: user?.id || 'user-1',
      items: cart.map(i => ({
        id: 'oi-' + Math.random().toString(36).substring(2, 7),
        productId: i.productId,
        productName: i.product.name,
        productImage: i.product.images[0],
        price: i.product.discountPrice ?? i.product.price,
        quantity: i.quantity,
        subtotal: (i.product.discountPrice ?? i.product.price) * i.quantity
      })),
      subtotal,
      discount,
      deliveryFee,
      total,
      shippingAddress: address,
      deliveryMethod,
      paymentMethod,
      paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
      orderStatus: 'Confirmed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Reduce stock
    setProducts(prev => prev.map(p => {
      const cartItem = cart.find(ci => ci.productId === p.id);
      if (cartItem) {
        return { ...p, stock: Math.max(0, p.stock - cartItem.quantity) };
      }
      return p;
    }));

    setOrders(prev => [newOrder, ...prev]);

    // Add notification
    const orderNotif: NotificationItem = {
      id: 'notif-' + Date.now(),
      userId: user?.id || 'user-1',
      title: `Order Confirmed #${orderNumber} 📦`,
      message: `Your order has been placed successfully and is now confirmed. Total: $${total.toFixed(2)}.`,
      type: 'order',
      isRead: false,
      createdAt: new Date().toISOString(),
      link: `/orders/${orderId}`
    };
    setNotifications(prev => [orderNotif, ...prev]);

    clearCart();
    addToast(`Order #${orderNumber} placed successfully!`);
    return { success: true, orderId, message: 'Order placed successfully!' };
  };

  const cancelOrder = (orderId: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId && (o.orderStatus === 'Pending' || o.orderStatus === 'Confirmed')) {
        // Restore stock
        setProducts(prodPrev => prodPrev.map(p => {
          const matchedItem = o.items.find(oi => oi.productId === p.id);
          if (matchedItem) {
            return { ...p, stock: p.stock + matchedItem.quantity };
          }
          return p;
        }));

        // Refund wallet if paid by wallet
        if (o.paymentMethod === 'Wallet' && o.paymentStatus === 'Paid') {
          const refundTx: WalletTransaction = {
            id: 'tx-' + Date.now(),
            userId: user?.id || 'user-1',
            type: 'REFUND',
            amount: o.total,
            description: `Refund for Cancelled Order #${o.orderNumber}`,
            referenceId: o.id,
            createdAt: new Date().toISOString()
          };
          setWalletTransactions(txPrev => [refundTx, ...txPrev]);
        }

        addToast(`Order #${o.orderNumber} has been cancelled.`, 'info');
        return { ...o, orderStatus: 'Cancelled' as OrderStatus, paymentStatus: o.paymentStatus === 'Paid' ? 'Refunded' : 'Cancelled' as PaymentStatus, updatedAt: new Date().toISOString() };
      }
      return o;
    }));
  };

  // Reviews
  const addProductReview = (productId: string, rating: number, comment: string, image?: string) => {
    if (!user) return;
    const newReview: ProductReview = {
      id: 'rev-' + Date.now(),
      productId,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      rating,
      comment,
      image,
      createdAt: new Date().toISOString()
    };

    setReviews(prev => [newReview, ...prev]);

    // Update product rating and review count
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const prodReviews = [...reviews.filter(r => r.productId === productId), newReview];
        const avgRating = prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length;
        return {
          ...p,
          rating: Number(avgRating.toFixed(1)),
          reviewCount: prodReviews.length
        };
      }
      return p;
    }));

    addToast('Thank you! Your product review has been submitted.');
  };

  const getProductReviews = (productId: string) => {
    return reviews.filter(r => r.productId === productId);
  };

  const canUserReviewProduct = (productId: string): boolean => {
    if (!user) return false;
    // Check if user has a delivered order containing this product
    const hasDelivered = orders.some(o => 
      o.userId === user.id && 
      o.orderStatus === 'Delivered' && 
      o.items.some(i => i.productId === productId)
    );
    return hasDelivered;
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const unreadNotificationCount = notifications.filter(n => !n.isRead).length;

  return (
    <AppContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      updateProfile,
      categories,
      products,
      reviews,
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      cartSubtotal,
      cartDiscount,
      cartItemCount,
      wishlist,
      toggleWishlist,
      isInWishlist,
      addresses,
      addAddress,
      updateAddress,
      deleteAddress,
      setDefaultAddress,
      orders,
      createOrder,
      cancelOrder,
      walletBalance,
      walletTransactions,
      topUpWallet,
      notifications,
      markNotificationAsRead,
      markAllNotificationsAsRead,
      unreadNotificationCount,
      addProductReview,
      getProductReviews,
      canUserReviewProduct,
      toasts,
      addToast,
      removeToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
