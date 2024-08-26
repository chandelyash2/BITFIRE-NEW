import { BetSlip } from "@/components/Event/Desktop/BetSlip";
import { eventTabs } from "@/components/Event/Desktop/EventDesk";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { RacingEventDesk } from "./RacingEventDesk";
import { MatchOddsProp } from "../Mobile/RacingEventsMob";

export const EventsDeskNew = ({
  authUser,
  eventData,
  oddsData,
}: MatchOddsProp) => {

  return (
    <div className="hidden lg:flex flex-col gap-4">
      <div className="bg-primary p-3 rounded-md flex justify-between items-center w-full">
        <h2 className="text-[#3083FF] text-lg font-bold">{eventData?.name}</h2>
        {/* <div className="flex gap-3 bg-highlight text-white/50 text-center text-sm rounded-md">
          {eventTabs.map((tab) => (
            <span
              className={twMerge(
                "w-32 p-2 rounded-md cursor-pointer",
                tab.name === selectedTab && "bg-secondary text-black font-bold"
              )}
              key={tab.name}
              onClick={() => setSelectedTab(tab.name)}
            >
              {tab.name}
            </span>
          ))}
        </div> */}
      </div>
      <div className="relative lg:flex justify-between">
        <div className="flex-none w-[70%]">
          <RacingEventDesk
            authUser={authUser}
            oddsData={oddsData}
            eventData={eventData}
          />
        </div>
        <div className="fixed right-0 bg-[#FFFFFF08] text-white/50 w-[25%] h-[500px]">
          <BetSlip authUser={authUser} />
        </div>
      </div>
    </div>
  );
};
