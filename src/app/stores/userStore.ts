import React from "react";
import { makeAutoObservable } from "mobx";
import { auth, firestore } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";

class AuthStore {
  user: FirebaseUser | null = null;
  userData: Record<string, any> | null = null;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
    this.initAuthListener();
  }

  // listen for firebase auth state changes
  initAuthListener() {
    onAuthStateChanged(auth, async (firebaseUser) => {
      this.isLoading = true;
      if (firebaseUser) {
        this.user = firebaseUser;
        this.userData = await this.fetchUserData(firebaseUser.uid);
        this.isLoading = false;

        console.log("user fetched:", this.userData);
      } else {
        this.user = null;
        this.userData = null;
      }

      this.isLoading = false;
      console.log("isLoading fetched:", this.isLoading);
    });
  }

  async fetchUserData(uid: string) {
    const userDoc = doc(firestore, "users", uid);
    const snapshot = await getDoc(userDoc);
    return snapshot.exists() ? snapshot.data() : null;
  }

  //   log the user out
  async logOut() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error with logging out: ", error);
    }
  }
}
export const authStore = new AuthStore();
