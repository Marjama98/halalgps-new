
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Restaurant {
  id: string;
  name: string;
  type: string; // This represents the cuisine type
  cuisine: string;
  image: string;
  isActive?: boolean; // Made optional
  isFeatured?: boolean; // Made optional
  address: string;
  price: string; // "$", "$$", "$$$", or "$$$$"
  rating: number;
  features: string[];
  description?: string;
  location: { city: string; country: string;
  };
  coordinates?: Coordinates; // Added directly to restaurant for compatibility with existing component
  contact?: {
    phone?: string;
    website?: string;
    email?: string;
    socialMedia?: {
      instagram?: string;
      facebook?: string;
      twitter?: string;
    };
  };
  hours?: {
    [key: string]: string; // e.g., "monday": "9:00 AM - 9:00 PM"
  };
  // Enhanced data that maintains backward compatibility
  gallery?: string[]; // Additional images
  priceRange?: {
    min: number;
    max: number;
    currency: string;
  };
  ratingsCount?: number;
  shortDescription?: string; // For list views
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
  paymentMethods?: string[]; // e.g., "credit-card", "cash", "mobile-payment"
  languages?: string[]; // Languages spoken by staff
  noiseLevel?: "quiet" | "moderate" | "loud";
  attire?: "casual" | "smart-casual" | "formal";
  parkingOptions?: string[]; // e.g., "street", "lot", "valet"
  publicTransport?: string; // Description of nearby public transport
}

export const restaurants: Restaurant[] = [
  {
    id: "holmlia-kulturkafe",
    name: "Holmlia kulturkafé",
    type: "Kafé",
    cuisine: "Scandinavian",
    image: "/images/Holmlia.jpg",
    isActive: true,
    isFeatured: false,
    address: "Holmlia sentervei 1, 1255 Oslo",
    price: "$$",
    rating: 4.7,
    features: ["halal", "vegetarian-options", "wifi", "family-friendly"],
    description: "A cozy café serving traditional Scandinavian dishes with halal options. Known for their excellent coffee and pastries. The café also hosts cultural events and exhibitions from local artists.",
    location: {
      city: "Oslo",
      country: "Norway"
    },
    coordinates: {
      lat: 59.8456,
      lng: 10.8093
    },
    contact: {
      phone: "+47 22 33 44 55",
      website: "https://kremkafe.no",
      email: "bestilling@kremkafe.no",
      socialMedia: {
        instagram: "@holmliakulturkafe",
        facebook: "Holmliakulturkafe"
      }
    },
    hours: {
      "monday": "10:00  - 16:00 ",
      "tuesday": "10:00 - 16:00",
      "wednesday": "10:00 - 16:00",
      "thursday": "10:00  - 16:00",
      "friday": "10:00  - 17:00",
      "saturday": "10:00 - 16:00",
      "sunday": "CLOSED"
    },
    // Enhanced data
    gallery: [
      "/images/Holmlia-interior.jpg",
      "/images/Holmlia-food1.jpg",
      "/images/Holmlia-food2.jpg"
    ],
    priceRange: {
      min: 80,
      max: 250,
      currency: "NOK"
    },
    ratingsCount: 128,
    shortDescription: "Cozy café with Scandinavian dishes and halal options.",
    establishedYear: 2015,
    neighborhood: "Holmlia",
    popularDishes: [
      {
        id: "smorbrod-salmon",
        name: "Smørbrød with Smoked Salmon",
        description: "Open-faced sandwich with smoked salmon, dill, and mustard sauce",
        price: 135,
        currency: "NOK",
        image: "/images/smorbrod-salmon.jpg",
        dietary: ["halal"]
      },
      {
        id: "cinnamon-bun",
        name: "Kanelbolle",
        description: "Traditional Norwegian cinnamon bun",
        price: 45,
        currency: "NOK",
        dietary: ["vegetarian"]
      }
    ],
    reviews: [
      {
        id: "rev1",
        userName: "Marta J.",
        rating: 5,
        date: "2024-08-15",
        comment: "Best coffee in Oslo! The halal options are excellent too.",
        helpful: 12
      },
      {
        id: "rev2",
        userName: "Ahmed K.",
        rating: 4,
        date: "2024-07-22",
        comment: "Great atmosphere and friendly staff. Would definitely return.",
        helpful: 8
      }
    ],
    promotions: [
      {
        id: "promo1",
        title: "Weekday Lunch Special",
        description: "Get a coffee for half price with any lunch dish",
        startDate: "2024-09-01",
        endDate: "2024-12-31",
        discountPercentage: 50,
        promoCode: "LUNCH50"
      }
    ],
    dietaryOptions: {
      halal: true,
      kosher: false,
      vegetarian: true,
      vegan: true,
      glutenFree: true,
      nutFree: true,
      dairyFree: true,
      organic: true
    },
    paymentMethods: ["credit-card", "debit-card", "cash", "mobile-payment"],
    languages: ["Norwegian", "English", "Arabic"],
    noiseLevel: "moderate",
    attire: "casual",
    parkingOptions: ["street", "nearby-garage"],
    publicTransport: "5 min walk from Holmlia Station (L2 line)"
  },
  {
    id: "two-fat-ladies",
    name: "Two Fat Ladies",
    type: "Swedish",
    cuisine: "Swedish",
    image: "/images/twofatladies.jpg",
    isActive: true,
    isFeatured: false,
    address: "Götgatan 76, 118 30 Stockholm",
    price: "$$$",
    rating: 4.5,
    features: ["halal", "outdoor-seating", "takeaway", "gluten-free"],
    description: "Modern restaurant serving halal Swedish cuisine with a contemporary twist. Beautiful outdoor seating area.",
    location: {
      city: "Stockholm",
      country: "Sweden"
    },
    coordinates: {
      lat: 59.3173,
      lng: 18.0665
    },
    contact: {
      phone: "+46 8 123 456 78",
      website: "https://twofatladies.se"
    },
    hours: {
      "monday": "11:00 AM - 10:00 PM",
      "tuesday": "11:00 AM - 10:00 PM",
      "wednesday": "11:00 AM - 10:00 PM",
      "thursday": "11:00 AM - 10:00 PM",
      "friday": "11:00 AM - 11:00 PM",
      "saturday": "11:00 AM - 11:00 PM",
      "sunday": "12:00 PM - 8:00 PM"
    },
    ratingsCount: 89,
    popularDishes: [
      {
        id: "swedish-meatballs",
        name: "Swedish Meatballs",
        description: "Traditional Swedish meatballs with mashed potatoes and lingonberry jam",
        price: 185,
        currency: "SEK",
        dietary: ["halal"]
      }
    ]
  },
  // Additional restaurants would follow the same pattern, combining original format with enhancements
  // ...
];

// Define cuisine types for filtering - expanded
export const cuisineTypes = [
  "Scandinavian",
  "Swedish",
  "Danish",
  "Norwegian",
  "Finnish",
  "Indian",
  "Middle Eastern",
  "Turkish",
  "Lebanese",
  "Moroccan",
  "Asian Fusion",
  "Japanese",
  "Chinese",
  "Thai",
  "Vietnamese",
  "Seafood",
  "Vegetarian",
  "American",
  "Italian",
  "Mexican",
  "Greek",
  "French",
  "Spanish",
  "Ethiopian"
];

// Define price categories for filtering
export const priceCategories = ["$", "$$", "$$$", "$$$$"];

// Define features for filtering - expanded
export const featureOptions = [
  { id: "halal", label: "Halal" },
  { id: "vegetarian-options", label: "Vegetarian Options" },
  { id: "vegan-options", label: "Vegan Options" },
  { id: "gluten-free", label: "Gluten Free" },
  { id: "dairy-free", label: "Dairy Free" },
  { id: "nut-free", label: "Nut Free" },
  { id: "organic", label: "Organic" },
  { id: "wifi", label: "Free WiFi" },
  { id: "outdoor-seating", label: "Outdoor Seating" },
  { id: "takeaway", label: "Takeaway" },
  { id: "delivery", label: "Delivery" },
  { id: "family-friendly", label: "Family Friendly" },
  { id: "kid-menu", label: "Kids Menu" },
  { id: "accessible", label: "Wheelchair Accessible" },
  { id: "free-parking", label: "Free Parking" },
  { id: "romantic", label: "Romantic" },
  { id: "fine-dining", label: "Fine Dining" },
  { id: "catering", label: "Catering" },
  { id: "private-dining", label: "Private Dining" },
  { id: "waterfront", label: "Waterfront" },
  { id: "late-night", label: "Late Night" },
  { id: "large-groups", label: "Good for Groups" },
  { id: "sustainable", label: "Sustainable" },
  { id: "live-music", label: "Live Music" },
  { id: "dog-friendly", label: "Dog Friendly" }
];

// Define distance options for filtering
export const distanceOptions = [
  { id: "under1km", label: "Under 1 km" },
  { id: "1-5km", label: "1-5 km" },
  { id: "5-10km", label: "5-10 km" },
  { id: "over10km", label: "Over 10 km" }
];

// New filter options
export const mealTypes = [
  { id: "breakfast", label: "Breakfast" },
  { id: "brunch", label: "Brunch" },
  { id: "lunch", label: "Lunch" },
  { id: "dinner", label: "Dinner" },
  { id: "dessert", label: "Dessert" },
  { id: "coffee", label: "Coffee & Drinks" }
];

export const atmosphereOptions = [
  { id: "quiet", label: "Quiet" },
  { id: "moderate", label: "Moderate" },
  { id: "lively", label: "Lively" },
  { id: "energetic", label: "Energetic" }
];

export default restaurants;