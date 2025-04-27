import React from "react";
import { useFilters } from "../Context/FiltersContext";
import OrgsSelect from "../Components/Inputs/OrgsSelect";
import IntervalSelect from "../Components/Inputs/IntervalSelect";
import { Input } from "../Components/ui/input";
import { Card, CardContent } from "../Components/ui/card";
import { Label } from "../Components/ui/label";
import OrgSearchTextInput from "../Components/Inputs/OrgSearchTextInput";
import { DualRangeSlider } from "../Components/ui/slider";
import RoundsSliderInput from "../Components/Inputs/RoundsSliderInput";

const FilterPanel: React.FC = () => {
  const { filters, updateFilter } = useFilters();

  return (
    <Card>
      <CardContent className="flex flex-col gap-4 w-full">
        <OrgsSelect
          name="orgIds"
          value={filters.orgIds}
          maxSelection={5}
          onChange={(ids) => updateFilter("orgIds", ids)}
          orgSearchText={filters.orgSearchText}
        />
        <div className="flex flex-col lg:flex-row  gap-4 w-full items-end ">
          <OrgSearchTextInput
            name="orgSearchText"
            value={filters.orgSearchText}
            onChange={(v) => updateFilter("orgSearchText", v)}
            placeholder="Search in names and descriptions"
          />
          <RoundsSliderInput
            min={1}
            max={12}
            step={1}
            // value={[filters.minValue, filters.maxValue]}
            // onChange={(values) => {
            //   updateFilter("minValue", values[0]);
            //   updateFilter("maxValue", values[1]);
            // }}
          />
          <div className="flex flex-col lg:flex-row gap-1 w-full min-w-[400px]">
            <IntervalSelect
              name="interval"
              value={filters.interval}
              onChange={(interval) => updateFilter("interval", interval)}
            />
            <div className="flex flex-col gap-1 w-full">
              <Label htmlFor="minDate">Date Range:</Label>
              <div className="flex gap-2 items-center">
                <Input
                  id="minDate"
                  type="date"
                  name="minDate"
                  value={filters.minDate}
                  onChange={(v) => updateFilter("minDate", v.target.value)}
                />
                <span className="text-sm text-muted-foreground">to</span>
                <Input
                  type="date"
                  name="maxDate"
                  value={filters.maxDate}
                  onChange={(v) => updateFilter("maxDate", v.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;
