import { makeAutoObservable, runInAction, reaction, action } from "mobx";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../firebase";
import {
  addNewTask,
  fetchTasks,
  fetchUserTasks,
} from "../api/taskAPI";
import { TaskSchema } from "../interfaces/interfaces";
import { fetchDataById } from "../api/helper-functions/fetch-data";
export class TaskStore {
  tasks: TaskSchema[] = []; // Task state
  isLoading = false;
  userTasks: any;
  processTasks: TaskSchema[] = [];
  constructor() {
    makeAutoObservable(this);
  }
  // get
  @action async fetchTasks() {
    this.isLoading = true;
    try {
      const fetchedTasks = await fetchTasks();
      this.tasks = fetchedTasks as TaskSchema[];
    } catch (error) {
      console.error("Error fetching processes:", error);
    } finally {
      this.isLoading = false;
    }
  }
  // get
  @action async fetchTasksByProcessId(processId: string) {
    // safety first
    try {
      // fetch current tasks
      const currentTasks = (await fetchTasks()) as TaskSchema[];
      // set processTasks
      console.log(currentTasks);
      this.processTasks = [
        ...currentTasks.filter((task) => task.processId === processId),
      ];
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  }
  // Load all tasks from Firestore
  async loadTasks(processId: string) {
    // this.isLoading = true;
    try {
      const taskCollection = (await fetchDataById(
        processId,
        "tasks",
        "processId"
      )) as TaskSchema[];
      console.log("taskCollection:", taskCollection);
      runInAction(() => {
        this.tasks = taskCollection; // Update the tasks state
        this.isLoading = false;
      });
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  }
  @action async updateTaskList(processId: string) {
    console.log("process ID:", processId);
    try {
      const fetchedTasks = (await fetchDataById(
        processId,
        "tasks",
        "processId"
      )) as TaskSchema[];
      if (fetchedTasks.length === 0) {
        console.warn(`No tasks found for processId: ${processId}`);
      }
      runInAction(() => {
        if (fetchedTasks) {
          this.processTasks = [...fetchedTasks];
        }
      });
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  }
  @action async getProcessTasks(processId: string) {
    try {
      const fetchedTasks = (await fetchDataById(
        processId,
        "tasks",
        "processId"
      )) as TaskSchema[];
      if (fetchedTasks.length === 0) {
        console.warn(`No tasks found for processId: ${processId}`);
      }
      console.log("tasks found:", fetchedTasks);
      runInAction(() => {
        if (fetchedTasks) {
          this.processTasks = [...fetchedTasks];
        }
      });
    } catch (error) {}
  }
  async fetchUserTask() {
    // this.isLoading = true;
    try {
      const fetchedTasks = await fetchUserTasks();
      runInAction(() => {
        if (this.userTasks) {
          this.userTasks = fetchedTasks; // Update the tasks state
          this.isLoading = false;
        } else {
          throw new Error("Loading state undefined");
        }
      });
      // console.log(fetchedTasks, Hs1r6bSZojG9TOonX51X);
    } catch (error) {
      console.error("Error fetching user tasks:", error);
      // runInAction(() => {
      //   if (this.isLoading) {
      //     this.isLoading = false;
      //   }
      // });
    }
  }
  // Add a new task
  @action async addNewTask(taskData: TaskSchema) {
    try {
      const newTaskId = await addNewTask(taskData);
      const newTask: TaskSchema = { ...taskData, id: newTaskId }; // Assume `id` is added to the task
      runInAction(() => {
        this.tasks.push(newTask); // Add the new task to the state
      });
      // update process list
      await this.updateTaskList(newTask.processId);
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
