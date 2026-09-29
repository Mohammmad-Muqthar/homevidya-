import {
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import HomePage from "./pages/HomePage/HomePage";
// import CampusPage from "./pages/CampusPage/CampusPage";

export default function App() {
  return (
    <Routes>

      <Route element={<MainLayout />}>

        <Route
          path="/"
          element={<HomePage />}
        />

        {/* <Route
          path="/campus"
          element={<CampusPage />}
        /> */}

      </Route>

    </Routes>
  );
}