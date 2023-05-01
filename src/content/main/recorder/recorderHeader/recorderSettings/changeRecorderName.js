import { app } from "../../../../../firebase";
import {
  getFirestore,
  doc,
  updateDoc,
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { convertTimestampToDate } from "../../../../../common/functions";

const db = getFirestore(app);

const getProject = async (db, userID, setProjects) => {
  const q = query(
    collection(db, "projects"),
    where("userID", "==", userID),
    orderBy("create_date", "desc", limit(12))
  );

  const querySnapshot = await getDocs(q);
  setProjects(
    querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      project_id: doc.id,
      period_from: convertTimestampToDate(doc.data()?.period_from?.seconds),
      period_to: convertTimestampToDate(doc.data()?.period_to?.seconds),
    }))
  );
};

export const changeRecorderName = async (
  projectID,
  recorderNewName,
  userID,
  setProjects
) => {
  const recorderRef = doc(db, "projects", projectID);

  // Set the "project_name" field of the recorder id 'projectID'
  await updateDoc(recorderRef, {
    project_name: recorderNewName,
    modif_date: Timestamp.fromDate(new Date()),
  });

  await getProject(db, userID, setProjects);
};
