import React from 'react'; //To be able to use jsx syntax
import { Layout } from '../../components';
import { Toaster } from 'react-hot-toast'; //small notification popup
import '@/styles/globals.css';
import { StateContext } from '../../context/StateContext';

export default function App({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}

//Data passed from StateContext can reach every single component inside of it