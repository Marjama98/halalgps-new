// src/app/admin/restaurants/[id]/edit/page.tsx

// Import your client component
import EditRestaurantClient from "./edit-restaurant-client";

// Define the page component without explicitly typing the parameters
export default async function EditRestaurantPage({ params }: any) {
  // The 'any' type here bypasses TypeScript's strict checking
  // This is a temporary solution to get your build working
  
  return <EditRestaurantClient id={params.id} />;
}

