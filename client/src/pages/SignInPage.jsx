import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgm48NDdkmQg1G8JUgMgs0EyvBDgxT79o",
  authDomain: "plantify-3b3a9.firebaseapp.com",
  projectId: "plantify-3b3a9",
  storageBucket: "plantify-3b3a9.firebasestorage.app",
  messagingSenderId: "267170335326",
  appId: "1:267170335326:web:d80e2649e4f88703f102cf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Sign in</h1>
        <p style={styles.subtitle}>Welcome back! Please sign in to your account.</p>
        <button style={styles.googleButton} onClick={handleGoogleSignIn}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google logo" style={styles.googleIcon} />
          Continue with Google
        </button>
        <div style={styles.separator}>OR</div>
        <form onSubmit={handleEmailSignIn} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <div style={styles.footer}>
            <a href="/forgot-password" style={styles.link}>Forgot Password?</a>
          </div>
          <div style={{ position: 'relative', height: '100px', width: '100%' }}>
    <form>
        <button 
            type="submit" 
            style={styles.signInButton}>
            Sign in
        </button>
    </form>
</div>


        </form>
        {error && <p style={styles.error}>{error}</p>}
        <p style={styles.signupText}>
          Don't have an account? <a href="/signup" style={styles.link}>Sign up</a>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f9',
    fontFamily: 'Inter, sans-serif',
  },
  card: {
    width: '400px',
    padding: '2rem',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#333',
  },
  subtitle: {
    fontSize: '1rem',
    marginBottom: '1.5rem',
    color: '#555',
  },
  googleButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '0.8rem',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '1.5rem',
    fontSize: '1rem',
    color: '#555',
  },
  googleIcon: {
    width: '20px',
    marginRight: '10px',
  },
  separator: {
    margin: '1rem 0',
    color: '#aaa',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '0.75rem',
    marginBottom: '1rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1rem',
    color: '#333',
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    fontSize: '0.9rem',
    color: '#555',
    marginBottom: '1rem',
  },
  link: {
    color: '#007BFF',
    textDecoration: 'none',
    fontWeight: '500',
  },
  signInButton: {
    padding: '15px',
    backgroundColor: '#4DB30B', // Updated background color
    color: '#fff',
    border: 'none',
    borderRadius: '50px', // Updated border radius
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    display: 'inline-flex', // Added display for layout
    justifyContent: 'center', // Added justify content for alignment
    alignItems: 'center', // Added align items for vertical alignment
    gap: '10px', // Added gap for spacing between elements
  },
  error: {
    marginTop: '1rem',
    color: 'red',
    fontSize: '0.9rem',
  },
  signupText: {
    marginTop: '1.5rem',
    fontSize: '0.9rem',
    color: '#555',
  },
};

export default SignIn; 