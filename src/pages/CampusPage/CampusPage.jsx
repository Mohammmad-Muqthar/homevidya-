import CampusHero from "./components/CampusHero/CampusHero";
import CampusGrounds from "./components/CampusGrounds/CampusGrounds";
import CampusBuildings from "./components/CampusBuildings/CampusBuildings";
import CampusNumbers from "./components/CampusNumbers/CampusNumbers";

import "./CampusPage.css";


const CampusPage = () => {
  return (
    <div className="campus-page">

      <CampusHero />

      <CampusGrounds />

      <CampusBuildings />
      <CampusNumbers />

    </div>
  );
};


export default CampusPage;