"use client";

import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

type Props = {
  children: ReactNode;
};

const SupabaseContext = createContext<SupabaseClient | null>(null);

export function SupabaseProvider({ children }: Props) {
  const client = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !anonKey) {
      throw new Error("Supabase credentials are missing from the environment variables.");
    }

    return createBrowserSupabaseClient({
      supabaseUrl: url,
      supabaseKey: anonKey,
    });
  }, []);

  return <SupabaseContext.Provider value={client}>{children}</SupabaseContext.Provider>;
}

export const useSupabase = () => {
  const client = useContext(SupabaseContext);

  if (!client) {
    throw new Error("useSupabase must be used inside SupabaseProvider.");
  }

  return client;
};
