# Vidya Academy — Learning Pathways Page

Use this folder at:

src/pages/LearningPathways/

This page is separate from your existing Motion Academic route.

## New route

```jsx
import LearningPathwaysPage from "./pages/LearningPathways";

<Route
  path="/learning-pathways"
  element={<LearningPathwaysPage />}
/>
```

So your routes stay separate:

- `/motion/academic` → existing Academic page inside Motion
- `/learning-pathways` → this new PYP / MYP / DP page

## Components

- LearningPathwaysHero
- ProgrammeOverview
- ProgrammeSection
- ContinuumSection
- CareerGuidance
- LearningPathwaysTourBar

The existing global Navbar and Footer should stay in `MainLayout`.
Do not duplicate them inside this page.

## Dependency

```bash
npm i gsap
```
