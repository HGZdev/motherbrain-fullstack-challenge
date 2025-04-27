import FilterPanel from "./Panels/FilterPanel";
import ChartPanel from "./Panels/ChartPanel";
import DescriptionPanel from "./Panels/DescriptionPanel";

import TitlePanel from "./Panels/TitlePanel";
import "./styles/tailwind.css";
import ExamplesPanel from "./Panels/ExamplesPanel";

function App() {
  return (
    <div className="container relative flex flex-col gap-4 px-2 pt-2 pb-16 mx-auto">
      <TitlePanel />
      <FilterPanel />
      <ChartPanel />
      <ExamplesPanel />
      <DescriptionPanel />
    </div>
  );
}

export default App;
