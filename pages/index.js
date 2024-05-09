// pages/index.js
import React from "react";
import Welcomes from "../components/welcome"; // Ensure this is the correct path and component name
import Head from "next/head"; // Import the Head component

const Home = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="Home" content="Home page of Tims fitness tracker site " />
        <link rel="icon" href="/fitness-logo.ico" />
      </Head>
      
      <Welcomes />
    </>
  );
};

export default Home;
