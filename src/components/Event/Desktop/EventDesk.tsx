import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { MatchOddsDesk } from "./MatchOddsDesk";
import {
  Event,
  User,
  useGetEventMarketQuery,
} from "@/graphql/generated/schema";
import { BetSlip } from "./BetSlip";
import { SkeletonDesk } from "./SkeletonDesk";
import { Image } from "@chakra-ui/react";

export interface EventProp {
  authUser: User;
  eventData: Event | any;
}
const eventTabs = [
  {
    name: "Market",
  },
  {
    name: "Info",
  },
  {
    name: "Watch",
  },
];

export const EventDesk = ({ eventData, authUser }: EventProp) => {
  const [selectedTab, setSelectedTab] = useState("Market");

  const { data, loading, refetch } = useGetEventMarketQuery({
    variables: {
      input: parseInt(eventData?.eventId),
    },
  });
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [eventData?.name, refetch]);
  const matchOddsData = data?.getEventMarket;

  return (
    <div className="hidden lg:flex flex-col gap-4">
      <div className="bg-primary p-3 rounded-md flex justify-between items-center w-full ">
        <h2 className="text-[#3083FF] text-lg font-bold">{eventData?.name}</h2>
        <div className="flex gap-3 bg-highlight text-white/50 text-center text-sm rounded-md">
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
        </div>
      </div>

      <div className="relative flex justify-between">
        <div className="flex flex-col gap-4 flex-none w-[70%]">
          {selectedTab === "Info" && (
            <Image src="/img/Info.png" alt="Info" height={300} />
          )}
          {selectedTab === "Watch" && (
            <Image src="/img/Live.png" alt="Info" height={300} />
          )}
          {matchOddsData &&
            matchOddsData.length > 0 &&
            matchOddsData.map((odds) => (
              <MatchOddsDesk
                oddsData={odds}
                key={odds?.marketId}
                eventData={eventData}
                authUser={authUser}
              />
            ))}
        </div>

        <div className="fixed right-0 bg-[#FFFFFF08] text-white/50 w-[25%] h-[500px]">
          <BetSlip />
        </div>
      </div>
      {loading && <SkeletonDesk />}
    </div>
  );
};
