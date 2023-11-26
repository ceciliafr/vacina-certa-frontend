"use client";
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AxiosInterceptor } from "@/service/config";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

function Providers({ children }: React.PropsWithChildren) {
  return (
    <AxiosInterceptor>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AxiosInterceptor>
  );
}

export default Providers;
