export type Product = {
  id: number;
  name: string;
  price: string;
  image: any; // or ImageSourcePropType if you want to type it more strictly
  description: string;
};
export type CartItem = {
  product: Product;
  quantity: number;
};

export type UserRole = 'customer' | 'vendor' | 'delivery' | 'admin';

export type User = {
  id: number;
  username: string;
  email: string;
  role: UserRole; // 'customer', 'vendor', 'delivery', 'admin'
  // Add any other user-specific fields from your Django backend
};

export type Order = {
  id: number;
  customerId: number;
  products: CartItem[]; // Products in the order
  totalAmount: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryAddress: string;
  paylaterOption?: 'Outright' | 'Pay 40%' | 'Pay 0%'; // If paylater was used
  paylaterEligibility?: boolean; // Whether paylater was approved
  // Add other order fields like delivery status, assigned delivery person ID, etc.
};

export type Offer = {
  id: number;
  productId: number; // ID of the distress sale product
  customerId: number; // ID of the customer making the offer
  offerAmount: string;
  status: 'pending' | 'accepted' | 'declined';
  offerDate: string;
  // Add other offer-related fields
};

// For Products uploaded by a Vendor:
export type VendorProduct = Product & {
  stock: number; // Vendor needs to manage stock
};