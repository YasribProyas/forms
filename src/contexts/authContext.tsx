import React, { useEffect } from "react";
import { auth } from "../firebase";
import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { LoadingOverlay } from "@mantine/core";

const AuthContext = React.createContext<{
  currentUser?: User | null;
  signup?: (email: string, password: string) => Promise<UserCredential>;
}>({});

export function useAuth() {
  return React.useContext(AuthContext);
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const value = {
    currentUser,
    signup,
  };

  return (
    <AuthContext.Provider value={value}>
      <LoadingOverlay visible={loading} zIndex={1000} />
      {!loading && children}
    </AuthContext.Provider>
  );
}
