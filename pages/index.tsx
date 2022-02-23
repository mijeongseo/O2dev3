import React, { useEffect } from 'react';
import Head from 'next/head';
import MapLayout from '@components/Map';
import { dehydrate, QueryClient } from 'react-query';
import { loadSSRMyInfo } from '@apis/user';
import { withSSRContext } from 'aws-amplify';
export default function index() {
  return (
    <>
      <Head>
        <title>MAP</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
      </Head>
      <MapLayout />
    </>
  );
}

// export const getStaticProps = async (context) => {
export const getServerSideProps = async (context) => {
  const { Auth } = withSSRContext(context);
  const queryClient = new QueryClient();
  const ssrQueryFn = () => {
    return Auth.currentUserInfo()
      .then((response) => {
        let data;
        if (response) {
          data = response.attributes.email;
        } else {
          Auth.currentAuthenticatedUser
            .then((res) => {
              data = res.attributes.email;
            })
            .catch((err) => console.error(err));
        }
        return loadSSRMyInfo({ email: data });
      })
      .catch((err) => console.error(err));
  };
  await queryClient.prefetchQuery('user', ssrQueryFn);
  // console.log(queryClient.getQueryData('user'));
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      // dehydratedState: dehydrate(queryClient),
    },
  };
};
