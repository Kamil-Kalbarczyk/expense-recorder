import { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "../auth/AuthContext";
import { app } from "../../firebase";
import {
  getFirestore,
  collection,
  //   addDoc,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";

const db = getFirestore(app);

export const ProjectsContext = createContext(null);

export const ProjectsContextProvider = ({ children }) => {
  const isAuthorization = useContext(AuthContext);
  const [projects, setProjects] = useState(null);
  const userID = isAuthorization.authorization.uid;

  const convertTimestampToDate = (timestamp) =>
    new Date(timestamp * 1000).toISOString().slice(0, 10).replace("T", " ");

  const getProject = async () => {
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

    console.log(
      querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        project_id: doc.id,
        period_from: convertTimestampToDate(doc.data()?.period_from?.seconds),
        period_to: convertTimestampToDate(doc.data()?.period_to?.seconds),
      }))
    );
  };
  useEffect(() => {
    getProject();
  }, [userID]);

  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};
