// src/types/types.ts

export interface Restaurant {
  id: string;
  name: string;
  type?: string; // Cuisine type
  cuisine?: string;
  address: string;
  phone?: string; // Optional phone property
  website?: string; // Optional website property
  description?: string; // Optional description
  image: string;
  isActive?: boolean;
  isFeatured?: boolean;
  rating: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
  contact?: {
    phone?: string; // Optional contact phone
    website?: string; // Optional contact website
    email?: string;
    socialMedia?: {
      instagram?: string;
      facebook?: string;
      twitter?: string;
    };
  };
  hours?: { [key: string]: string }; // Optional hours
  gallery?: string[]; // Optional gallery images
  priceRange?: { min: number; max: number; currency: string }; // Optional price range
  ratingsCount?: number;
  shortDescription?: string;
  establishedYear?: number;
  neighborhood?: string;
  popularDishes?: {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    image?: string;
    dietary?: string[];
  }[];
  reviews?: {
    id: string;
    userName: string;
    rating: number;
    date: string;
    comment: string;
    helpful?: number;
  }[];
  promotions?: {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    discountPercentage?: number;
    promoCode?: string;
  }[];
  dietaryOptions?: {
    halal: boolean;
    kosher: boolean;
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    nutFree: boolean;
    dairyFree: boolean;
    organic: boolean;
  };
  paymentMethods?: string[];
  languages?: string[];
  noiseLevel?: "quiet" | "moderate" | "loud";
  attire?: "casual" | "smart-casual" | "formal";
  parkingOptions?: string[];
  publicTransport?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  passwordHash: string;
  reviews?: Review[];
}

export type Review = {
  id: string;
  restaurantId: string;
  userId: string;
  rating: number;
  comment: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};
