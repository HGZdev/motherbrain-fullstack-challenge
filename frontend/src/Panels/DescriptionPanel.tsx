import React from "react";
import { Card } from "../Components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../Components/ui/accordion";
import { Info, Lightbulb, Rocket, Wrench } from "lucide-react";

const ReusableAccordionItem: React.FC<{
  value: string;
  title: string | React.ReactNode;
  items: React.ReactNode[];
}> = ({ value, title, items }) => (
  <AccordionItem value={value}>
    <AccordionTrigger>
      <h3 className="text-sm md:text-xl font-bold">{title}</h3>
    </AccordionTrigger>
    <AccordionContent>
      <ul className="list-disc text-sm md:text-md text-left flex flex-col gap-4 ml-4 list-outside">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </AccordionContent>
  </AccordionItem>
);

const DescriptionPanel: React.FC = () => {
  return (
    <Card>
      <Accordion type="single" collapsible>
        <ReusableAccordionItem
          value="chart-description"
          title={
            <span className="flex items-center gap-2">
              <Info /> What is this chart about?
            </span>
          }
          items={[
            <>
              The chart presents <strong>total funding amounts</strong> raised
              by various organizations over different{" "}
              <strong>time intervals</strong>.
            </>,
            <>
              Data is grouped by <strong>time intervals</strong> to analyze{" "}
              <strong>funding dynamics</strong> over time.
            </>,
            <>
              A maximum of <strong>5 organizations</strong> can be displayed
              simultaneously to keep things clear and avoid visual clutter.
            </>,
            <>
              <strong>Stacked bars</strong> represent the{" "}
              <strong>total amount of funding</strong> raised by each selected
              organization per interval.
            </>,
            <>
              <strong>Dotted lines</strong> show <strong>funding speed</strong>,
              calculated as the amount raised divided by the number of days
              since the previous period ended.
            </>,
            <>
              <strong>Tooltips</strong> include extra info like{" "}
              <strong>number of rounds</strong>, <strong>total funding</strong>,
              and <strong>average daily funding</strong>.
            </>,
            <>
              Organizations can be filtered by <strong>keywords</strong> in
              their <strong>name or description</strong>, which allows thematic
              grouping (e.g., by sector, region, or tech).
            </>,
            <>
              You can narrow down the <strong>date range</strong> to focus on a
              specific analysis window.
            </>,
            <>
              The <strong>time grouping interval</strong> (e.g., quarter, month)
              is adjustable to match the level of detail you're after.
            </>,
          ]}
        />
        <ReusableAccordionItem
          value="usability"
          title={
            <>
              <span className="flex items-center gap-2">
                <Rocket /> How could it be useful?
              </span>
            </>
          }
          items={[
            <>
              Shows how <strong>fast</strong> each organization is raising{" "}
              <strong>capital</strong> — useful for assessing{" "}
              <strong>growth</strong> and funding <strong>efficiency</strong>.
            </>,
            <>
              Helps you track when <strong>funding rounds</strong> happen and
              how often, giving a clear picture of funding{" "}
              <strong>progression</strong>.
            </>,
            <>
              Makes it easy to compare <strong>investment activity</strong>{" "}
              between multiple organizations in a given{" "}
              <strong>time period</strong> — great for{" "}
              <strong>competitive analysis</strong>.
            </>,
            <>
              Highlights <strong>funding spikes</strong>, which might indicate
              major events like new <strong>investors</strong> or strategic{" "}
              <strong>investments</strong>.
            </>,
          ]}
        />
        <ReusableAccordionItem
          value="technologies"
          title={
            <>
              <span className="flex items-center gap-2">
                <Wrench />
                What did I use to build this?
              </span>
            </>
          }
          items={[
            <>
              <strong>TypeScript</strong> – Used throughout the project to catch
              type issues early and keep things maintainable as the app grows.
            </>,
            <>
              <strong>Recharts</strong> – Picked this library for rendering the
              chart. It’s lightweight, flexible, and works well with responsive
              layouts in React.
            </>,
            <>
              <strong>Tailwind CSS / Shadcn/ui</strong> – Used this combo for
              styling — fast to work with, easy to customize, and makes the UI
              feel clean and modern.
            </>,
            <>
              <strong>Responsive design</strong> – Ensured the chart looks clean
              and remains usable across different screen sizes.
            </>,
            <>
              <strong>Custom React Hooks / Context API</strong> – Built a custom
              `useFilters` hook to handle filters. Filter state lives in the
              URL, so the chart state is shareable and persists between
              sessions. Also makes debugging easier.
            </>,
            <>
              <strong>GraphQL</strong> – Moved as much logic as possible to the
              backend. Queries are optimized to fetch only what the chart needs
              — nothing more, nothing less.
            </>,
            <>
              <strong>Prisma</strong> – Added indexes to the most queried fields
              (like name, description, organizationId) to speed things up.
            </>,
            <>
              <strong>Testing with Vitest</strong> – Wrote some unit tests for
              key functions to ensure correctness and catch regressions during
              refactors.
            </>,
            <>
              <strong>Modular file structure</strong> – Organized code into
              themed files & folders: `Components`, `Context`, `helpers`,
              `types`, `hooks`, etc.
            </>,
          ]}
        />
        <ReusableAccordionItem
          value="future-improvements"
          title={
            <span className="flex items-center gap-2">
              <Lightbulb /> What could be added next?
            </span>
          }
          items={[
            <>
              Integrate <strong>benchmark lines</strong> to visualize{" "}
              <strong>average or median funding levels</strong>, enabling
              comparisons between individual organizations and{" "}
              <strong>market averages</strong> or{" "}
              <strong>top performers</strong> for contextual benchmarking.
            </>,
            <>
              Add a <strong>sorting feature</strong> so users can{" "}
              <strong>sort organizations</strong> by{" "}
              <strong>total funding</strong>,{" "}
              <strong>average daily funding</strong>, or{" "}
              <strong>number of rounds</strong> to make data exploration easier.
            </>,
            <>
              Implement a <strong>dark mode</strong> to improve usability in{" "}
              <strong>low-light environments</strong> (using the{" "}
              <strong>Context API</strong> for global state management).
            </>,
            <>
              Allow <strong>dynamic adjustment of time granularity</strong> (
              <strong>week, month, quarter, year</strong>) depending on{" "}
              <strong>zoom level</strong> or <strong>user preference</strong>.
            </>,
            <>
              Provide <strong>localization (i18n)</strong> options to make the
              chart accessible to users from{" "}
              <strong>different regions and language backgrounds</strong>.
            </>,
            <>
              Enable users to{" "}
              <strong>save and load custom chart configurations</strong> (e.g.,
              selected organizations, time ranges, intervals) for a more{" "}
              <strong>personalized and persistent analysis experience</strong>.
            </>,
            <>
              Add support for <strong>funding round types</strong> (e.g.,{" "}
              <strong>Seed, Series A, B</strong>) as{" "}
              <strong>optional filters or groupings</strong>, providing deeper
              insights [<strong>additional data required</strong>].
            </>,
            <>
              Introduce <strong>interactive filters</strong> for{" "}
              <strong>sector, location, or technology-related keywords</strong>{" "}
              extracted from <strong>organization metadata</strong> to allow
              more granular segmentation [
              <strong>additional data required</strong>].
            </>,
          ]}
        />
      </Accordion>
    </Card>
  );
};

export default DescriptionPanel;
