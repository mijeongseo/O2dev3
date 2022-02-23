import React, { useRef } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import GlobalStyle from 'styles/global-styles';
import 'antd/dist/antd.css';
import wrapper from 'store';

import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Amplify from 'aws-amplify';
import awsmobile from '@src/aws-exports';

Amplify.configure({ ...awsmobile, ssr: true });

function App({ Component, pageProps }: AppProps) {
  const queryClientRef = useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link href="https://webfontworld.github.io/naver/NanumSquareRound.css" rel="stylesheet" />
      </Head>
      <GlobalStyle />
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default wrapper.withRedux(App);
