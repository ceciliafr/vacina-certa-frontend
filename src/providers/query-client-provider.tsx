"use client";
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AxiosInterceptor } from "@/service/config";

export type initialStateProps = { queryKey: string[]; data: any }[];

interface ApiProviderProps extends React.PropsWithChildren {
  initialState?: initialStateProps;
}

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

function Providers({ children, initialState }: ApiProviderProps) {
  initialState?.forEach((query) => {
    queryClient.setQueryData(query.queryKey, query.data);
  });

  return (
    <AxiosInterceptor>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AxiosInterceptor>
  );
}

export default Providers;
