import { Routes, Route } from "react-router-dom";
import { Home } from "./home";
import { GridExpenses } from "./expenseGrid";
import { NewRecorder } from "./newRecorder";
import { LogOut } from "./logOut";
import { Recorder } from "./recorder";

export const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/grid/:projectID"
        element={
          <>
            {/* <GridExpenses /> */}
            <Recorder />
          </>
        }
      />
      <Route path="/new-recorder" element={<NewRecorder />} />
      <Route path="/log-out" element={<LogOut />} />
    </Routes>
  );
};
