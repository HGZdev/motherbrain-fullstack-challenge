import FilterPanel from "./Components/FilterPanel";
import ChartPanel from "./Components/ChartPanel";
import DescriptionPanel from "./Components/DescriptionPanel";

import TitlePanel from "./Components/TitlePanel";
import "./styles/tailwind.css";
import ExamplesPanel from "./Components/Panels/ExamplesPanel";

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
