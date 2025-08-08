# Mini E-commerce Product Catalog with AI Recommendations
 [🎥 Watch the 2–3 min demo](https://drive.google.com/file/d/12dZcseDXea7w9MHwauhBkpunQ8ICUvDr/view?usp=sharing)

## Overview
This is a small e-commerce product catalog web app built with **React** and **TailwindCSS**.  
It displays a static list of 10 sample products, allows basic searching and filtering,  
and includes an **AI Recommendation System** that suggests similar products based on the selected item.

---

## AI Feature Chosen
**Option C – Recommendation System**  
- Uses a **rule-based AI approach**:
  - Prioritizes same category products
  - Sorts by higher ratings
  - Chooses similar price range
- Returns up to 4 relevant product suggestions

---

## How to Run

### 1. Clone or Download

bash
Copier
Modifier
git clone https://github.com/Hgalia0/e-commerce-mini-project
cd e-commerce-mini-project
### 2. Install Dependencies
bash
Copier
Modifier
npm install
### 3. Run the App
bash
Copier
Modifier
npm run dev
The app will run on http://localhost:5173 (or the port Vite chooses).

### Tools / Libraries Used
React – UI framework

Vite – Build tool & dev server

TailwindCSS – Styling

JavaScript (ES6) – Core language

### Notable Assumptions
Product data is static and stored in code (JSON format).

Recommendation logic is rule-based only (no external AI API calls).

App is frontend-only, runs entirely in the browser.

Ratings are on a 1–5 scale.

Bonus: Blockchain integration idea is mentioned in the footer.

