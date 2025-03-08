"use client"; // Add this directive at the top to ensure the file is treated as a client component

import React from 'react';
import { Review } from '@/types/types'; // Ensure this path is correct

// Example review data (replace with your data fetching logic)
const reviews: Review[] = [
  { id: '1', restaurantId: '101', userId: '201', rating: 5, comment: 'Great food!', status: 'published', createdAt: new Date(), updatedAt: new Date() },
  { id: '2', restaurantId: '102', userId: '202', rating: 4, comment: 'Nice ambiance.', status: 'published', createdAt: new Date(), updatedAt: new Date() }
];

const ReviewsPage: React.FC = () => {
  return (
    <div>
      <h1>Reviews</h1>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <h2>Review {review.id}</h2>
            <p>Restaurant ID: {review.restaurantId}</p>
            <p>User ID: {review.userId}</p>
            <p>Rating: {review.rating}</p>
            <p>Comment: {review.comment}</p>
            <p>Status: {review.status}</p>
            <p>Created At: {review.createdAt.toString()}</p>
            <p>Updated At: {review.updatedAt.toString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewsPage;