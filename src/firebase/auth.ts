import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
//   sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase";

export const doCreateUsersWithEmailANdPassword = async (
  email: string,
  password: string
) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};
export const doSignInWithEmailANdPassword = (
  email: string,
  password: string
) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSigninWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result;
};

export const doSignOut = () => {
  return auth.signOut;
};

// export const doSendEmailVeriifcation = () => {
//   return sendEmailVerification(auth.currentUser, {
//     uri: `${window.location.origin}/home`,
//   });
// };
