import MotionCategoryDetail from "./components/MotionCategoryDetail/MotionCategoryDetail";


const academicData = {
  category:
    "Academic",

  title:
    "Ideas in Motion",

  date:
    "October 04, 2026",

  time:
    "School hours",

  access:
    "Student programme",

  intro:
    "A space for questioning, experimentation and ideas that move beyond the classroom.",

  heroImage:
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=2200&q=92",

  storyTitle:
    "Learning through curiosity",

  paragraphs: [
    "Academic life at Vidya is designed around curiosity rather than memorisation alone.",

    "Students explore ideas through experiments, projects, discussion and collaborative problem-solving, giving concepts context beyond the textbook.",

    "The goal is not simply to know more, but to become confident thinkers who know how to ask better questions.",
  ],

  gallery: [
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1800&q=90",

    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1800&q=90",

    "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1800&q=90",

    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1800&q=90",
  ],
};


const AcademicPage = () => {
  return (
    <MotionCategoryDetail
      data={academicData}
    />
  );
};


export default AcademicPage;