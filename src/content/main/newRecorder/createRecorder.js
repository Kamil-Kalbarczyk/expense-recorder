import { app } from "../../../firebase";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";

import { convertTimestampToDate } from "../../../common/functions";

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

export const createNewRecorder = async (
  userID,
  projectName,
  activeCategoryIds,
  setProjects
) => {
  const docRef = await addDoc(collection(db, "projects"), {
    project_name: projectName,
    create_date: Timestamp.fromDate(new Date()),
    userID: userID,
    period_from: Timestamp.fromDate(new Date()),
    period_to: Timestamp.fromDate(new Date("2023-12-31")),
    categories: activeCategoryIds,
  });

  // Update context state of recorders (projects) -----------
  await getProject(db, userID, setProjects);

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
