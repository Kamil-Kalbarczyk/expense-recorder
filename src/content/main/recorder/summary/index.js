import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

export const Summary = ({
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
  // columns start --------------------------
  const columns = [{ field: "id", headerName: "Context", width: 150 }];
  columnsGrid.forEach((column) => {
    columns.push({
      field: column.id,
      headerName: column.category,
      width: 150,
      editable: false,
      // sortable: false,
      type: "number",
    });
  });
  // columns end --------------------------

  // rows end --------------------------
  let allExpenses = [];
  let sortedExpenses = columns.map((column) => {
    return { column: column.field };
  });
  let summaryExpenses = [];
  let totalExpenses = 0;

  // collect all expenses
  dataGrid.forEach((data) => {
    data.expenses.forEach((expense) => {
      allExpenses.push(expense);
    });
  });

  // summing up and grouping expenses
  columns.forEach((column) => {
    const category_id = column.field;
    let value = 0;

    allExpenses.forEach((expense) => {
      if (expense.category_id == category_id) {
        value += expense.value;
        totalExpenses += expense.value;
      }
    });
    sortedExpenses.forEach((category) => {
      if (category.column == category_id) {
        summaryExpenses.push({ column: category_id, value: value });
      }
    });
  });

  // add percents to the rows
  summaryExpenses = summaryExpenses.map((row) => {
    if (row.column === "id") {
      return { column: row.column, value: "Total", percent: "Percent" };
    } else {
      let percent = Math.round((row.value / totalExpenses) * 10000) / 10000;
      percent = (percent * 100).toString() + " %";
      return {
        ...row,
        percent: percent,
      };
    }
  });

  console.log(summaryExpenses);

  // let rowsie = summaryExpenses.map(row => {
  //   return {
  //     id: "Total",
  //   }
  // })

  let rowX = summaryExpenses.map((row) => {
    return {
      id: "Total",
      [row.column]: row.value,
    };
  });
  console.log(rowX);

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
          // "& .MuiDataGrid-cell:hover": {
          //   backgroundColor: "lightgrey",
          // },
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
