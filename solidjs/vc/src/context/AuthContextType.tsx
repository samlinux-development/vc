export interface AuthContextType {
  isAuthenticated: () => boolean;
  setIsAuthenticated: (authStatus: boolean) => void;
}