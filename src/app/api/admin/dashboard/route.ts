// app/API/admin/dashboard/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth'; // <-- Endret import
// Import your data functions or database connection

export async function GET() {
    
  // Check authorization
  const session = await getServerSession(authOptions);
  if (!session?.user?.role || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Fetch dashboard data
    // This is where you'd query your database for stats
    
    // Example with mock data:
    const stats = {
      restaurantCount: 25,
      reviewCount: 142,
      recentRestaurants: [/* your data */],
      recentReviews: [/* your data */]
    };
    
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Dashboard data fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}