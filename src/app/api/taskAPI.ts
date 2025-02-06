import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, firestore } from "../../../firebase";
import { TaskSchema } from "../interfaces/interfaces";
import { fetchData } from "./helper-functions/fetch-data";

export async function fetchTasks() {
  try {
    const tasks = await fetchData("tasks");
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks");
  }
}

export async function fetchUserTasks() {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("User is unauthenticated");
    }
    // const taskCollection = collection(firestore, `tasks/${}`)
    const taskQuery = query(
      collection(firestore, "tasks"),
      where("assigneeId", "==", currentUser.uid)
    );
    const querySnapshot = await getDocs(taskQuery);
    const tasks = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(tasks);
    return tasks;
  } catch (error) {
    console.error("Error fetching user tasks:", error);
    throw new Error("Failed to fetch user tasks");
  }
}
export async function fetchAllProcessTasks(processId: string) {
  console.log("lets see the ID", processId);
  try {
    if (!processId) {
      throw new Error("processId is unauthenticated");
    }
    // const taskCollection = collection(firestore, `tasks/${}`)
    console.log("lets see the ID", processId);
    const taskCollection = collection(firestore, "tasks");
    const querySnapshot = await getDocs(
      query(taskCollection, where("processId", "==", processId))
    );
    // const querySnapshot = await getDocs(taskQuery);
    const tasks: TaskSchema[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<TaskSchema, "id">),
    }));
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks for process:", error);
    throw new Error("Failed to fetch tasks for the process");
  }
}

export async function addNewTask(taskData: TaskSchema) {
  console.log("received task data", taskData);
  try {
    if (!taskData) {
      throw new Error("Task data not provided");
    }
    if (!taskData.taskname || !taskData.processId || !taskData.status) {
      throw new Error("Missing required fields in task data");
    }

    const docRef = await addDoc(collection(firestore, "tasks"), {
      taskname: taskData.taskname,
      description: taskData.description,
      processId: taskData.processId,
      status: taskData.status,
      assigneeId: taskData.assigneeId,
      createdBy: taskData.createdBy,
      dueDate: taskData.dueDate,
      completedAt: taskData.completedAt ?? null,
      isArchived: taskData.isArchived ?? null,
      taskIndex: taskData.taskIndex ?? null,
    });
    console.log("Task successfully created with ID:", docRef.id);

    return docRef.id;
  } catch (error) {
    console.error("Error adding new task:", error);
    throw new Error("Failed to add new task");
  }
}
