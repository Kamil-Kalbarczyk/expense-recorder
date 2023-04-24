import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { rowUpdate } from "./gridFunctions";

export const RecorderGrid = ({
  dataGrid,
  setDataGrid,
  columnsGrid,
  setColumnsGrid,
  loading,
  setLoading,
  projectID,
  userID,
  getDataGridFromFirestore,
}) => {
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
        loading={loading}
        showCellVerticalBorder={true}
        processRowUpdate={(newRow, oldRow) => {
          setLoading(true);
          rowUpdate(projectID, newRow, userID);
          // refresh data from database
          getDataGridFromFirestore();
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
