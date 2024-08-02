import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { MatchOddsDesk } from "./MatchOddsDesk";
import {
  Event,
  MarketType,
  User,
  useGetBookmakerListQuery,
  useGetEventMarketOddsQuery,
  useGetEventMarketQuery,
  useGetFancyQuery,
} from "@/graphql/generated/schema";
import { BetSlip } from "./BetSlip";
import { SkeletonDesk } from "./SkeletonDesk";
import { Image } from "@chakra-ui/react";
import { SkeletonComp } from "@/components/common/Skeleton";
import { FancyMark } from "../Mobile/FancyMark";

export interface EventProp {
  authUser: User;
  eventData: Event | any;
}

const eventTabs = [{ name: "Market" }, { name: "Info" }, { name: "Watch" }];

export const EventDesk = ({ eventData, authUser }: EventProp) => {
  const [selectedTab, setSelectedTab] = useState("Market");
  const [fancyTab, setFancyTab] = useState("ALL");

  const { data, loading, refetch } = useGetEventMarketQuery({
    variables: { input: parseInt(eventData?.eventId) },
  });
  const { data: bookMaker, refetch: bookMakerRefetch } =
    useGetBookmakerListQuery({
      variables: { input: parseInt(eventData?.eventId) },
    });
  const { data: fancy, refetch: fancyRefetch } = useGetFancyQuery({
    variables: { input: parseInt(eventData?.eventId) },
  });
  const { data: eventOdd, refetch: eventRefetch } = useGetEventMarketOddsQuery({
    variables: { input: parseInt(eventData?.eventId) },
  });

  const fancyData = fancy?.getFancy;

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
      bookMakerRefetch();
      fancyRefetch();
      eventRefetch();
    }, 2000);
    return () => clearInterval(interval);
  }, [eventData?.name, refetch, bookMakerRefetch, fancyRefetch, eventRefetch]);

  const matchOddsData = data?.getEventMarket;
  const bookMakerData = bookMaker?.getBookmakerList;
  const eventDataOdds = eventOdd?.getEventMarketOdds;

  const uniqueMarketTypes = [
    ...new Set(fancyData && fancyData.map((item: any) => item.marketType)),
  ];

  // Filter fancyData based on the selected fancyTab
  const filteredFancyData =
    fancyTab === "ALL"
      ? fancyData
      : fancyData?.filter((item: any) => item.marketType === fancyTab);

  return (
    <div className="hidden lg:flex flex-col gap-4">
      <div className="bg-primary p-3 rounded-md flex justify-between items-center w-full">
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
          {bookMakerData &&
            bookMakerData.length > 0 &&
            bookMakerData.map((odds) => (
              <MatchOddsDesk
                oddsData={odds}
                key={odds?.marketId}
                eventData={eventData}
                authUser={authUser}
              />
            ))}

          {fancyData && fancyData.length > 0 && (
            <div>
              <div className="w-[200px] bg-[#171717] text-secondary text-left text-sm font-bold py-2 px-3 text-center rounded-md">
                Fancy
              </div>
              <div className="flex rounded-md">
                <div
                  className={twMerge(
                    "w-[200px] bg-[#171717] text-left text-xs font-bold py-2 px-3 text-center cursor-pointer",
                    fancyTab === "ALL" ? "text-secondary" : "text-text"
                  )}
                  onClick={() => setFancyTab("ALL")}
                >
                  All
                </div>
                {uniqueMarketTypes.map((items) => (
                  <div
                    className={twMerge(
                      "w-[200px] bg-[#171717] text-left text-xs font-bold py-2 px-3 text-center cursor-pointer",
                      fancyTab === items ? "text-secondary" : "text-text"
                    )}
                    key={items}
                    onClick={() => setFancyTab(items)}
                  >
                    {items}
                  </div>
                ))}
              </div>

              {filteredFancyData &&
                filteredFancyData.length > 0 &&
                filteredFancyData.map(
                  (odds) =>
                    odds?.runners && (
                      <FancyMark
                        oddsData={odds}
                        key={odds?.marketId}
                        eventData={eventData}
                        authUser={authUser}
                      />
                    )
                )}
            </div>
          )}

          {eventDataOdds &&
            eventDataOdds.length > 0 &&
            eventDataOdds.map((odds) => (
              <MatchOddsDesk
                oddsData={odds}
                key={odds?.marketId}
                eventData={eventData}
                authUser={authUser}
              />
            ))}
        </div>

        <div className="fixed right-0 bg-[#FFFFFF08] text-white/50 w-[25%] h-[500px]">
          <BetSlip authUser={authUser} />
        </div>
      </div>
      {loading && <SkeletonDesk />}
    </div>
  );
};
