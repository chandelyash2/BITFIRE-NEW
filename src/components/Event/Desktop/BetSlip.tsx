import { useContext, useState } from "react";
import { twMerge } from "tailwind-merge";
import { BetSlipMob } from "../Mobile/BetSlipMob";
import { CMSModal } from "@/context";
import { ProfileProp } from "..";
import { OpenBets } from "../Mobile/OpenBets";

export const BetSlip = ({ authUser }: ProfileProp) => {
  const { selectedBetData, activeSlip, setActiveSlip } = useContext(CMSModal);

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
          Bet Slip
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
      {selectedBetData.marketId && activeSlip === "Bet Slip" && (
        <BetSlipMob authUser={authUser} />
      )}
      {activeSlip === "Open Bets" && <OpenBets />}
    </div>
  );
};
