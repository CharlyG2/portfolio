"use client";

import { InspectProvider } from "./InspectContext";
import GridOverlay from "./GridOverlay";
import Ruler from "./Ruler";
import InspectToggle from "./InspectToggle";

export default function InspectShell({ children }) {
  return (
    <InspectProvider>
      {children}
      <GridOverlay />
      <Ruler />
      <InspectToggle />
    </InspectProvider>
  );
}
