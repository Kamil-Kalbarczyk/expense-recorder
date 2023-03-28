import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { app } from "../../firebase";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";

const db = getFirestore(app);

export const CheckProjectExists = () => {
  const isAuthorization = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const userID = isAuthorization.authorization.uid;
  const getProject = async () => {
    const q = query(
      collection(db, "projects"),
      where("userID", "==", userID),
      orderBy("create_date")
    );

    const querySnapshot = await getDocs(q);
    setProjects(
      querySnapshot.docs.map((doc) => ({ ...doc.data(), project_id: doc.id }))
    );
    // querySnapshot.forEach((doc) => {
    //   console.log({ ...doc.data(), project_id: doc.id });
    // });
  };
  useEffect(() => {
    getProject();
  }, []);

  return null;
};
