import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import AcademicPrograms from "./components/AcademicPrograms/AcademicPrograms";
import LifeAtSchool from "./components/LifeAtSchool/LifeAtSchool";
import TheWay from "./components/TheWay/TheWay";
import QuickFacts from "./components/QuickFacts/QuickFacts";
import FAQ from "./components/FAQ/FAQ";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <AcademicPrograms />
      <LifeAtSchool />
      <TheWay />
      <QuickFacts />
      <FAQ />
    </>
  );
}