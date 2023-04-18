import { app } from "../../../../firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(app);

export const updateActiveCategory = async (categoryDoc) => {
  const { id, active, category, create_date, userID } = categoryDoc;
  await setDoc(doc(db, "categories", id), {
    active,
    category,
    create_date,
    userID,
  });
};
