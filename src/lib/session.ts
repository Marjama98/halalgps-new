import { type AuthOptions, getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// If you need to use the session in a Server Component or API route
export async function getAuthSession() {
  const session = await getServerSession(authOptions);
  return session;
}

// Re-export for convenience
export { authOptions };
export type { AuthOptions };