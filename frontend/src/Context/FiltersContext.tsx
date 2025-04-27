import React, { createContext, useContext, useState, useEffect } from "react";
import { FilterState } from "../types";

const initialFilters: FilterState = {
  orgSearchText: undefined,
  minDate: undefined,
  maxDate: undefined,
  orgIds: [],
  interval: "quarter",
};

const isNumber = (value: string | number): boolean => {
  return !isNaN(Number(String(value))) && !isNaN(parseFloat(String(value)));
};

/**
 * Function to parse URL parameters to their respective types
 * @param {string} value - The value from the URL parameter
 * @returns {string | number | Array<string>} - The parsed value
 */
const parseParamToValue = (value: string): string | number | Array<string> => {
  if (value.includes(",")) {
    return value.split(",").map((v) => v.trim());
  }
  if (isNumber(value)) {
    const numValue = Number(value);
    return Number.isInteger(numValue) ? numValue : parseFloat(value);
  }
  return value;
};

const FiltersContext = createContext<{
  filters: FilterState;
  updateFilter: (name: string, value: string | string[] | number) => void;
}>({
  filters: initialFilters,
  updateFilter: () => {},
});

/**
 * Function to get filters from URL
 * @returns {FilterState} - The current filter state
 */
const getFiltersFromURL = (): FilterState => {
  const params = new URLSearchParams(window.location.search);
  const filters: FilterState = { ...initialFilters };

  params.forEach((value, key) => {
    if (key in filters) {
      const parsedValue = parseParamToValue(value);
      // @ts-ignore
      filters[key] = parsedValue;
    }
  });

  return filters;
};

export const FiltersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filters, setFilters] = useState<FilterState>(getFiltersFromURL);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    for (const key in filters) {
      // @ts-ignore
      if (Array.isArray(filters[key]) && filters[key].length === 0) {
        params.delete(key);
        // @ts-ignore
      } else if (Array.isArray(filters[key])) {
        // @ts-ignore
        params.set(key, filters[key].join(","));
        // @ts-ignore
      } else if (filters[key]) {
        // @ts-ignore
        params.set(key, String(filters[key]));
      } else {
        params.delete(key);
      }
    }

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    window.history.replaceState(null, "", newUrl);
  }, [filters]);

  const updateFilter = (name: string, value: string[] | string | number) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <FiltersContext.Provider value={{ filters, updateFilter }}>
      {children}
    </FiltersContext.Provider>
  );
};

/**
 *  Custom hook to use the FiltersContext
 * @returns { filters: FilterState, updateFilter: (name: string, value: string | string[] | number) => void }
 */
export const useFilters = () => useContext(FiltersContext);
