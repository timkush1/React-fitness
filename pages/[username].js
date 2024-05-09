import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../util/AuthContext'; // Adjust the path to your AuthContext file
import Dashboard from '@/components/afterAuth/Dashboard';
import Head from 'next/head'; // Import the Head component

const UserPage = () => {
  const { checkAuth } = useAuth();
  const router = useRouter();
  const { username } = router.query;
 
  
  
  useEffect(() => {
    // If not authenticated, redirect to the home page
    if (!checkAuth() ) {
      router.push('/');
    }
  }, [checkAuth,router]);
  

  // If the user is authenticated, render the page content
  return(
    <>
     <Head>
        <title>Dashboard - {username}</title>
        <meta name="Dashboard" content="User-specific dashboard displaying personal finance data." />
        <link rel="icon" href="/fitness-logo.ico" />
      </Head>
    <div>hello {username}</div>
    <div>you will be automatically logged out after 1 hour for your productivity process </div>
    <Dashboard username={username}></Dashboard>
    </>
  ) 
};

export default UserPage;
