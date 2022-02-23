import React from 'react';
import Head from 'next/head';
import Admin from '@components/Admin';

export default function index() {
  return (
    <>
      <Head>
        <title>ADMIN</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
      </Head>
      <Admin />
    </>
  );
}
