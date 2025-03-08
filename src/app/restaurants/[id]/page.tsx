// src/app/restaurants/[id]/page.tsx

import ClientPage from "@/app/restaurants/[id]/client-page";
import { ReactNode } from "react";

// Define an interface for the page props, with async params and searchParams
interface PageProps {
  params: Promise<{ id: string }>;  // The params are now async
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }> | undefined;  // Handle searchParams as a Promise as well
}

// Since the page is async, mark the function as async to handle the Promise
export default async function Page({ params, searchParams }: PageProps): Promise<ReactNode> {
  // Await the params and searchParams to get the actual values
  const { id } = await params;
  const queryParams = searchParams ? await searchParams : undefined;

  // Pass the id and queryParams to the client component
  return <ClientPage id={id} searchParams={queryParams} />;
}
