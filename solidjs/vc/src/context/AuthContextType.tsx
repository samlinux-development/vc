
import { Identity } from '@dfinity/agent'; 

export interface AuthContextType {
  isAuthenticated: () => boolean;
  setIsAuthenticated: (authStatus: boolean) => void;
  clientIdentity: () => Identity | undefined;
  setClientIdentity: (clientPrincipal: Identity | undefined) => void;
}