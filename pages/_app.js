// pages/_app.js
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../styles/globals.css';
import { AuthProvider } from '../util/AuthContext'; // Adjust the import path as necessary
import Navbar from '../components/Layout/Navbar'; // Import the Navbar component
import Footer from '../components/Layout/Footer'; // Import the Footer component

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <Navbar /> {/* Navbar will be included on every page */}
      <Component {...pageProps} />
      <Footer/>
    </QueryClientProvider>
    </AuthProvider>
  );
}

export default MyApp;
