'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import firebase_app from '@/firebase/config';
import Nav from '@/app/components/navBar';

// Initialize the Firebase auth
const auth = getAuth(firebase_app);

// Create the context for auth with a default value
export const AuthContext = createContext({});

// Custom hook to use the auth context
export const useAuthContext = () => useContext(AuthContext);

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);

  const videoStyle = {
    position: 'fixed', // Use fixed or absolute depending on your use case
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: -6, // Ensures the video stays in the background
  };
  useEffect(() => {
    // Subscribe to the auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Set the user or null if not logged in
    });

    // Clean up the subscription on unmount
    return () => {
      unsubscribe();
    };
  }, []); // Empty dependency array means this effect runs once on mount and then on unmount

  return (
    <AuthContext.Provider value={{ user }}>
      <Nav />

          <video autoPlay loop muted style={videoStyle}>
            <source
              src="https://elovera.my.canva.site/your-paragraph-text/videos/fb6e4467e7053efb0979ec228db7d7e1.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
      {children}
    </AuthContext.Provider>
  );
}
