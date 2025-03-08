'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Review } from '@/types/types'; // Adjust the import path

// Example review data (replace with your data fetching logic)
const reviews: Review[] = [
  { id: '1', restaurantId: '101', userId: '201', rating: 5, comment: 'Great food!', status: 'published', createdAt: new Date(), updatedAt: new Date() },
  { id: '2', restaurantId: '102', userId: '202', rating: 4, comment: 'Nice ambiance.', status: 'published', createdAt: new Date(), updatedAt: new Date() }
];

const ReviewPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams?.get('id'); // Use optional chaining to avoid null errors

  if (!id) {
    return <div>Review ID not provided</div>;
  }

  const review = reviews.find(review => review.id === id);

  if (!review) {
    return <div>Review not found</div>;
  }

  return (
    <div>
      <h1>Review {review.id}</h1>
      <p>Restaurant ID: {review.restaurantId}</p>
      <p>User ID: {review.userId}</p>
      <p>Rating: {review.rating}</p>
      <p>Comment: {review.comment}</p>
      <p>Status: {review.status}</p>
      <p>Created At: {review.createdAt.toString()}</p>
      <p>Updated At: {review.updatedAt.toString()}</p>
    </div>
  );
};

// Wrap the ReviewPage in Suspense
export default function ReviewPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReviewPage />
    </Suspense>
  );
}
