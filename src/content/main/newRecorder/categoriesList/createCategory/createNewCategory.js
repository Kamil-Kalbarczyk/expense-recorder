import { app } from "../../../../../firebase";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";

const db = getFirestore(app);

export const createNewCategory = async (userID, categoryName) => {
  const docRef = await addDoc(collection(db, "categories"), {
    category: categoryName,
    active: true,
    create_date: Timestamp.fromDate(new Date()),
    userID: userID,
  });
  //   console.log("Document written with ID: ", docRef.id);
  return {
    id: docRef.id,
    category: categoryName,
    active: true,
    create_date: Timestamp.fromDate(new Date()),
    userID: userID,
  };
};
