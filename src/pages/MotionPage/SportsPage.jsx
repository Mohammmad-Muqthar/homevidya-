import MotionCategoryDetail from "./components/MotionCategoryDetail/MotionCategoryDetail";


const sportsData = {
  category:
    "Sports",

  title:
    "Move. Play. Grow.",

  date:
    "November 14, 2026",

  time:
    "Morning",

  access:
    "School event",

  intro:
    "Sport at Vidya is about movement, teamwork, resilience and discovering what students are capable of.",

  heroImage:
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=2200&q=92",

  storyTitle:
    "More than competition",

  paragraphs: [
    "Sport gives students the opportunity to test themselves in ways that classrooms cannot always provide.",

    "Through training, team play and competition, they experience discipline, resilience, collaboration and the confidence that comes from progress.",

    "Every student is encouraged to move, participate and discover the kind of physical activity that feels right for them.",
  ],

  gallery: [
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1800&q=90",

    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1800&q=90",

    "https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=1800&q=90",

    "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1800&q=90",
  ],
};


const SportsPage = () => {
  return (
    <MotionCategoryDetail
      data={sportsData}
    />
  );
};


export default SportsPage;