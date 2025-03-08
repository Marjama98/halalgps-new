'use client';

import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  // Ensure pathname is always defined
  const currentPath = pathname || '';

  // Check if this is the login page
  if (currentPath === '/admin/login') {
    return <>{children}</>;
  }

  // Loading state
  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // Not authenticated
  if (status !== 'authenticated') {
    return null; // Middleware should handle redirection
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800">
        <div className="flex items-center justify-center h-16 bg-gray-900">
          <span className="text-white font-bold">Admin Dashboard</span>
        </div>
        <nav className="mt-5">
          <Link 
            href="/admin" 
            className={`flex items-center px-6 py-2 mt-4 ${
              currentPath === '/admin' ? 'text-gray-100 bg-gray-700' : 'text-gray-400 hover:bg-gray-700 hover:text-gray-100'
            }`}
          >
            <span className="mx-3">Dashboard</span>
          </Link>
          <Link 
            href="/admin/restaurants" 
            className={`flex items-center px-6 py-2 mt-4 ${
              currentPath.startsWith('/admin/restaurants') ? 'text-gray-100 bg-gray-700' : 'text-gray-400 hover:bg-gray-700 hover:text-gray-100'
            }`}
          >
            <span className="mx-3">Restaurants</span>
          </Link>
          <Link 
            href="/admin/reviews" 
            className={`flex items-center px-6 py-2 mt-4 ${
              currentPath.startsWith('/admin/reviews') ? 'text-gray-100 bg-gray-700' : 'text-gray-400 hover:bg-gray-700 hover:text-gray-100'
            }`}
          >
            <span className="mx-3">Reviews</span>
          </Link>
        </nav>
        <div className="absolute bottom-0 w-64">
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="flex items-center px-6 py-2 mx-auto mt-20 text-gray-400 hover:bg-gray-700 hover:text-gray-100"
          >
            <span className="mx-3">Logout</span>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
          <div className="flex items-center">
            <span className="text-lg font-semibold">
              {currentPath === '/admin' && 'Dashboard'}
              {currentPath === '/admin/restaurants' && 'Restaurants'}
              {currentPath === '/admin/reviews' && 'Reviews'}
              {currentPath.startsWith('/admin/restaurants/add') && 'Add Restaurant'}
              {currentPath.match(/\/admin\/restaurants\/[^/]+$/) && 'Edit Restaurant'}
              {currentPath.match(/\/admin\/reviews\/[^/]+$/) && 'Edit Review'}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-700 mr-2">
              {session?.user?.name || session?.user?.email}
            </span>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
