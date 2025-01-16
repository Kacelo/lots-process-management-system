import { addDoc, collection, getDocs } from "firebase/firestore";
import { auth, firestore } from "../../../firebase";
import { ProcessInterface } from "../interfaces/interfaces";
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
   
    return querySnapshot;
  } catch (error) {
    console.error("Error fetching processes:", error);
    throw error;
  }
}

export async function createNewProcess(processData: ProcessInterface) {  
  try {
    if (!processData) {
        throw new Error("Task data not provided");
      }
      if (!processData.name || !processData.description || !processData.status) {
        throw new Error("Missing required fields in task data");
      }

      const docRef = await addDoc(collection(firestore, "processes"), {
        name: processData.name ,
        description: processData.description,
        status: processData.status,
        createdBy: processData.createdBy,
        dueDate: processData.dueDate,
      });
      console.log("Task successfully created with ID:", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error adding new task:", error);
      throw new Error("Failed to add new task");
    }
}
