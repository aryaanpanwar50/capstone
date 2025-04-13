import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FingerprintAuth = () => {
  const [authStatus, setAuthStatus] = useState('idle');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const authenticateWithFingerprint = async () => {
    try {
      setAuthStatus('authenticating');
      setError(null);

      // Get authentication options from server
      const { data: options } = await axios.post('http://localhost:8080/finger/generate-authentication-options');

      const credential = await navigator.credentials.get({
        publicKey: {
          ...options,
          challenge: Uint8Array.from(options.challenge, c => c.charCodeAt(0)),
        }
      });

      // Convert credential for sending to server
      const authResponse = {
        id: credential.id,
        rawId: Array.from(new Uint8Array(credential.rawId)),
        response: {
          authenticatorData: Array.from(new Uint8Array(credential.response.authenticatorData)),
          clientDataJSON: Array.from(new Uint8Array(credential.response.clientDataJSON)),
          signature: Array.from(new Uint8Array(credential.response.signature)),
        },
        type: credential.type
      };

      // Verify authentication with server
      const verificationResponse = await axios.post('http://localhost:8080/finger/verify-authentication', authResponse);

      if (verificationResponse.data.verified) {
        setAuthStatus('success');
        // Navigate to home page after successful authentication
        setTimeout(() => {
          navigate('/home');
        }, 1500); // Short delay to show success message
      } else {
        throw new Error('Server verification failed');
      }
    } catch (err) {
      console.error('Authentication failed:', err);
      setError(err.message);
      setAuthStatus('error');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0b2d72] via-[#0f3b8f] to-[#0b2d72] p-4">
      <div className="bg-white/10 p-8 rounded-lg shadow-md w-full max-w-md backdrop-blur-sm border border-white/20">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Fingerprint Authentication</h2>
        
        {authStatus === 'idle' && (
          <button 
            onClick={authenticateWithFingerprint}
            className="w-full bg-[#06c1ff] text-[#0b2d72] py-3 px-4 rounded-lg hover:translate-y-[-2px] hover:shadow-lg hover:shadow-[#06c1ff]/40 transition-all duration-300 flex items-center justify-center group font-semibold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 11c1.66 0 3-1.34 3-3S13.66 5 12 5s-3 1.34-3 3 1.34 3 3 3zm0 1c-1.84 0-3.56.5-5.03 1.37-.61.36-.97 1.02-.97 1.72V16h12v-.91c0-.7-.36-1.36-.97-1.72C15.56 12.5 13.84 12 12 12zm0-8c3.31 0 6 2.69 6 6 0 1.54-.58 2.94-1.53 4H7.53C6.58 12.94 6 11.54 6 10c0-3.31 2.69-6 6-6z"/>
            </svg>
            Authenticate with Fingerprint
          </button>
        )}
        
        {authStatus === 'authenticating' && (
          <div className="text-center text-white">
            <div className="animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 11c1.66 0 3-1.34 3-3S13.66 5 12 5s-3 1.34-3 3 1.34 3 3 3zm0 1c-1.84 0-3.56.5-5.03 1.37-.61.36-.97 1.02-.97 1.72V16h12v-.91c0-.7-.36-1.36-.97-1.72C15.56 12.5 13.84 12 12 12zm0-8c3.31 0 6 2.69 6 6 0 1.54-.58 2.94-1.53 4H7.53C6.58 12.94 6 11.54 6 10c0-3.31 2.69-6 6-6z"/>
              </svg>
            </div>
            <p>Waiting for fingerprint...</p>
          </div>
        )}
        
        {authStatus === 'success' && (
          <div className="text-center text-green-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            <p className="font-semibold">Authentication successful!</p>
            <p className="text-sm mt-2">Redirecting to home...</p>
          </div>
        )}
        
        {authStatus === 'error' && (
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
            <p className="text-red-400 font-semibold mb-2">Authentication failed</p>
            <p className="text-white/80 mb-4">{error}</p>
            <button 
              onClick={authenticateWithFingerprint}
              className="bg-[#06c1ff] text-[#0b2d72] py-2 px-6 rounded-lg hover:bg-[#06c1ff]/90 transition-colors font-semibold"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FingerprintAuth;