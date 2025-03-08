import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth'; // <-- Endret import
import { Session } from 'next-auth';

// Import your database access functions or models

// Type guard function to check for admin role
function isAdmin(session: Session | null): session is Session & { user: { role: string } } {
  return session?.user?.role === 'admin';
}

export async function GET(request: Request) {
  // Extract the ID from the URL
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();

  if (!id) {
    return NextResponse.json({ error: 'ID not provided' }, { status: 400 });
  }

  // Check authorization
  const session = await getServerSession(authOptions);
  if (!isAdmin(session)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Fetch the review by ID
    // Example with a hypothetical data function:
    // const review = await getReviewById(id);
    
    // For demonstration:
    const review = { 
      id, 
      restaurantId: '123', 
      restaurantName: 'Sample Restaurant',
      rating: 4,
      comment: 'Great food!',
      user: 'user123',
      createdAt: '2024-01-01T00:00:00.000Z'
    };
    
    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }
    
    return NextResponse.json(review);
  } catch (error) {
    console.error('Error fetching review:', error);
    return NextResponse.json({ error: 'Failed to fetch review' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  // Extract the ID from the URL
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();

  if (!id) {
    return NextResponse.json({ error: 'ID not provided' }, { status: 400 });
  }

  // Check authorization
  const session = await getServerSession(authOptions);
  if (!isAdmin(session)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get updated data from request body
    const updateData = await request.json();
    
    // Update the review
    // Example with a hypothetical data function:
    // const updatedReview = await updateReview(id, updateData);
    
    // For demonstration:
    const updatedReview = {
      id,
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    return NextResponse.json(updatedReview);
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  // Extract the ID from the URL
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();

  if (!id) {
    return NextResponse.json({ error: 'ID not provided' }, { status: 400 });
  }

  // Check authorization
  const session = await getServerSession(authOptions);
  if (!isAdmin(session)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Delete the review
    // Example with a hypothetical data function:
    // await deleteReview(id);
    
    // If successful, return a success message
    return NextResponse.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
  }
}