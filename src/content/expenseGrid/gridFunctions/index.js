import { app } from "../../../firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(app);

export const rowUpdate = async (projectID, newRow, userID) => {
  const expenseID = newRow.id.toString();
  const expenses = Object.entries(newRow)
    .filter((data) => data[0] !== "id")
    .map((row) => {
      return {
        category_id: row[0],
        value: Number(row[1]),
      };
    });
  // console.log("expenseID: ", expenseID, " => ", expenses);
  // console.log(expenses);
  await setDoc(doc(db, `projects/${projectID}/expenses`, expenseID), {
    expenses: expenses,
    userID: userID,
    create_date: new Date(),
  });
};
