"use client";

import type { ReactNode } from "react";
import { ReactQueryProvider } from "./react-query-provider";
import { SupabaseProvider } from "./supabase-provider";

type Props = {
  children: ReactNode;
};

export function AppProviders({ children }: Props) {
  return (
    <SupabaseProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </SupabaseProvider>
  );
}
