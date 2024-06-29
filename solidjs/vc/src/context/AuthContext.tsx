// Import necessary functions from SolidJS
import { createContext, useContext, createSignal } from 'solid-js';

// Step 1: Define the Authentication Context
const AuthContext = createContext();

// Step 2: Create a Provider Component
function AuthProvider(props:any) {
  // Create a signal for authentication state
  const [isAuthenticated, setIsAuthenticated] = createSignal(false);

  // Provide the state and updater function to children
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {props.children}
    </AuthContext.Provider>
  );
}

// Helper hook to use the auth context
function useAuth() {
  return useContext(AuthContext);
}

// Export the provider and the hook
export { AuthProvider, useAuth };