import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, firestore } from "../../../firebase";
import { ProcessInterface } from "../interfaces/interfaces";
import { ProcessType } from "../models/processes";
import { fetchData } from "./helper-functions/fetch-data";
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
    const processes = await fetchData("processes");
    return processes;
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
      name: processData.name,
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
export async function fetchUserTasks(userEmail: string) {
  try {
    if (!userEmail) {
      throw new Error("User Email is not provided");
    }
    const processCollection = collection(firestore, "processes");
    const querySnapshot = await getDocs(
      query(processCollection, where("assignee", "==", userEmail))
    );
    const processList: ProcessType[] = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Document ID as a unique key
      ...(doc.data() as Omit<ProcessType, "id">),
    }));
    return processList;
  } catch (error) {
    console.error("Errort fetching user tasks", error);
  }
}
