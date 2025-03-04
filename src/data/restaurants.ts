'use client';

export interface Restaurant {
  id: number;
  name: string;
  address: string;
  type: string; // Add category/type here
  location: string;
  rating: number;
  description: string;
  price: string; // Add price here
}

export const restaurants = [
  {
    id: 1,
    name: "Gazakjøkken",
    type: "Arabic",
    address: "TMøllergata 10, Oslo 0179 Norge",
    image: "/images/gazakjokken.jpg",
    description: "Authentic Somali cuisine with a modern twist.",
    rating: 4.5,
    location: "Oslo, Norway",
    price: "$",
  },
  {
    id: 2,
    name: "Saray Restaurant Grønland",
    type: "Turkish",
    address: "Grønland 5, 0188 Oslo",
    image: "/images/saray.webp",
    description: "Turkish food with fresh ingredients.",
    rating: 4.0,
    location: "Oslo, Norway",
    price: "$$",
  },
  {
    id: 3,
    name: "Safari Restaurant",
    type: "Somali",
    address: "Grønland 12, 0188 Oslo",
    image: "/images/safari.jpg",
    description: "Somali food with authentic flavors.",
    rating: 4.4,
    location: "Oslo, Norway",
    price: "$",
  },
  {
    id: 4,
    name: "Kebabish Original",
    type: "Pakistani",
    address: "Trondheimsveien 2, 0560 Oslo",
    image: "/images/kebabish-original-oslo.jpg",
    description: "Pakistansk mat med autentiske smaker.",
    rating: 3.7,
    location: "Oslo, Norway",
    price: "$$",
  },
  {
    id: 5,
    name: "Jønk",
    type: "American",
    address: "Smalgangen 43, 0188 Oslo",
    image: "/images/jonk.jpg",
    description: "Smashburgers, fries, and milkshakes.",
    rating: 3.7,
    location: "Oslo, Norway",
    price: "$$$",
  },
  {
    id: 6,
    name: "175°C K-fried",
    type: "Korean",
    address: "Vulkan, 0175 Oslo",
    image: "/images/friedkorean.jpeg",
    description: "Korean fried chicken and street food.",
    rating: 4.8,
    location: "Oslo, Norway",
    price: "$",
  },
  {
    id: 7,
    name: "Alibaba Grill & Steakhouse",
    type: "Turkish",
    address: "Trondheimsveien 6A, 0560 Oslo",
    image: "/images/ali.jpg",
    description: "Turkish grill and steakhouse.",
    rating: 3.7,
    location: "Oslo, Norway",
    price: "$$",
  },
];
