import { action, makeAutoObservable } from "mobx";
import { User as FirebaseUser } from "firebase/auth";
import { fetchUserData, initAuthListener, logOut } from "../api/authAPI";

class AuthStore {
  user: FirebaseUser | null = null;
  userData: Record<string, unknown> | null = null;
  isLoading = false;

  // constructor() {
  //   makeAutoObservable(this);
  //   this.initAuthListener();
  // }
  // fetchUserData () {
  //   fetchUserData((uid)=>{
      
  //   })
  // }
  // initAuthListener() {
  //   initAuthListener(
  //     (firebaseUser, userData) => {
  //       this.user = firebaseUser;
  //       this.userData = userData;
  //     },
  //     (isLoading) => {
  //       this.isLoading = isLoading;
  //     }
  //   );
  // }
  async logOut() {
    try {
      await logOut();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }
}

export default AuthStore;
