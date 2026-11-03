"use client";
import { useEffect } from "react";
import { authClient, createApiSession } from "@/lib/auth-client";

export default function AuthSync() {
  const { data: session } = authClient.useSession();
  useEffect(() => {
    if (session?.user?.id) createApiSession().catch((error) => console.error(error.message));
  }, [session?.user?.id]);
  return null;
}
