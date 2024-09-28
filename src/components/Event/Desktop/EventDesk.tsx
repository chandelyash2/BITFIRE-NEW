import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { MatchOddsDesk } from "./MatchOddsDesk";
import {
  Event,
  User,
  useGetBookmakerListQuery,
  useGetEventMarketQuery,
  useGetFancyQuery,
} from "@/graphql/generated/schema";
import { BetSlip } from "./BetSlip";
import { AspectRatio, useToast } from "@chakra-ui/react";
import { FancyMark } from "../Mobile/FancyMark";
import { SkeletonDesk } from "./SkeletonDesk";

export interface EventProp {
  authUser: User;
  eventData: Event | any;
}
export const customOrderCrick = [
  "Match Odds",
  "Bookmaker",
  // add more conditions as needed
];
export const customOrder = [
  "Match Odds",
  "Half Time",
  "First Half Goals 0.5",
  "First Half Goals 1.5",
  "First Half Goals 2.5",
  "Over/Under 0.5 Goals",
  "Over/Under 1.5 Goals",
  "Over/Under 2.5 Goals",
  "Over/Under 3.5 Goals",
  // add more conditions as needed
];
export const eventTabs = [{ name: "Market" }, { name: "Watch" }];

export const EventDesk = ({ eventData, authUser }: EventProp) => {
  const [selectedTab, setSelectedTab] = useState("Market");
  const [fancyTab, setFancyTab] = useState("ALL");
  const toast = useToast();
  const { data, loading, refetch } = useGetEventMarketQuery({
    variables: { input: parseInt(eventData?.eventId) },
  });
  const { data: bookMaker, refetch: bookMakerRefetch } =
    useGetBookmakerListQuery({
      skip: eventData?.sportId !== 4,
      variables: { input: parseInt(eventData?.eventId) },
    });
  const { data: fancy, refetch: fancyRefetch } = useGetFancyQuery({
    skip: eventData?.sportId !== 4,
    variables: {
      eventId: parseInt(eventData?.eventId),
      sportId: eventData?.sportId,
    },
  });

  const fancyData = fancy?.getFancy;

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();

      if (eventData?.sportId === 4) {
        bookMakerRefetch();
        fancyRefetch();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [eventData?.name, refetch, bookMakerRefetch, fancyRefetch]);

  const matchOddsData = data?.getEventMarket;
  // Sorting logic
  const sortedData =
    eventData?.sportId === 1
      ? matchOddsData?.sort((a: any, b: any) => {
          const indexA = customOrder.indexOf(a.marketName);
          const indexB = customOrder.indexOf(b.marketName);

          // If both items exist in the custom order, sort by the custom order
          if (indexA !== -1 && indexB !== -1) {
            return indexA - indexB;
          }

          // If one item exists in the custom order, it comes first
          if (indexA !== -1) return -1;
          if (indexB !== -1) return 1;

          // If neither item is in the custom order, sort them alphabetically (or by some other criteria)
          return a.marketName.localeCompare(b.marketName);
        })
      : eventData?.sportId === 4
      ? matchOddsData?.sort((a: any, b: any) => {
          const indexA = customOrderCrick.indexOf(a.marketName);
          const indexB = customOrderCrick.indexOf(b.marketName);

          // If both items exist in the custom order, sort by the custom order
          if (indexA !== -1 && indexB !== -1) {
            return indexA - indexB;
          }

          // If one item exists in the custom order, it comes first
          if (indexA !== -1) return -1;
          if (indexB !== -1) return 1;

          // If neither item is in the custom order, sort them alphabetically (or by some other criteria)
          return a.marketName.localeCompare(b.marketName);
        })
      : matchOddsData;
  const bookMakerData = bookMaker?.getBookmakerList;

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
              onClick={() => {
                if (authUser?._id) {
                  setSelectedTab(tab.name);
                } else {
                  return toast({
                    description: "Login Required",
                    status: "error",
                  });
                }
              }}
            >
              {tab.name}
            </span>
          ))}
        </div>
      </div>

      <div className="relative flex justify-between">
        <div className="flex flex-col gap-4 flex-none w-[70%]">
          {selectedTab === "Market" && (
            <iframe
              title="score"
              src={`https://score.hr08bets.in/api?eventid=${eventData?.eventId}`}
              allowFullScreen
            />
          )}

          {selectedTab === "Watch" && (
            <AspectRatio maxW="560px" maxHeight="310px" ratio={1}>
              <iframe
                title="stream"
                src={`https://dpmatka.in/dcasino/nntv.php?MatchID=${eventData?.eventId}`}
                allowFullScreen
                frameBorder="0"
                sandbox="allow-same-origin allow-scripts allow-popups"
                style={{ left: "35%" }}
              />
            </AspectRatio>
          )}

          {sortedData &&
            sortedData.length > 0 &&
            sortedData.map((odds: any) => (
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
              <div className="flex rounded-md items-center">
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
                    odds && (
                      <FancyMark
                        oddsData={odds}
                        key={odds?.selectionId}
                        eventData={eventData}
                        authUser={authUser}
                      />
                    )
                )}
            </div>
          )}
        </div>

        <div className="fixed right-0 bg-[#FFFFFF08] text-white/50 w-[25%] h-[500px]">
          <BetSlip authUser={authUser} />
        </div>
      </div>
      {loading && <SkeletonDesk />}
    </div>
  );
};
