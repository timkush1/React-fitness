// components/Navbar.js

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuth } from '../../util/AuthContext'; // Adjust the path to your AuthContext file

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const router = useRouter();
  const [homeRedirect, setHomeRedirect] = useState('/');
  const [username, setUsername] = useState('');


  useEffect(() => {
    setUsername( localStorage.getItem('username'));
  }, [isAuthenticated]);

  useEffect(() => {
    setHomeRedirect(isAuthenticated && username ? `/${username}` : '/');
  
  }, [isAuthenticated,username]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    router.push('/');
  };


  return (
    <nav style={{ display: 'flex', alignItems: 'center', backgroundColor: '#34495e', padding: '0.5rem 1rem' }}>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
        <Link legacyBehavior href={homeRedirect} >
          <a style={{ color: 'white', textDecoration: 'none', marginRight: '20px', fontWeight: 'bold', fontSize: '1.1em' }}>Home</a>
        </Link>
        <Link legacyBehavior href='/About' >
          <a style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' , fontSize: '1.1em'}}>About</a>
        </Link>
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <Link legacyBehavior href={homeRedirect} >
          <a>
            <Image
              src="/images/fitness-logo.png"
              alt="Fitness Logo"
              width={80}
              height={80}
              layout="intrinsic"
              className="rounded-full"
            />
          </a>
        </Link>
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
        {isAuthenticated ? (
          <button onClick={handleLogout} style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}>
            Logout
          </button>
        ) : <div style={{ width: '80px' }} />} {/* Invisible div to maintain the space */}
      </div>
    </nav>
  );
};

export default Navbar;