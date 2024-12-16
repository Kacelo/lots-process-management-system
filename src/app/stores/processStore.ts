import { action, makeAutoObservable } from "mobx";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../firebase";

class ProcessStore {
  processes: Record<string, unknown>[] = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
    this.fetchProcesses(); 
  }

  /**
   * Fetches all processes from Firestore and sets them in the store.
   */
  async fetchProcesses() {
    this.isLoading = true;
    try {
      const processCollection = collection(firestore, "processes");
      const querySnapshot = await getDocs(processCollection);

      this.processes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Fetched processes:", this.processes);
    } catch (error) {
      console.error("Error fetching processes:", error);
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Filters processes by a specific criterion (e.g., assignee or status).
   * @param key - The key to filter by (e.g., "assignee").
   * @param value - The value to match (e.g., a user's email).
   * @returns Filtered processes.
   */
  getProcessesByKey(key: string, value: unknown) {
    return this.processes.filter((process) => process[key] === value);
  }
}

export default ProcessStore;
