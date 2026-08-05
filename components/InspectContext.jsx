"use client";

import { createContext, useContext, useState } from "react";

const InspectContext = createContext({ inspecting: false, toggle: () => {} });

export function InspectProvider({ children }) {
  const [inspecting, setInspecting] = useState(false);
  return (
    <InspectContext.Provider
      value={{ inspecting, toggle: () => setInspecting((v) => !v) }}
    >
      {children}
    </InspectContext.Provider>
  );
}

export function useInspect() {
  return useContext(InspectContext);
}
