import { collection, getDocs } from "firebase/firestore";
import { auth, firestore } from "../../../firebase";
// process APi
export async function fetchAllProcesses() {
  try {
    // Ensure user is authenticated
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User is not authenticated.");
    }

    // Reference the user's "processes" subcollection
    const processesCollection = collection(
      firestore,
      `users/${user.uid}/processes`
    );
    const snapshot = await getDocs(processesCollection);

    // Map the documents to an array of data
    const processes = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return processes;
  } catch (error) {
    console.error("Error fetching processes:", error);
    throw error;
  }
}

export async function fetchProcesses() {
  try {
    const processesCollection = collection(firestore, "processes");

    const querySnapshot = await getDocs(processesCollection);
    const processes = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return processes;
  } catch (error) {
    console.error("Error fetching processes:", error);
    throw error;
  }
}
