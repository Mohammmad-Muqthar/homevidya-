import MotionCategoryDetail from "./components/MotionCategoryDetail/MotionCategoryDetail";


const artsData = {
  category:
    "Arts",

  title:
    "Expression Takes Shape",

  date:
    "October 12, 2026",

  time:
    "Evening",

  access:
    "School community",

  intro:
    "Art, performance and imagination come together as students find their own ways to communicate and create.",

  heroImage:
    "https://images.unsplash.com/photo-1545987796-200677ee1011?auto=format&fit=crop&w=2200&q=92",

  storyTitle:
    "A place for expression",

  paragraphs: [
    "Creative expression gives students another language through which to understand themselves and the world around them.",

    "Across visual art, music, theatre and movement, students are encouraged to experiment, perform and develop confidence in their own ideas.",

    "The result is not about creating perfect performances. It is about giving imagination room to grow.",
  ],

  gallery: [
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1800&q=90",

    "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1800&q=90",

    "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1800&q=90",

    "https://images.unsplash.com/photo-1542622475-904e18612fa1?auto=format&fit=crop&w=1800&q=90",
  ],
};


const ArtsPage = () => {
  return (
    <MotionCategoryDetail
      data={artsData}
    />
  );
};


export default ArtsPage;