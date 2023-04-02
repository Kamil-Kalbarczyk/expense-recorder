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
import { DataGrid } from "@mui/x-data-grid";

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
    collection(db, "expenses_rows"),
    where("project_id", "==", projectID),
    where("userID", "==", userID),
    orderBy("create_date", "asc")
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
  const rowsForGrid = dataGrid.map((data) => {
    const expenses = data.expenses.map((expense) => {
      return {
        [expense.category_id]: expense.value,
      };
    });
    expenses.unshift({ id: data.id });
    return expenses;
  });

  const rows = rowsForGrid.map((rows) => {
    let singleRow = {};
    rows.forEach((item) => {
      singleRow = { ...singleRow, ...item };
    });
    return singleRow;
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
        loading={loading}
      />
    </Box>
  );
};
