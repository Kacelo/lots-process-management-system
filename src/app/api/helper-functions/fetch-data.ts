import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../../../firebase";
import { ProcessInterface, TaskSchema } from "@/app/interfaces/interfaces";
import { ProcessType } from "@/app/models/processes";

export async function fetchData(
  collectionName: string
): Promise<TaskSchema[] | ProcessInterface[]> {
  try {
    const returnedCollection = collection(firestore, collectionName);
    const querySnapshot = await getDocs(returnedCollection);

    let documents: TaskSchema[] | ProcessInterface[] = [];

    switch (collectionName) {
      case "tasks":
        documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<TaskSchema, "id">),
        }));
        break;
      case "processes":
        documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<ProcessInterface, "id">),
        }));
        break;
      default:
        console.warn(`Unknown collection: ${collectionName}`);
        return [];
    }
    return documents;
  } catch (error) {
    console.error("Error fetching processes:", error);
    throw error;
  }
}

export async function fetchDataById(
  itemId: string,
  collectionName: string,
  searchItem: string
): Promise<TaskSchema[] | ProcessInterface[]> {
  try {
    if (!searchItem) {
      throw new Error("searchItem cannot be empty");
    }
    const returnedCollection = collection(firestore, collectionName);
    const querySnapshot = await getDocs(
      query(returnedCollection, where(searchItem, "==", itemId))
    );
    let documents: TaskSchema[] | ProcessInterface[] = [];
    switch (collectionName) {
      case "tasks":
        documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<TaskSchema, "id">),
        }));
        break;
      case "processes":
        documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<ProcessInterface, "id">),
        }));
        break;
      default:
        console.warn(`Unknown collection: ${collectionName}`);
        return [];
    }
    return documents;
  } catch (error) {
    console.error("Error fetching processes:", error);
    throw error;
  }
}
