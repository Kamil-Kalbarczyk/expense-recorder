// import * as React from "react";
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
  // const [columnsGrid, setColumnsGrid] = useState([]);

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
      // console.log(doc.id, " => ", doc.data());
    });
    // console.log(dataFromFirestore);

    // set data for grid
    setDataGrid(dataFromFirestore);
    // console.log(dataGrid);
  };

  useEffect(() => {
    getDataGridFromFirestore();
  }, [projectID]);

  // =============== Fetching data end ===============

  // Build grid
  // set fields (columns) for grid
  const allCategories = dataGrid.map((data) => Object.keys(data.expenses));
  const categoriesTogether = ["id"];
  allCategories.forEach((categoryArray) => {
    categoryArray.forEach((singleCategory) => {
      categoriesTogether.push(singleCategory);
    });
  });
  const categories = [...new Set(categoriesTogether)];
  // console.log(categories);
  // const uniqueCatgories = [...new Set(allCategories)];
  // uniqueCatgories.unshift("id");

  const columns = categories.map((column) => {
    if (column === "id") {
      return {
        field: column,
        headerName: column,
        width: 150,
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

  /*
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "person",
      headerName: "Kto płacił",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 110,
      editable: true,
    },
    // {
    //   field: "fullName",
    //   headerName: "Full name",
    //   description: "This column has a value getter and is not sortable.",
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.row.person || ""} ${params.row.lastName || ""}`,
    // },
  ];
  */
  /*
  const rows = dataGrid.map((row) => {
    return {
      id: row.id,
      [row.category]: row.value,
    };
  });
  // console.log(rowsX);
  // const rows = [];
  */

  const rows = [
    { id: 1, lastName: "Snow", person: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", person: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", person: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", person: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", person: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", person: null, age: 150 },
    { id: 7, lastName: "Clifford", person: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", person: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", person: "Harvey", age: 65 },
  ];

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
