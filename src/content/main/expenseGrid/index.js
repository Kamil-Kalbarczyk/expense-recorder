import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/auth/AuthContext";
import { ProjectsContext } from "../../../contexts/projects/ProjectsContext";
import { app } from "../../../firebase";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { convertTimestampToDate } from "../../../common/functions";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import { rowUpdate } from "./gridFunctions";

const db = getFirestore(app);

export const GridExpenses = () => {
  const isAuthorization = useContext(AuthContext);
  const userID = isAuthorization.authorization.uid;

  const { projects, setProjects } = useContext(ProjectsContext);

  const { projectID } = useParams();

  const currentProject = projects.filter(
    (project) => project.project_id === projectID
  )[0];

  const [dataGrid, setDataGrid] = useState([]);
  const [columnsGrid, setColumnsGrid] = useState([]);
  const [loading, setLoading] = useState(true);

  // =============== Fetching data start ===============

  // columns
  const getCategories = query(
    collection(db, "categories"),
    where("userID", "==", userID),
    // where("projects", "array-contains", projectID),
    orderBy("create_date", "asc")
  );

  const getColumnsGridFromFirestore = async () => {
    const querySnapshot = await getDocs(getCategories);
    const allCategories = [];
    querySnapshot.forEach((doc) => {
      allCategories.push({
        id: doc.id,
        ...doc.data(),
        create_date: convertTimestampToDate(doc.data()?.create_date?.seconds),
      });
    });

    const projectCategories = allCategories
      .map((category) => {
        let cat = undefined;
        if (currentProject.categories !== undefined) {
          currentProject.categories.forEach((projCategory) => {
            if (projCategory === category.id) {
              cat = category;
            }
          });
        }

        return cat;
      })
      .filter((cat) => cat);

    // set columns for grid
    setColumnsGrid(
      projectCategories.map((item) => ({
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
    // await getCategoriesFromFirestore();
    await getColumnsGridFromFirestore();
    await getDataGridFromFirestore();
  };

  useEffect(() => {
    fetchDataFromFirestore();
  }, [projectID, projects]);

  // =============== Fetching data end ===============

  // =============== Building grid start ===============
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
      // sortable: false,
      type: "number",
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
      // sortable: false,
      type: "number",
    });
  });

  // rows
  const rows = dataGrid.map((data) => {
    let row = { id: Number(data.id) };
    data.expenses.forEach((expense) => {
      row = {
        ...row,
        [expense.category_id]: expense.value,
      };
    });
    return row;
  });

  const sortRowsById = () => {
    function compareNumbers(a, b) {
      return a.id - b.id;
    }
    rows.sort(compareNumbers);
  };

  const addOneExtarRow = () => {
    // find highest row ID number
    let maxIDRowNumber = 0;
    if (dataGrid.length > 0) {
      const allIDRows = dataGrid.map((data) => {
        return Number(data.id);
      });
      maxIDRowNumber = Math.max(...allIDRows);
    }
    // Add one more extra row for adding data by user
    const firstFreeRowID = maxIDRowNumber + 1;
    rows.push({ id: firstFreeRowID });
  };
  addOneExtarRow();
  sortRowsById();
  // =============== Building grid end ===============

  return (
    <Box sx={{ height: "90vh", width: "100%" }}>
      <DataGrid
        sx={{
          "& .MuiDataGrid-cell": {
            justifyContent: "right",
          },
          "& .MuiDataGrid-cell:hover": {
            backgroundColor: "lightgrey",
          },
        }}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        loading={loading}
        showCellVerticalBorder={true}
        processRowUpdate={(newRow, oldRow) => {
          setLoading(true);
          rowUpdate(projectID, newRow, userID);
          // refresh data from database
          getDataGridFromFirestore();

          // if (newRow.id === rows.length) {
          //   console.log("fetch data");
          //   getDataGridFromFirestore();
          // }

          // removing editing css class
          const cell = document.querySelector(".MuiDataGrid-cell--editing");
          cell.classList.remove("MuiDataGrid-cell--editing");
          setLoading(false);
        }}
        onProcessRowUpdateError={(error) => {
          // console.log(error);
        }}
      />
    </Box>
  );
};
