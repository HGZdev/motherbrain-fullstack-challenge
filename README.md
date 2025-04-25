# 💼 Motherbrain Fullstack Challenge – Chart Visualization

This project was created as part of the **Motherbrain Fullstack Challenge**.  
The goal was to build an interactive chart visualizing funding data of organizations over time.  
Below is a detailed overview of how the chart works, what technologies were used, and ideas for future enhancements.

---

## 🧠 What is this chart about?

- The chart presents **total funding amounts** raised by various organizations over different **time intervals**.
- Data is grouped by **time intervals** to analyze **funding dynamics** over time.
- A maximum of **5 organizations** can be displayed simultaneously to keep things clear and avoid visual clutter.
- **Stacked bars** represent the **total amount of funding** raised by each selected organization per interval.
- **Dotted lines** show **funding speed**, calculated as the amount raised divided by the number of days since the previous period ended.
- **Tooltips** include extra info like **number of rounds**, **total funding**, and **average daily funding**.
- Organizations can be filtered by **keywords** in their **name or description**, which allows thematic grouping (e.g., by sector, region, or tech).
- You can narrow down the **date range** to focus on a specific analysis window.
- The **time grouping interval** (e.g., quarter, month) is adjustable to match the level of detail you're after.

---

## 🚀 How could it be useful?

- Shows how **fast** each organization is raising **capital** — useful for assessing **growth** and funding **efficiency**.
- Helps track when **funding rounds** happen and how often, giving a clear picture of funding **progression**.
- Makes it easy to compare **investment activity** between multiple organizations in a given **time period** — great for **competitive analysis**.
- Highlights **funding spikes**, which might indicate major events like new **investors** or strategic **investments**.

---

## 🛠️ Technologies & Techniques I Used

- **TypeScript** – Used throughout the project to catch type issues early and keep things maintainable as the app grows.
- **Recharts** – Picked this library for rendering the chart. It’s lightweight, flexible, and works well with responsive layouts in React.
- **Tailwind CSS / Shadcn/ui** – Used this combo for styling — fast to work with, easy to customize, and makes the UI feel clean and modern.
- **Responsive design** – Ensured the chart looks clean and remains usable across different screen sizes.
- **Custom React Hooks / Context API** – Built a custom `useFilters` hook to handle filters. Filter state lives in the URL, so the chart state is shareable and persists between sessions. Also makes debugging easier.
- **GraphQL** – Moved as much logic as possible to the backend. Queries are optimized to fetch only what the chart needs — nothing more, nothing less.
- **Prisma** – Added indexes to the most queried fields (like name, description, organizationId) to speed things up.
- **Testing with Vitest** – Wrote some unit tests for key functions to ensure correctness and catch regressions during refactors.
- **Modular file structure** – Organized code into themed files & folders: `Components`, `Context`, `helpers`, `types`, `hooks`, etc.

---

## 💡 What could be added next?

- Integrate **benchmark lines** to visualize **average or median funding levels**, enabling comparisons with **market averages** or **top performers**.
- Add a **sorting feature** to let users **sort organizations** by **total funding**, **average daily funding**, or **number of rounds**.
- Implement **dark mode** for low-light environments (using **Context API** to manage global theme state).
- Allow **dynamic adjustment of time granularity** (**week, month, quarter, year**) depending on **zoom level** or **user preference**.
- Provide **localization (i18n)** options to make the chart accessible to users from **different regions and language backgrounds**.
- Let users **save and load custom chart configurations** (e.g., selected organizations, time ranges, and intervals) for a more **personalized analysis experience**.
- Add support for **funding round types** (e.g., **Seed, Series A, B**) as **filters or groupings** [*additional data required*].
- Introduce **interactive filters** for **sector, location, or technology keywords** from **organization metadata** for more granular segmentation [*additional data required*].

