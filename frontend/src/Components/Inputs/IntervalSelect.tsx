import React, { useState } from "react";
import Select from "react-select";
import { Label } from "../ui/label";
import { Interval } from "../../types";

interface IntervalSelectProps {
  name: string;
  value?: Interval;
  onChange: (selectedInterval: Interval) => void;
}

const options: { value: Interval; label: string }[] = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "quarter", label: "Quarter" },
  { value: "year", label: "Year" },
  { value: "total", label: "Total" },
];

const IntervalSelect: React.FC<IntervalSelectProps> = ({
  name,
  value = "day",
  onChange,
}) => {
  const [interval, setInterval] = useState(value);

  const handleChange = (
    selected: { value: Interval; label: string } | null
  ) => {
    if (!selected) return;
    setInterval(selected.value);
    onChange(selected.value);
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <Label htmlFor={name}>Interval:</Label>
      <Select
        inputId={name}
        name={name}
        options={options}
        value={options.find((option) => option.value === interval)}
        onChange={handleChange}
        placeholder="Select an interval"
        className="react-select-container"
        classNamePrefix="react-select"
        styles={{
          control: (base) => ({
            ...base,
            fontSize: "16px",
            borderColor: "oklch(0.922 0 0)",
            borderRadius: "8px",
            "&:hover": { borderColor: "#cbd5e0" },
            shadow: "0 0 0 1px oklch(0.1 0 0)",
          }),
          placeholder: (base) => ({
            ...base,
            color: "oklch(0.56 0 0)",
            fontSize: "14px",
            fontStyle: "italic",
          }),
        }}
      />
    </div>
  );
};

export default IntervalSelect;
