import { app } from "../../../../firebase";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";

const db = getFirestore(app);

export const fetchCategories = async (userID) => {
  const categories = [];
  const q = query(
    collection(db, "categories"),
    where("userID", "==", userID),
    orderBy("create_date", "asc")
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    categories.push({
      id: doc.id,
      ...doc.data(),
    });
    // console.log(doc.id, " => ", doc.data());
  });
  //   console.log(categories);
  return categories;
};
