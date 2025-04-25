import React, { useState, useMemo } from "react";
import Select from "react-select";
import { Label } from "../ui/label";
import { Org } from "../../types";
import { useOrgs } from "../../queries";

import { type MultiValue } from "react-select";

interface OrgsSelectProps {
  name: string;
  onChange: (selectedOrgIds: Org["id"][]) => void;
  value?: Org["id"][];
  maxSelection?: number;
  orgSearchText?: string;
}

const OrgsSelect: React.FC<OrgsSelectProps> = ({
  maxSelection = 5,
  onChange,
  name,
  orgSearchText,
  value = [],
}) => {
  const [selectedOrgIds, setSelectedOrgIds] = useState<Org["id"][]>(value);
  const { data, previousData, loading, error } = useOrgs({ orgSearchText });

  const orgOptions = useMemo(() => {
    return (
      (data || previousData)?.orgs.map((org) => ({
        value: org.id,
        label: org.name,
      })) || []
    );
  }, [data, previousData]);

  const handleOrgChange = (
    selectedOptions: MultiValue<{ value: string; label: string }>
  ) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedOrgIds(selectedValues);
    onChange(selectedValues);
  };

  if (loading && !data && !previousData) return <p>Loading organizations...</p>;
  if (error) return <p>Error loading organizations.</p>;

  return (
    <div className="flex flex-col gap-1 w-full">
      <Label htmlFor={name}>
        Selected organizations (max {maxSelection} of {orgOptions.length}):
      </Label>
      <Select
        inputId={name}
        name={name}
        isMulti
        className="react-select-container text-base"
        options={orgOptions}
        value={orgOptions.filter((option) =>
          selectedOrgIds.includes(option.value)
        )}
        onChange={handleOrgChange}
        placeholder="Select organizations"
        isOptionDisabled={() => selectedOrgIds.length >= maxSelection}
        styles={{
          control: (base) => ({
            ...base,
            borderColor: "oklch(0.922 0 0)",
            borderRadius: "8px",
            "&:hover": { borderColor: "#cbd5e0" },
            shadow: "0 0 0 1px oklch(0.922 0 0)",
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

export default OrgsSelect;
