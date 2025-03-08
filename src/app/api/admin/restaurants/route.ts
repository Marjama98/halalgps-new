// app/API/admin/restaurants/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth'; // <-- Endret import
// Import your database access functions or models

export async function GET() {
  // Check authorization
  const session = await getServerSession(authOptions);
  if (!session || !session.user || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Fetch all restaurants from your database
    // Example using a hypothetical data function:
    // const restaurants = await getAllRestaurants();
    
    // If you're using a data file like in your structure:
    const restaurants = require('@/data/restaurants.ts').default;
    
    return NextResponse.json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return NextResponse.json({ error: 'Failed to fetch restaurants' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  // Check authorization
 const session = await getServerSession(authOptions);
if (!session || !session.user || session.user.role !== 'admin') {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

  try {
    // Get restaurant data from request body
    const restaurantData = await request.json();
    
    // Validate required fields
    if (!restaurantData.name || !restaurantData.location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Add restaurant to database
    // Example using a hypothetical data function:
    // const newRestaurant = await createRestaurant(restaurantData);
    
    // For now, just return the data that would be created
    const newRestaurant = {
      id: Date.now().toString(), // Generate an ID
      ...restaurantData,
      createdAt: new Date().toISOString()
    };
    
    return NextResponse.json(newRestaurant, { status: 201 });
  } catch (error) {
    console.error('Error creating restaurant:', error);
    return NextResponse.json({ error: 'Failed to create restaurant' }, { status: 500 });
  }
}