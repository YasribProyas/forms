import React, { useEffect } from "react";
import { auth } from "../firebase";
import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateEmail,
} from "firebase/auth";
import { LoadingOverlay } from "@mantine/core";

const AuthContext = React.createContext<{
  currentUser?: User | null;
  signup?: (email: string, password: string) => Promise<UserCredential>;
  signin?: (email: string, password: string) => Promise<UserCredential>;
  changeEmail?: (newEmail: string) => Promise<void>;
  resetPassword?: (email: string) => Promise<void>;
  logout?: () => Promise<void>;
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

  function signin(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function changeEmail(newEmail: string) {
    return updateEmail(auth.currentUser!, newEmail);
  }
  // function changeName(newEmail: string) {
  //   return updateEmail(auth.currentUser!, newEmail);
  // }

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  // function updateEmail(email: string) {
  //   return update
  // }

  const value = {
    currentUser,
    signup,
    signin,
    logout,
    changeEmail,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      <LoadingOverlay visible={loading} zIndex={1000} />
      {!loading && children}
    </AuthContext.Provider>
  );
}
