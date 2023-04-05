import { app } from "../../../firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(app);

export const rowUpdate = async (
  projectID,
  expenseID,
  categoryID,
  value,
  userID
) => {
  const expenseIDString = expenseID.toString();
  const categoryIDString = categoryID.toString();
  const valueNumber = Number(value);
  await setDoc(doc(db, `projects/${projectID}/expenses`, expenseIDString), {
    expenses: [
      {
        category_id: categoryID,
        value: valueNumber,
        add_date: new Date(),
      },
    ],
    userID: userID,
    create_date: new Date(),
  });
};
