// app/admin/page.tsx
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  // Fetch summary data
  const restaurantCount = await prisma.restaurant.count();
  const reviewCount = await prisma.review.count();
  const pendingReviews = await prisma.review.count({
    where: { status: "pending" }
  });
  // Add other relevant counts based on your schema

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Restaurant Stats */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-700">Restaurants</h2>
          <p className="text-3xl font-bold mt-2">{restaurantCount}</p>
          <Link href="/admin/restaurants" className="text-blue-600 mt-4 inline-block">
            Manage Restaurants →
          </Link>
        </div>
        
        {/* Reviews Stats */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-700">Reviews</h2>
          <p className="text-3xl font-bold mt-2">{reviewCount}</p>
          <p className="text-sm text-amber-600 mt-1">
            {pendingReviews} pending approval
          </p>
          <Link href="/admin/reviews" className="text-blue-600 mt-4 inline-block">
            Manage Reviews →
          </Link>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-700">Quick Actions</h2>
          <div className="mt-4 space-y-2">
            <Link href="/admin/restaurants/add" 
                  className="block w-full p-2 bg-green-600 text-white text-center rounded">
              Add New Restaurant
            </Link>
            {pendingReviews > 0 && (
              <Link href="/admin/reviews?status=pending" 
                    className="block w-full p-2 bg-amber-600 text-white text-center rounded">
                Review Pending Comments
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}