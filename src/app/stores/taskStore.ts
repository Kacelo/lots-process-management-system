import { makeAutoObservable, runInAction, reaction } from "mobx";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../firebase";
import {
  addNewTask,
  fetchAllProcessTasks,
  fetchUserTasks,
} from "../api/taskAPI";
import { TaskSchema } from "../interfaces/interfaces";
export class TaskStore {
  tasks: any; // Task state
  isLoading: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }

  // Load all tasks from Firestore
  async loadTasks(processId: string) {
    this.isLoading = true;
    try {
      const taskCollection = await fetchAllProcessTasks(processId);
      console.log("processes:", taskCollection);
      runInAction(() => {
        this.tasks = taskCollection; // Update the tasks state
        this.isLoading = false;
      });
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  }
  async fetchUserTask() {
    this.isLoading = true;
    try {
      const fetchedTasks = await fetchUserTasks();
      runInAction(() => {
        this.tasks = fetchedTasks; // Update the tasks state
        this.isLoading = false;
      });
    } catch (error) {
      console.error("Error fetching user tasks:", error);
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
  // Add a new task
  async addNewTask(taskData: TaskSchema) {
    try {
      const newTaskId = await addNewTask(taskData);
      const newTask: TaskSchema = { ...taskData, id: newTaskId }; // Assume `id` is added to the task
      runInAction(() => {
        this.tasks.push(newTask); // Add the new task to the state
      });
      return newTask;
    } catch (error) {
      console.error("Error adding new task:", error);
      throw error; // Re-throw to handle errors outside the store if needed
    }
  }
}

export class Task {
  id: string | null = null;
  name = "";
  description = "";
  priority = "low";
  completed = false;
  autoSave = true;
  store: TaskStore;

  constructor(
    store: TaskStore,
    id: string | null = null,
    initialData: Partial<Task> = {}
  ) {
    makeAutoObservable(this);
    this.store = store;
    this.id = id;
    this.updateFromJson(initialData);

    // Auto-save changes
    reaction(
      () => this.asJson,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (json) => {
        if (this.autoSave && this.id) {
          this.save(this.id);
        }
      }
    );
  }

  get asJson() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      priority: this.priority,
      completed: this.completed,
    };
  }

  updateFromJson(json: Partial<Task>) {
    this.autoSave = false; // Prevent a save loop during updates
    Object.assign(this, json);
    this.autoSave = true;
  }

  async save(processId: string) {
    if (!this.id) {
      console.error("Cannot save a task without an ID.");
      return;
    }
    try {
      const taskDoc = doc(firestore, `processes/${processId}/tasks`, this.id);
      await updateDoc(taskDoc, this.asJson);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  }
}
