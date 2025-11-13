import React, { createContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from "firebase/auth";
import { app } from '../firebase/firebase.init';

export const AuthContext = createContext();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);      // Firebase user
  const [dbUser, setDbUser] = useState(null);  // MongoDB user
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(false);

  // Firebase Auth methods
  const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const signInUser = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const logOut = () => {
    setLoading(true);
    setDbUser(null); // Clear MongoDB user on logout
    return signOut(auth);
  };
  const forgotPassword = (email) => sendPasswordResetEmail(auth, email);

  // Update Firebase profile
  const updateUserProfile = (profile) => {
    if (user) return updateProfile(user, profile);
    return Promise.reject("No user logged in");
  };

  // Fetch MongoDB user info by email
  const fetchDbUser = async (email) => {
    if (!email) return;
    try {
      const res = await fetch(`https://finease-server-c7jy.onrender.com/users?email=${email}`);
      const data = await res.json();
      if (data.length > 0) setDbUser(data[0]);
    } catch (err) {
      console.error("Error fetching DB user:", err);
    }
  };

  // Listen to Firebase auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        fetchDbUser(currentUser.email); // Load MongoDB user on login
      } else {
        setDbUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authData = {
    user,
    dbUser,
    setUser,
    setDbUser,
    loading,
    createUser,
    signInUser,
    signInWithGoogle,
    logOut,
    forgotPassword,
    updateUserProfile,
    dark,
    setDark,
  };

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;