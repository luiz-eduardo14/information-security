import { PropsWithChildren, createContext } from 'react';
import useAuth, { useAuthReturn } from '../hooks/useAuth';

export const AuthContext = createContext<useAuthReturn>({} as useAuthReturn);

export const AuthProvider = ({ children }: PropsWithChildren<object>) => {
  const {
    authenticated,
    token,
    logout,
    saveToken,
    user,
    ready,
    fetchMe
  } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        logout,
        saveToken,
        token,
        user,
        ready,
        fetchMe
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};