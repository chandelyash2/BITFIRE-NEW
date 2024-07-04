import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

export const BetSlip = () => {
  const [activeSlip, setActiveSlip] = useState("Bet Slip");
  return (
    <div>
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
    </div>
  );
};
