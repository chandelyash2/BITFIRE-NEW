import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { BetSlipMob } from "../Mobile/BetSlipMob";

export const BetSlip = () => {
  const [activeSlip, setActiveSlip] = useState("Bet Slip");
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
      <BetSlipMob />
    </div>
  );
};
