"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

type Props = {
  children: ReactNode;
};

const SupabaseContext = createContext<SupabaseClient | null>(null);

export function SupabaseProvider({ children }: Props) {
  const [client, setClient] = useState<SupabaseClient | null>(null);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !anonKey) {
      console.warn("Supabase credentials are not defined.");
      return;
    }

    const supabase = createBrowserSupabaseClient({
      supabaseUrl: url,
      supabaseKey: anonKey,
    });

    setClient(supabase);
  }, []);

  if (!client) {
    return null;
  }

  return <SupabaseContext.Provider value={client}>{children}</SupabaseContext.Provider>;
}

export const useSupabase = () => {
  const client = useContext(SupabaseContext);

  if (!client) {
    throw new Error("useSupabase must be used inside SupabaseProvider.");
  }

  return client;
};
