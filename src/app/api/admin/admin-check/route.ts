import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth'; // <-- Correct import of authOptions

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user || session.user.role !== 'admin') {
    return NextResponse.json({ isAdmin: false }, { status: 401 });
  }
  
  return NextResponse.json({ isAdmin: true });
}
