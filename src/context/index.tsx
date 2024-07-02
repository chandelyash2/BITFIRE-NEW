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
  const [selectedMenu, setSelectedMenu] = useState<MenuListEnum | string>("");
  const [selectedEvent, setSelectedEvent] = useState();
  const [pl, setPl] = useState();
  const [betPopup, setBetPopup] = useState(false);
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
        selectedEvent,
        setSelectedEvent,
        pl,
        setPl,
        betPopup,
        setBetPopup,
        betPl,
        setBetPl,
      }}
    >
      {children}
    </CMSModal.Provider>
  );
};
