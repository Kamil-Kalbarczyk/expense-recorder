import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import "./summary.css";

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
  const columns = [
    {
      field: "id",
      headerName: "Context",
      width: 150,
      editable: false,
      sortable: false,
      headerAlign: "right",
    },
  ];
  columnsGrid.forEach((column) => {
    columns.push({
      field: column.id,
      headerName: column.category,
      width: 150,
      editable: false,
      sortable: false,
      headerAlign: "right",
    });
  });
  columns.push({
    field: "totalValue",
    headerName: "Summary Value",
    width: 150,
    editable: false,
    sortable: false,
    headerAlign: "right",
    cellClassName: "Summary__total",
  });
  // columns end --------------------------

  // rows start --------------------------
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

      percent = (percent * 100).toString();
      percent = percent.slice(0, percent.indexOf(".") + 3);
      percent = percent + " %";

      return {
        ...row,
        percent: percent,
      };
    }
  });

  let totalRow = [{ id: "Total" }];
  let percentRow = [{ id: "Percent" }];
  let expensesTotalValue = 0;
  summaryExpenses.forEach((item) => {
    if (item.column !== "id") {
      expensesTotalValue += item.value;
      totalRow[0] = { ...totalRow[0], [item.column]: item.value };
      percentRow[0] = { ...percentRow[0], [item.column]: item.percent };
    }
  });
  totalRow[0] = { ...totalRow[0], totalValue: expensesTotalValue };
  percentRow[0] = { ...percentRow[0], totalValue: "100 %" };
  const rows = [totalRow[0], percentRow[0]];

  // rows end --------------------------

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
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        // loading={loading}
        showCellVerticalBorder={true}
      />
    </Box>
  );
};
