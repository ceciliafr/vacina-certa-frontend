import { AxiosInterceptor } from "@/service/config";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AxiosInterceptor>
      <Component {...pageProps} />
    </AxiosInterceptor>
  );
}
