'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  User,
} from 'firebase/auth';


import { FirebaseError } from 'firebase/app';

import { toast } from 'react-toastify';

import Cookie from "js-cookie";
import { auth } from '@/services/firebase';
import { redirect, useRouter } from 'next/navigation';

interface AuthContextProps {
  userLogged: boolean;
  setUserLogged: any;
  loading: boolean;
  user: User | null;
  signIn: (email: string, password: string) => void;
  signOutUser: () => void;
  resetPassword: (email: string) => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
};

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(false);
  const [userLogged, setUserLogged] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState("")

  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      user?.getIdToken(true).then(idToken => {
        Cookie.set("auth-cookie", idToken);
        setToken(idToken)
      })

      setUser(user);

      if (user) {
        setUserLogged(true);
        ;
      };
    });
  }, []);

  async function signIn(email: string, password: string) {
    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      setUserLogged(true);
    } catch (error) {
      setLoading(false);
      setUser(null);
      setUserLogged(false);

      const errorCode = error as FirebaseError;

      if (errorCode.code === "auth/invalid-login-credentials") {
        toast.error("Senha ou e-mail não conferem.");
        return;
      }

      if (errorCode.code === "auth/user-not-found") {
        toast.error("E-mail não confere. Tente novamente.");
        return;
      }

      if (errorCode.code === "auth/wrong-password") {
        toast.error("Senha não confere. Tente novamente.");
        return;
      }
    } finally {
      setLoading(false);
    }
  }

  async function signOutUser() {
    try {
      signOut(auth);
      setUser(null);
      setUserLogged(false);
      Cookie.remove("auth-cookie");
    } catch (error) {
      toast.error("Houve um erro. Entre em contato com o administrador.");
    }
  }

  async function resetPassword(email: string) {
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      toast.success("Você recebeu um e-mail para redefinir senha. Verifique sua caixa de entrada ou Spam.");
    } catch {
      toast.error("Houve um erro. Entre em contato com o administrador.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{
      userLogged,
      setUserLogged,
      loading,
      user,
      signIn,
      signOutUser,
      resetPassword,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}