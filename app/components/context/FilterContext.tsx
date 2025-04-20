import React, { createContext, useContext, useState, ReactNode } from "react";

export type FilterContextType = {
  selectedLangs: string[];
  setSelectedLangs: (langs: string[]) => void;
  selectedLabels: string[];
  setSelectedLabels: (labels: string[]) => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [selectedLangs, setSelectedLangs] = useState<string[]>([]);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  return (
    <FilterContext.Provider value={{ selectedLangs, setSelectedLangs, selectedLabels, setSelectedLabels }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (!context) throw new Error("useFilter must be used within a FilterProvider");
  return context;
}