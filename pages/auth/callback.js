import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from '../../lib/axios';
import Layout from "../../components/global/layout";
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

const AuthCallback = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the access_token and provider from URL parameters
        const { access_token, provider } = router.query;

        if (access_token) {
          // Store the token
          localStorage.setItem('token', access_token);

          // Get user data
          const { data } = await axios.get('/api/users/me');
          
          // Store user data
          localStorage.setItem('user', JSON.stringify(data));

          // Redirect to stored return path or default to home
          const returnTo = localStorage.getItem('returnTo') || '/';
          localStorage.removeItem('returnTo');
          router.push(returnTo);
        } else {
          throw new Error('No access token received1111' );
        }
      } catch (error) {
        console.error('Authentication error:', error);
        setError(error.message || 'Authentication failed');
      } finally {
        setIsLoading(false);
      }
    };

    if (router.isReady) {
      handleCallback();
    }
  }, [router.isReady, router.query]);

  return (
    <Layout title="Authentication">
      <div className="d-flex align-items-center justify-content-center vh-100">
        {isLoading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="mt-2">Processing authentication...</p>
          </div>
        ) : error ? (
          <Alert variant="danger" className="text-center">
            <Alert.Heading>Authentication Error</Alert.Heading>
            <p>{error}</p>
            <hr />
            <div className="d-flex justify-content-center">
              <button 
                className="btn btn-outline-danger"
                onClick={() => router.push('/auth/login')}
              >
                Return to Login
              </button>
            </div>
          </Alert>
        ) : null}
      </div>
    </Layout>
  );
};

export default AuthCallback;