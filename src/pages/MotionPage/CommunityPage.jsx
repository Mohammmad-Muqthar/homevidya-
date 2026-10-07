import MotionCategoryDetail from "./components/MotionCategoryDetail/MotionCategoryDetail";


const communityData = {
  category:
    "Community",

  title:
    "Together at Vidya",

  date:
    "September 27, 2026",

  time:
    "Morning",

  access:
    "Registration only",

  intro:
    "A morning created for families, students and educators to pause, connect and experience the strength of community.",

  heroImage:
    "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=2200&q=92",

  storyTitle:
    "A community that grows together",

  paragraphs: [
    "At Vidya Academy, community is not something that exists only around learning. It is part of how learning happens.",

    "Our community experiences bring students, families and educators together through conversation, shared activities and meaningful moments across campus.",

    "These experiences give everyone space to connect, contribute and feel part of something larger.",
  ],

  gallery: [
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1800&q=90",

    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1800&q=90",

    "https://images.unsplash.com/photo-1504151932400-72d4384f04b3?auto=format&fit=crop&w=1800&q=90",

    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=90",
  ],
};


const CommunityPage = () => {
  return (
    <MotionCategoryDetail
      data={communityData}
    />
  );
};


export default CommunityPage;