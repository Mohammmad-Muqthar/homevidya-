import AboutHero from "./components/AboutHero/AboutHero";
import AboutStatement from "./components/AboutStatement/AboutStatement";
import AboutLeadership from "./components/AboutLeadership/AboutLeadership";
import AboutWay from "./components/AboutWay/AboutWay";
import AboutFaculty from "./components/AboutFaculty/AboutFaculty";
import AboutYear from "./components/AboutYear/AboutYear";

import "./AboutPage.css";


const AboutPage = () => {
  return (
    <main className="about-page">
      <AboutHero />
      <AboutStatement />
      <AboutLeadership />
      <AboutWay />
      <AboutFaculty />
      <AboutYear />
    </main>
  );
};


export default AboutPage;