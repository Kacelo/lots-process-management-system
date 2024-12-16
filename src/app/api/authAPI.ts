import { auth, firestore } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut, onAuthStateChanged, User as FirebaseUser } from "firebase/auth";

// Function to fetch user data from Firestore
export async function fetchUserData(uid: string) {
  try {
    const userDoc = doc(firestore, "users", uid);
    const snapshot = await getDoc(userDoc);
    return snapshot.exists() ? snapshot.data() : null;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

// Function to handle Firebase Auth state changes
export function initAuthListener(
  onUserChanged: (user: FirebaseUser | null, userData: Record<string, unknown> | null) => void,
  onLoadingChanged: (isLoading: boolean) => void
) {
  onAuthStateChanged(auth, async (firebaseUser) => {
    onLoadingChanged(true);
    try {
      if (firebaseUser) {
        const userData = await fetchUserData(firebaseUser.uid);
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

// Function to log the user out
export async function logOut() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
}
