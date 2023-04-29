import { RecorderGrid } from "./grid";
import { Summary } from "./summary";
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
import Divider from "@mui/material/Divider";

const db = getFirestore(app);

export const Recorder = () => {
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
        if (currentProject?.categories !== undefined) {
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
    await getColumnsGridFromFirestore();
    await getDataGridFromFirestore();
  };

  useEffect(() => {
    fetchDataFromFirestore();
  }, [projectID, projects]);

  // =============== Fetching data end ===============
  if (dataGrid && columnsGrid && projectID && userID) {
    return (
      <div>
        <RecorderGrid
          dataGrid={dataGrid}
          setDataGrid={setDataGrid}
          columnsGrid={columnsGrid}
          setColumnsGrid={setColumnsGrid}
          loading={loading}
          setLoading={setLoading}
          projectID={projectID}
          userID={userID}
          getDataGridFromFirestore={getDataGridFromFirestore}
        />
        <Divider variant="inset" sx={{ m: 3 }} />
        <Summary
          dataGrid={dataGrid}
          setDataGrid={setDataGrid}
          columnsGrid={columnsGrid}
          setColumnsGrid={setColumnsGrid}
          loading={loading}
          setLoading={setLoading}
          projectID={projectID}
          userID={userID}
          // getDataGridFromFirestore={getDataGridFromFirestore}
          currentProject={currentProject}
        />
      </div>
    );
  }
};
