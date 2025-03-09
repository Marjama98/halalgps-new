"use client"; // Add this directive at the top to ensure the file is treated as a client component

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/footer';
import { Review } from '@/types/types'; // Ensure this path is correct

const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchSession() {
      const session = await getSession();
      if (session?.user?.role === 'admin') {
        setIsAdmin(true);
        fetchReviews();
      }
    }
    fetchSession();
  }, []);

  async function fetchReviews() {
    const response = await fetch('/api/admin/reviews');
    const data = await response.json();
    setReviews(data);
  }

  const handleApprove = async (id: string) => {
    const response = await fetch(`/api/admin/reviews/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'published' }),
    });
    if (response.ok) {
      fetchReviews();
    } else {
      alert('Failed to approve review');
    }
  };

  const handleReject = async (id: string) => {
    const response = await fetch(`/api/admin/reviews/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'rejected' }),
    });
    if (response.ok) {
      fetchReviews();
    } else {
      alert('Failed to reject review');
    }
  };

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/admin/reviews/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      fetchReviews();
    } else {
      alert('Failed to delete review');
    }
  };

  return (
    <div>
      <Navbar />
      {isAdmin ? (
        <div className="container mx-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Manage Reviews</h1>
          <ul>
            {reviews.map(review => (
              <li key={review.id} className="mb-4 p-4 border border-gray-300 rounded-md">
                <h2 className="text-lg font-semibold">Review {review.id}</h2>
                <p>Restaurant ID: {review.restaurantId}</p>
                <p>User ID: {review.userId}</p>
                <p>Rating: {review.rating}</p>
                <p>Comment: {review.comment}</p>
                <p>Status: {review.status}</p>
                <p>Created At: {review.createdAt.toString()}</p>
                <p>Updated At: {review.updatedAt.toString()}</p>
                <div className="mt-4">
                  <button
                    onClick={() => handleApprove(review.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(review.id)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="container mx-auto p-6">
          <h1 className="text-2xl font-bold mb-6">You are not authorized to view this page</h1>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ReviewsPage;