import MotionHero from "./components/MotionHero/MotionHero";
import MotionEvents from "./components/MotionEvents/MotionEvents";

import "./MotionPage.css";


const MotionPage = () => {
  return (
    <main className="motion-page">

      <MotionHero />

      <MotionEvents />

    </main>
  );
};


export default MotionPage;