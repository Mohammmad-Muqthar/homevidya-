import {
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import CampusPage from "./pages/CampusPage/CampusPage";
import MotionPage from "./pages/MotionPage/MotionPage";
import LearningPathwaysPage from "./pages/VidyaLearningPathwaysPage";

import CommunityPage from "./pages/MotionPage/CommunityPage";
import AcademicPage from "./pages/MotionPage/AcademicPage";
import ArtsPage from "./pages/MotionPage/ArtsPage";
import SportsPage from "./pages/MotionPage/SportsPage";

import "./App.css";


function App() {
  return (
    <Routes>

      <Route element={<MainLayout />}>

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/about"
          element={<AboutPage />}
        />

        <Route
          path="/campus"
          element={<CampusPage />}
        />

        <Route
          path="/motion"
          element={<MotionPage />}
        />
        <Route
  path="/learning-pathways"
  element={<LearningPathwaysPage />}
/>



<Route
  path="/motion/community"
  element={<CommunityPage />}
/>

<Route
  path="/motion/academic"
  element={<AcademicPage />}
/>

<Route
  path="/motion/arts"
  element={<ArtsPage />}
/>

<Route
  path="/motion/sports"
  element={<SportsPage />}
/>
      </Route>

    </Routes>
  );
}


export default App;