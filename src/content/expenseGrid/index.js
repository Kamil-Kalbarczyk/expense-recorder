import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { app } from "../../firebase";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { convertTimestampToDate } from "../../common/functions";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const db = getFirestore(app);

export const GridExpenses = () => {
  const { projectID } = useParams();
  const [dataGrid, setDataGrid] = useState([]);

  // =============== Fetching data start ===============
  const getDataGridQuery = query(
    collection(db, "expenses_rows"),
    where("project_id", "==", projectID),
    orderBy("create_date", "asc")
  );

  const getDataGridFromFirestore = async () => {
    const querySnapshot = await getDocs(getDataGridQuery);
    const dataFromFirestore = [];
    querySnapshot.forEach((doc) => {
      dataFromFirestore.push({
        id: doc.id,
        ...doc.data(),
        create_date: convertTimestampToDate(doc.data()?.create_date?.seconds),
      });
    });

    // set data for grid
    setDataGrid(dataFromFirestore);
  };

  useEffect(() => {
    getDataGridFromFirestore();
  }, [projectID]);

  // =============== Fetching data end ===============

  // =============== Building grid start ===============
  const allCategories = dataGrid.map((data) => Object.keys(data.expenses));
  const categoriesTogether = ["id"];
  allCategories.forEach((categoryArray) => {
    categoryArray.forEach((singleCategory) => {
      categoriesTogether.push(singleCategory);
    });
  });
  const categories = [...new Set(categoriesTogether)];

  const columns = categories.map((column) => {
    if (column === "id") {
      return {
        field: column,
        headerName: column,
        width: 150,
        // description: "This column has a value getter and is not sortable.",
      };
    } else {
      return {
        field: column,
        headerName: column,
        width: 150,
        editable: true,
      };
    }
  });

  const rows = dataGrid.map((row) => {
    return {
      id: row.id,
      ...row.expenses,
    };
  });
  // =============== Building grid end ===============
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
};
