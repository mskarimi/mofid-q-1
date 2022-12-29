import type {AppProps} from "next/app";
import "styles/globals.css";
import Template from "template";
import Head from "next/head";
import {Hydrate, QueryClient, QueryClientProvider} from "react-query";
import {useState} from "react";
import {ReactQueryDevtools} from "react-query/devtools";

export default function App({Component, pageProps}: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Head>
        <title>کارگذاری مفید سوال یک</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Template>
            <Component {...pageProps} />
          </Template>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}
