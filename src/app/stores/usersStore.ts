import { action, makeObservable, observable } from "mobx";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../firebase";
import { User } from "../models/users";
import { fetchUsers } from "../api/usersAPI";

class UserStore {
  users: User[] = [];
  title: string | undefined;
  isLoading = false;

  constructor() {
    makeObservable(this, {
      users: observable,
      isLoading: observable,
      fetchUsers: action,
    });
  }
  get totalUsers() {
    return this.users.length;
  }
  fetchUsers = async () => {
    try {
      // start loading
      this.isLoading = true;
      const querySnapshot = await fetchUsers();
      //   add users to users array
      const fetchedUsers: User[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          email: data.email ?? "No email provided",
          role: data.role ?? "contributor",
          uid: doc.id,
        };
      });
      this.users = fetchedUsers;
    } catch (error) {
      console.log("error:", error);
    } finally {
      this.isLoading = false;
    }
  };
}

export default UserStore;
// 