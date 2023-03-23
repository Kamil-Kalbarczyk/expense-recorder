import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

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

export const GridExpenses = () => {
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
