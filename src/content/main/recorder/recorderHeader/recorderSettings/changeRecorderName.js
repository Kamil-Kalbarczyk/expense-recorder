import { app } from "../../../../../firebase";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const db = getFirestore(app);

export const changeRecorderName = async (projectID, recorderNewName) => {
  const recorderRef = doc(db, "projects", projectID);

  // Set the "project_name" field of the recorder id 'projectID'
  await updateDoc(recorderRef, {
    project_name: recorderNewName,
  });
};
