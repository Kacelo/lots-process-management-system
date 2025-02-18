import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";
import { action, makeAutoObservable, observable, toJS } from "mobx";
import { auth, firestore } from "../../../firebase";
import {
  collection,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import {
  logOut,
} from "../api/authAPI";
import { User } from "../models/users";

class SessionStore {
  currentUser: FirebaseUser | null = null;
  userData: User | null = null;
  errorMessage: string | null = null;
  isLoading = false;
  constructor() {
    makeAutoObservable(this, {
      currentUser: observable,
      userData: observable,
      isLoading: observable,
      fetchCurrentUser: action,
    });
  }
  fetchCurrentUser() {
    onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          this.isLoading = true;
          this.currentUser = user;
          const usersRef = collection(firestore, "users");
          const q = query(usersRef, where("uid", "==", user.uid as string));
          
          try {
            const querySnapshot = await getDocs(q);
          
            if (!querySnapshot.empty) {
              const fetchedUser = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                  email: data.email ?? "No email provided",
                  role: data.role ?? "contributor",
                  uid: data.uid ?? doc.id, // Ensure `uid` comes from either document data or document ID
                };
              })[0]; 
              this.userData = fetchedUser;
            } else {
              console.log("No user found with the given UID.");
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
      } catch (error) {
        console.log("error fetching user:", error);
      }finally {
        this.isLoading = false;
      }
    });
  }
  async logOut() {
    try {
      await logOut();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }
  // fetchCurrentUser() {
  //   console.log("AH1:", this);

  //   onAuthStateChanged(auth, async (user) => {
  //     try {
  //       if (user) {
  //         // console.log("AHhhh:", user);
  //         console.log("AH:", this);
  //         this.currentUser = user;

  //         this.userData = await fetchUserData(user.uid);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   });
  // }
}
export default SessionStore;
