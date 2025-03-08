// app/layout.tsx
'use client';  // Dette gjør komponenten til client-side

import { SessionProvider } from "next-auth/react";  // Importer SessionProvider
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Chatbot from '@/components/Chatbot';  // Import chatbot-komponenten

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          transition: "opacity 0.5s ease-in-out",  // Smooth transition for page opacity
          opacity: 1,  // Initial opacity
        }}
      >
        {/* Wrapping the entire app with SessionProvider */}
        <SessionProvider>
          {children}
          <Chatbot /> {/* Chatbot will appear on all pages */}
        </SessionProvider>
      </body>
    </html>
  );
}
