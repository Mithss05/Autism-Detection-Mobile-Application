import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../services/firebase"; // Ensure Firebase is initialized properly

// Sign in function
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Signed in successfully:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Sign-in error:", error.code, error.message);
    throw error;
  }
};

// Sign up function
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Account created successfully:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Sign-up error:", error.code, error.message);
    throw error;
  }
};

// Sign out function
export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Sign-out error:", error.code, error.message);
    throw error;
  }
};
