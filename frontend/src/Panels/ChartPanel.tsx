import { useFilters } from "../Context/FiltersContext";
import { useOrgsRoundsGrouped } from "../queries";
import { Chart } from "../Components/Charts/Chart";
import { Card } from "../Components/ui/card";

const ChartPanel = () => {
  const { filters } = useFilters();
  const { data, previousData, loading, error } = useOrgsRoundsGrouped(
    {
      interval: filters.interval,
      orgIds: filters.orgIds,
      minDate: filters.minDate,
      maxDate: filters.maxDate,
    },
    { skip: !filters.orgIds?.length }
  );

  if (!data && !previousData && loading) return <p>Loading...</p>;

  if (error) {
    console.error("Error fetching data:", error);
    return <p className="text-base text-destructive">Error!</p>;
  }

  if (!filters.orgIds?.length) {
    return (
      <Card className="text-base text-destructive">
        Please select organizations
      </Card>
    );
  }

  const orgsRoundsGrouped = (data || previousData)?.orgsRoundsGrouped?.data;

  if (!orgsRoundsGrouped?.length) {
    return <Card>No data available for the selected filters</Card>;
  }

  return <Chart data={orgsRoundsGrouped} />;
};

export default ChartPanel;
