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
      {children}
    </AuthContext.Provider>
  );
}
