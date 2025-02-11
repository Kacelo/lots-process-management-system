import { makeAutoObservable, runInAction } from "mobx";
import {
  createNewProcess,
  fetchProcesses,
  fetchUserTasks,
} from "../api/processAPI";
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
      const fetchedProcesses = await fetchProcesses() as ProcessInterface[];
      console.log(fetchedProcesses);
      const formatedProcesses = fetchedProcesses?.map((process) => {
        return {
          id: process.id,
          description: process.description,
          name: process.name,
          status: process.status,
          createdBy: process.createdBy,
          dueDate: process.dueDate?.toDate().toLocaleDateString(),
        };
      })
      this.processes = formatedProcesses as ProcessInterface[]
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
    console.log("focused");

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
