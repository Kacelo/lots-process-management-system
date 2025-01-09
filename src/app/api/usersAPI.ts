import { auth, firestore } from "../../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

export const fetchUsers = async () => {
  const usersCollection = collection(firestore, "users");
  const querySnapshot = await getDocs(usersCollection);
  return querySnapshot;
};
