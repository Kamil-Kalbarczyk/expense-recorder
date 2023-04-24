import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

export const Summary = (
  dataGrid,
  setDataGrid,
  columnsGrid,
  setColumnsGrid,
  loading,
  setLoading,
  projectID,
  userID,
  getDataGridFromFirestore
) => {
  const columns = [
    { field: "id", headerName: "Context", width: 150 },
    {
      field: "firstName",
      headerName: "First name",
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
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  return (
    <Box sx={{ height: "85vh", width: "100%" }}>
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
        // loading={loading}
        showCellVerticalBorder={true}
        // processRowUpdate={(newRow, oldRow) => {
        //   setLoading(true);
        //   rowUpdate(projectID, newRow, userID);
        //   // refresh data from database
        //   getDataGridFromFirestore();
        //   // removing editing css class
        //   const cell = document.querySelector(".MuiDataGrid-cell--editing");
        //   cell.classList.remove("MuiDataGrid-cell--editing");
        //   setLoading(false);
        // }}
        // onProcessRowUpdateError={(error) => {
        //   // console.log(error);
        // }}
      />
    </Box>
  );
};
