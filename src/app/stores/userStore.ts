import { action, makeAutoObservable } from "mobx";
import { User as FirebaseUser } from "firebase/auth";
import {
  fetchUserData,
  initAuthListener,
  logOut,
  updateUserData,
} from "../api/authAPI";

class AuthStore {
  user: FirebaseUser | null = null;
  userData: Record<string, unknown> | null = null;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
    // this.initAuthListener();
  }
  @action fetchUserData() {
    if (this.user?.uid) {
      // Ensure that a user is logged in and has a UID
      fetchUserData(this.user.uid)
        .then((userData) => {
          this.userData = userData; // Update the store with the fetched user data
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else {
      console.error("User UID is not available.");
    }
  }
  @action updateCurrentUserData() {
    try {
      // if (this.user) {
        updateUserData()
  
      // }
    } catch (error) {
      console.log("an error occured:", error);
    }
  }
  @action initAuthListener() {
    initAuthListener(
      (firebaseUser, userData) => {
        this.user = firebaseUser;
        this.userData = userData;
      },
      (isLoading) => {
        this.isLoading = isLoading;
      }
    );
  }
  async logOut() {
    try {
      await logOut();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }
}

export default AuthStore;
