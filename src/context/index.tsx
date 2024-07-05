"use client";

import { BetSlipType, MenuListEnum } from "@/types";
import { useState } from "react";
import { createContext } from "react";

export const CMSModal = createContext<any>(null);

export const CMSContext = ({ children }: { children: React.ReactNode }) => {
  const [selectedBetData, setSelectedBetData] = useState<BetSlipType>({
    odds: 0,
    label: "",
    selectedTeam: "",
    selectedBet: "",
  });
  const [activeSport, setActiveSport] = useState({
    id: 4,
    name: "Cricket",
  });

  return (
    <CMSModal.Provider
      value={{
        selectedBetData,
        setSelectedBetData,
        activeSport,
        setActiveSport,
      }}
    >
      {children}
    </CMSModal.Provider>
  );
};
