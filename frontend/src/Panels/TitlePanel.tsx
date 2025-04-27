import React from "react";
import { useFilters } from "../Context/FiltersContext";

const TitlePanel: React.FC = () => {
  const { filters } = useFilters();
  return (
    <div className="text-center my-4">
      <h1 className="text-3xl font-bold">Funding raised by organizations</h1>
      <p className="text-base text-muted-foreground">
        Grouped by {filters.interval} intervals
      </p>
    </div>
  );
};

export default TitlePanel;
