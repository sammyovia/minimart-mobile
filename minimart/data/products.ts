import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Apple iPhone 16 128GB | Teal',
    price: '$700.00',
    image: require('../assets/images/iphone16.png'),
    description: `This pre-owned product is not Apple certified, but has been professionally inspected...`,
  },
  {
    id: 2,
    name: 'M4 Macbook Air 13” 256GB | Sky Blue',
    price: '$1000.00',
    image: require('../assets/images/mac.png'),
    description: `Gorgeous design, powerful chip, and efficient battery life.`,
  },
  {
    id: 3,
    name: 'Google Pixel 9A 128GB | Iris',
    price: '$499.00',
    image: require('../assets/images/gpix.png'),
    description: `Pure Android experience and AI-powered features.`,
  },
  {
    id: 4,
    name: 'Apple Airpods 4 Active Noise Cancellation',
    price: '$129.00',
    image: require('../assets/images/airpod.png'),
    description: `High quality sound with improved noise cancellation.`,
  },
];
// Uncomment the following lines if you want to create a featured products list

// export const featuredProducts: Product[] = [
//   products[0],
//   products[1],
//   products[2],
// ];