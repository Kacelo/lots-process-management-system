import { makeAutoObservable, runInAction } from "mobx";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../firebase";
import { createNewProcess, fetchProcesses, fetchUserTasks } from "../api/processAPI";
import { ProcessType } from "../models/processes";
import { ProcessInterface } from "../interfaces/interfaces";

class ProcessStore {
  processes: ProcessInterface[] = [];
  isLoading = false;
  focusedProcess?: ProcessInterface;

  constructor() {
    makeAutoObservable(this);
    // this.fetchProcesses();
  }

  /**
   * Fetches all processes from Firestore and sets them in the store.
   */
  async fetchProcesses() {
    this.isLoading = true;
    try {
      const fetchedProcesses = await fetchProcesses();
      const processes = fetchedProcesses.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          description: data.description,
          name: data.name,
          status: data.status,
          createdBy: data.createdBy,
          dueDate: data.dueDate.toDate().toLocaleDateString(),
        };
      });
      this.processes = processes;
    } catch (error) {
      console.error("Error fetching processes:", error);
    } finally {
      this.isLoading = false;
    }
  }
  async newProcess(processData: ProcessInterface) {
    try {
      const newProcessId = await createNewProcess(processData);
      const newProcess: ProcessInterface = { ...processData, id: newProcessId };
      runInAction(() => {
        this.processes.push(newProcess); // Add the new task to the state
      });
      return newProcessId;
    } catch (error) {
      console.error("Error adding new process:", error);
      throw error;
    }
  }
  setFocusedProcess(processId: string) {
    try {
      this.isLoading = true;

      this.focusedProcess = this.processes.find(
        (process) => process.id === processId
      );
      console.log("setting focused Process:", this.focusedProcess);
    } catch (error) {
      console.error("Error fetching processes:", error);
    } finally {
      this.isLoading = false;
    }
  }
  async userTasks(userEmail: string) {
    try {
      const tasks = await fetchUserTasks(userEmail);
    } catch (error) {}
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
