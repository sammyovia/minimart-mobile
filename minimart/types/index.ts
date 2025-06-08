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