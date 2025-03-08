import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";


// Define custom user type with role as a mandatory string
interface CustomUser extends User {
  id: string;
  role: string; // ✅ Ensure role is always a string
}    

interface CustomSession extends Session {
  user: CustomUser;
}

interface CustomJWT extends JWT {
  id: string;
  role: string;
}

// Use NextAuthOptions type for better type safety
const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "admin@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<CustomUser | null> {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Missing credentials");
          }

          const adminEmail = process.env.ADMIN_EMAIL;
          const adminPassword = process.env.ADMIN_PASSWORD;

          if (
            credentials.email !== adminEmail || 
            credentials.password !== adminPassword
          ) {
            throw new Error("Invalid credentials");
          }

          // ✅ Ensure role is always set
          return {
            id: "1",
            name: "Admin",
            email: credentials.email,
            role: "admin", // ✅ Ensure role is always assigned
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role; // Ensure role is always a string
      }
      return token as CustomJWT;
    },
    async session({ session, token }): Promise<CustomSession> {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role, // Ensure role is always included
        },
      };
    },
  },
  debug: process.env.NODE_ENV === "development",
};

// Create and export the authentication handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, authOptions };
