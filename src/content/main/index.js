import { Routes, Route } from "react-router-dom";
import { GridExpenses } from "../expenseGrid";
import { NewProject } from "../../settings/newProject";

export const Main = () => {
  return (
    <Routes>
      <Route path="/grid" element={<GridExpenses />} />
      <Route path="/new-project" element={<NewProject />} />
    </Routes>
  );
};
