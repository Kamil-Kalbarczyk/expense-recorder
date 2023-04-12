import { Routes, Route } from "react-router-dom";
import { GridExpenses } from "./expenseGrid";
import { NewProject } from "../../settings/newProject";

export const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Main Home</h1>} />
      <Route path="/grid/:projectID" element={<GridExpenses />} />
      <Route path="/new-project" element={<NewProject />} />
    </Routes>
  );
};
