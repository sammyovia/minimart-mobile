import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types'; // Adjust path if needed
import { router } from 'expo-router'; // For redirection

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isLoadingAuth: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  // Simulate initial auth check (e.g., check AsyncStorage for token)
  useEffect(() => {
    const checkAuth = async () => {
      // In a real app, you'd fetch user from AsyncStorage or validate a stored token
      // For now, simulating no user on initial load
      // const storedUser = await AsyncStorage.getItem('user');
      // if (storedUser) {
      //   setUser(JSON.parse(storedUser));
      // }
      setIsLoadingAuth(false);
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoadingAuth(true);
    try {
      // --- API CALL FOR LOGIN ---
      // Replace with your actual Django authentication endpoint
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        // Handle specific login errors (e.g., invalid credentials)
        setIsLoadingAuth(false);
        return false;
      }

      const data = await response.json();
      // Assuming your backend returns user data including role and a token
      // Example response: { token: '...', user: { id: 1, username: 'test', email: 'test@example.com', role: 'customer' } }
      const loggedInUser: User = {
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
        role: data.user.role as UserRole, // Cast to UserRole
      };

      setUser(loggedInUser);
      // await AsyncStorage.setItem('user', JSON.stringify(loggedInUser)); // Store user data
      // await AsyncStorage.setItem('token', data.token); // Store auth token
      setIsLoadingAuth(false);
      return true;
    } catch (error) {
      console.error('Network error during login:', error);
      setIsLoadingAuth(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    // await AsyncStorage.removeItem('user');
    // await AsyncStorage.removeItem('token');
    router.replace('/login'); // Redirect to login after logout
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, isLoadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};