import { app } from "../../../firebase";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";

const db = getFirestore(app);

export const createNewRecorder = async (
  userID,
  projectName,
  activeCategoryIds
) => {
  const docRef = await addDoc(collection(db, "projects"), {
    project_name: projectName,
    create_date: Timestamp.fromDate(new Date()),
    userID: userID,
    period_from: Timestamp.fromDate(new Date()),
    period_to: Timestamp.fromDate(new Date("2023-12-31")),
    categories: activeCategoryIds,
  });
  //   console.log("Document written with ID: ", docRef.id);
  return {
    id: docRef.id,
    project_name: projectName,
    create_date: Timestamp.fromDate(new Date()),
    userID: userID,
    period_from: Timestamp.fromDate(new Date()),
    period_to: Timestamp.fromDate(new Date("2023-12-31")),
    categories: activeCategoryIds,
  };
};
