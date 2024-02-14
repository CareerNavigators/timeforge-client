/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState, ReactNode } from "react";
import {
  GoogleAuthProvider,
  UserCredential,
  User,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../Firebase/firebase.config";
import AxiosSecure from "../Hook/useAxios";

type AuthContextType = {
  user: User | null;
  createUser: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  googleSignIn: () => Promise<UserCredential>;
  handleUpdateProfile: (name: any, imageLink: any) => Promise<void>;
  userData: object | null;
  setUserData: any;
};

export const AuthContext = createContext<any>(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const caxios = AxiosSecure();

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const createUser = (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const handleUpdateProfile = (name: any, imageLink: any): Promise<void> => {
    return updateProfile(auth.currentUser!, {
      displayName: name,
      photoURL: imageLink,
    });
  };

  const logOut = async (): Promise<void> => {
    setLoading(true);
    await signOut(auth);
    setUserData(null);
  };

  const signIn = (email: string, password: string): Promise<UserCredential> => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        if (currentUser && currentUser.email) {
          setUser(currentUser);
          caxios.get(`/user?email=${currentUser.email}`).then((res) => {
            setUserData(res.data);
            setLoading(false);
          });
        } else {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Auth state change error:", error.message);
        setLoading(false);
      }
    );

    return () => {
      unSubscribe(); 
    };
  }, []);

  const authInfo: AuthContextType = {
    user,
    createUser,
    logOut,
    signIn,
    loading,
    setLoading,
    googleSignIn,
    handleUpdateProfile,
    userData,
    setUserData,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
