import { makeAutoObservable } from "mobx";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../firebase";
import { fetchProcesses } from "../api/processAPI";
import { ProcessType } from "../models/processes";

class ProcessStore {
  processes: ProcessType[] = [];
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
      const fetchedProcesses = await fetchProcesses()
      const processes = fetchedProcesses.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          assignee: data.assignee,
          description: data.description,
          name: data.name,
          status: data.status,
        }
      });
      this.processes = processes;
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
  // getProcessesByKey(key: string, value: unknown) {
  //   return this.processes.filter((process) => process[key] === value);
  // }
}

export default ProcessStore;
