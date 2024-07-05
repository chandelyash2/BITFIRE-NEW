import React, { useContext, useState } from "react";
import { twMerge } from "tailwind-merge";
import { BetSlipMob } from "../Mobile/BetSlipMob";
import { CMSModal } from "@/context";

export const BetSlip = () => {
  const { selectedBetData } = useContext(CMSModal);
  const [activeSlip, setActiveSlip] = useState("Bet Slip");
  console.log(selectedBetData,"SELLLELLE");
  
  return (
    <div className="flex flex-col gap-4">
      <div className="flex">
        <span
          className={twMerge(
            "w-40 p-2 text-center cursor-pointer",
            activeSlip === "Bet Slip" &&
              "border-b border-secondary text-secondary font-bold "
          )}
          onClick={() => setActiveSlip("Bet Slip")}
        >
          BetSlip
        </span>
        <span
          className={twMerge(
            "w-40 p-2 text-center cursor-pointer",
            activeSlip === "Open Bets" &&
              "border-b border-secondary text-secondary font-bold"
          )}
          onClick={() => setActiveSlip("Open Bets")}
        >
          Open Bets
        </span>
      </div>
      {selectedBetData.marketId && <BetSlipMob />}
    </div>
  );
};
