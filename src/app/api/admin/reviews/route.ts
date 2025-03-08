// app/API/admin/reviews/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth'; // <-- Endret import

// Import your database access functions or models

export async function GET() {
 // Check authorization
const session = await getServerSession(authOptions);
if (!session || (session.user as any).role !== 'admin') {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}


  try {
    // Fetch all reviews, possibly with restaurant info joined
    // Example with a hypothetical data function:
    // const reviews = await getAllReviews();
    
    // Return reviews with restaurant info
    const reviews = [
      // This would come from your database
      { 
        id: '1', 
        restaurantId: '123', 
        restaurantName: 'Sample Restaurant',
        rating: 4,
        comment: 'Great food!',
        user: 'user123',
        createdAt: '2024-01-01T00:00:00.000Z'
      }
    ];
    
    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(request: Request) {
// Check authorization
const session = await getServerSession(authOptions);
if (!session || (session.user as any).role !== 'admin') {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}


  try {
    // Get review data from request body
    const reviewData = await request.json();
    
    // Validate required fields
    if (!reviewData.restaurantId || !reviewData.rating) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Add review to database
    // Example with a hypothetical data function:
    // const newReview = await createReview(reviewData);
    
    // For demonstration, return the data that would be created
    const newReview = {
      id: Date.now().toString(), // Generate an ID
      ...reviewData,
      createdAt: new Date().toISOString()
    };
    
    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
  }
}