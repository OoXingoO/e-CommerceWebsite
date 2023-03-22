import React from 'react';
import Head from 'next/head'; //same as html Head
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => { //children here is what was wrapped inside layout component on _app.js
    return (
        <div className='layout'>
            <Head>
                <title>Bobaology</title>
            </Head>
            <header>
                <Navbar />
            </header>
            <main className='main-container'>
                {children}
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Layout