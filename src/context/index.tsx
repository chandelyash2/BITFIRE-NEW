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
  const [activeSlip, setActiveSlip] = useState("Bet Slip");
  const [betPl, setBetPl] = useState({
    selelctionId: "",
    profit: 0,
    loss: 0,
    type: "",
    marketId: "",
});

  return (
    <CMSModal.Provider
      value={{
        selectedBetData,
        setSelectedBetData,
        activeSport,
        setActiveSport,
        activeSlip,
        setActiveSlip,
        betPl,
        setBetPl,
      }}
    >
      {children}
    </CMSModal.Provider>
  );
};
