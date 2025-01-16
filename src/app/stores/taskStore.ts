import { makeAutoObservable, runInAction, reaction } from "mobx";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../firebase";
import { fetchUserTasks } from "../api/taskAPI";
export class TaskStore {
  tasks: Task[] = []; // Explicitly define the type of the array
  isLoading = true;

  constructor() {
    makeAutoObservable(this);
    // this.fetchUserTasks();
    // this.loadTasks();
  }

  // Load all tasks from Firestore
  async loadTasks(processId: string) {
    this.isLoading = true;
    try {
      const taskCollection = collection(
        firestore,
        `processes/${processId}/tasks`
      );
      const snapshot = await getDocs(taskCollection);
      runInAction(() => {
        this.tasks = snapshot.docs.map(
          (doc) => new Task(this, doc.id, doc.data())
        );
        this.isLoading = false;
      });
    } catch (error) {
      console.error("Error loading tasks:", error);
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
  async fetchUserTask() {
    this.isLoading = true;
    try {
      const fetchedTasks = await fetchUserTasks();
      return fetchedTasks;
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }
  // Add a new task
  async addTask(processId: string, taskData: Partial<Task>) {
    const newTask = new Task(this);
    newTask.updateFromJson(taskData);
    runInAction(() => {
      this.tasks.push(newTask); // Ensure the array accepts Task objects
    });
    await newTask.save(processId);
    return newTask;
  }

  // Remove a task
  //   async removeTask(processId: string, task: Task) {
  //     try {
  //       await deleteDoc(doc(firestore, `processes/${processId}/tasks`, task.id));
  //       runInAction(() => {
  //         this.tasks = this.tasks.filter((t) => t.id !== task.id);
  //       });
  //     } catch (error) {
  //       console.error("Error removing task:", error);
  //     }
  //   }
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
