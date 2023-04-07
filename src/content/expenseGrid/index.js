import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/auth/AuthContext";
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
import {
  DataGrid,
  GridCellParams,
  GridCellEditStopReasons,
} from "@mui/x-data-grid";

import { rowUpdate } from "./gridFunctions";

const db = getFirestore(app);

export const GridExpenses = () => {
  const isAuthorization = useContext(AuthContext);
  const userID = isAuthorization.authorization.uid;
  const { projectID } = useParams();
  const [dataGrid, setDataGrid] = useState([]);
  const [columnsGrid, setColumnsGrid] = useState([]);
  const [loading, setLoading] = useState(true);

  // =============== Fetching data start ===============

  // columns
  const getColumnsGridQuery = query(
    collection(db, "categories"),
    where("userID", "==", userID),
    where("projects", "array-contains", projectID),
    orderBy("create_date", "asc")
  );

  const getColumnsGridFromFirestore = async () => {
    const querySnapshot = await getDocs(getColumnsGridQuery);
    const columnsFromFirestore = [];
    querySnapshot.forEach((doc) => {
      columnsFromFirestore.push({
        id: doc.id,
        ...doc.data(),
        create_date: convertTimestampToDate(doc.data()?.create_date?.seconds),
      });
    });
    // set columns for grid
    setColumnsGrid(
      columnsFromFirestore.map((item) => ({
        id: item.id,
        category: item.category,
      }))
    );
  };

  // rows
  const getRowsGridQuery = query(
    collection(db, `projects/${projectID}/expenses`),
    where("userID", "==", userID)
    // ,orderBy("create_date", "asc")
  );

  const getDataGridFromFirestore = async () => {
    const querySnapshot = await getDocs(getRowsGridQuery);
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

    // loading progress turn off
    setLoading(false);
  };

  const fetchDataFromFirestore = async () => {
    await getColumnsGridFromFirestore();
    await getDataGridFromFirestore();
  };

  useEffect(() => {
    fetchDataFromFirestore();
  }, [projectID]);

  // =============== Fetching data end ===============

  // =============== Building grid start ===============
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
      // hidden: true,
      // description: "This column has a value getter and is not sortable.",
    },
  ];

  columnsGrid.forEach((column) => {
    columns.push({
      field: column.id,
      headerName: column.category,
      width: 150,
      editable: true,
    });
  });

  // rows
  const rows = dataGrid.map((data) => {
    let row = { id: data.id };
    data.expenses.forEach((expense) => {
      row = {
        ...row,
        [expense.category_id]: expense.value,
      };
    });
    return row;
  });

  // find highest row ID number
  let maxIDRowNumber = 0;
  if (dataGrid.length > 1) {
    const allIDRows = dataGrid.map((data) => {
      return Number(data.id);
    });
    maxIDRowNumber = Math.max(...allIDRows);
  }

  // Add one more extra row for adding data by user
  const firstFreeRowID = maxIDRowNumber + 1;
  rows.push({ id: firstFreeRowID });

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
        loading={loading}
        processRowUpdate={(newRow, oldRow) => {
          setLoading(true);
          rowUpdate(projectID, newRow, userID);
          setLoading(false);

          // rows.forEach((item) => {
          //   item.id = Math.random() * 1000;
          // });
        }}
        onProcessRowUpdateError={(error) => {
          // console.log(error);
        }}
      />
    </Box>
  );
};
