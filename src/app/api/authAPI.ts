import { auth, firestore } from "../../../firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import {
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
} from "firebase/auth";

// Function to fetch user data from Firestore
export async function fetchUserData(uid: string) {
  try {
    const userDoc = doc(firestore, "users", uid);
    const snapshot = await getDoc(userDoc);
    console.log("user snapshot", snapshot.data());
    return snapshot.exists() ? snapshot.data() : null;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}
export function fetchUserDataRealtime(
  uid: string,
  callback: (data: Record<string, unknown> | null) => void
) {
  const userDoc = doc(firestore, "users", uid);
  return onSnapshot(
    userDoc,
    (snapshot) => {
      callback(snapshot.exists() ? snapshot.data() : null);
    },
    (error) => {
      console.error("Error fetching user data in real-time:", error);
      callback(null);
    }
  );
}
// Function to handle Firebase Auth state changes
export function initAuthListener(
  onUserChanged: (
    user: FirebaseUser | null,
    userData: Record<string, unknown> | null
  ) => void,
  onLoadingChanged: (isLoading: boolean) => void
) {
  onAuthStateChanged(auth, async (firebaseUser) => {
    onLoadingChanged(true);
    try {
      if (firebaseUser) {
        const userData = await fetchUserData(firebaseUser.uid);
        console.log("running init auth:", userData);
        onUserChanged(firebaseUser, userData);
      } else {
        onUserChanged(null, null);
      }
    } catch (error) {
      console.error("Error in auth state change listener:", error);
      onUserChanged(null, null);
    }
    onLoadingChanged(false);
  });
}

export async function fetchCurrentUserData() {
  try {
    const user = auth.currentUser;
    // console.log("current user:", user);

    if (user) {
      const userDocumentRef = doc(firestore, "users", user?.uid);
      const userSnapShot = await getDoc(userDocumentRef);
      console.log("current user:", userSnapShot.data());

      if (userSnapShot.exists()) {
        console.log("current user:", userSnapShot.data());
        return userSnapShot.data();
      } else {
        console.log("error fetching user.");
      }
      // return userSnapShot.exists() ? userSnapShot.data() : null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}
export async function updateUserData() {
  try {
    console.log("this function is actually running", auth.currentUser);
    if (auth.currentUser) {
      updateProfile(auth.currentUser, {
        displayName: "Jane Q. Kacelo",
        photoURL: "https://example.com/jane-q-user/profile.jpg",
      })
        .then(() => {
          // Profile updated!
          console.log("profile updated:");
          // ...
        })
        .catch((error) => {
          // An error occurred
          // ...
        });
    }
  } catch (error) {}
}

// "4qpp3UiXo8htB6Nyu0BELvPuX352"

// Function to log the user out
export async function logOut() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
}
