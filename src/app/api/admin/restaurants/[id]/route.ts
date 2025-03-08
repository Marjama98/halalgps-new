import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { Session } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Restaurant } from '@/types/types';
import { restaurants } from '@/data/restaurants';

// ✅ Remove AdminSession and use the globally extended Session type
function isAdmin(session: Session | null): boolean {
  return !!session?.user?.role && session.user.role === 'admin';
}

// Utility function to find a restaurant by ID with error handling
function findRestaurant(restaurants: Restaurant[], id: string): Restaurant | undefined {
  const parsedId = parseInt(id, 10);
  
  if (isNaN(parsedId)) {
    throw new Error('Invalid restaurant ID format');
  }

  return restaurants.find(restaurant => Number(restaurant.id) === parsedId);
}

export async function GET(request: Request) {
  try {
    // Extract the ID from the URL
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json(
        { error: 'Restaurant ID is required' }, 
        { status: 400 }
      );
    }

    // Check authorization
    const session = await getServerSession(authOptions);
    
    if (!isAdmin(session)) {
      return NextResponse.json(
        { error: 'Unauthorized: Admin access required' }, 
        { status: 401 }
      );
    }

    // Find restaurant
    const restaurant = findRestaurant(restaurants, id);
    
    if (!restaurant) {
      return NextResponse.json(
        { error: `Restaurant with ID ${id} not found` }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json(restaurant);
  } catch (error) {
    console.error('Error in GET restaurant:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' }, 
      { status: 500 }
    );
  }
}
