import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/auth`
});

export async function createApiSession() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/session/sync-token`, {
    method: "POST",
    credentials: "include"
  });
  if (!response.ok) throw new Error("Could not prepare your secure API session.");
  return response.json();
}
