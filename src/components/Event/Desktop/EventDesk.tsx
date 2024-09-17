import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { MatchOddsDesk } from "./MatchOddsDesk";
import {
  BookmakerMarketType,
  Event,
  EventMarketType,
  FancyMarket,
  MarketType,
  User,
} from "@/graphql/generated/schema";
import { BetSlip } from "./BetSlip";
import { AspectRatio, useToast } from "@chakra-ui/react";
import { FancyMark } from "../Mobile/FancyMark";


export interface EventProp {
  authUser: User;
  eventData: Event | any;
  eventMarket: EventMarketType[] | any;
  bookMakerMarket: BookmakerMarketType[] | any;
  fancyMarket: FancyMarket[] | any;
}

export const eventTabs = [
  { name: "Market" },
  { name: "Info" },
  { name: "Watch" },
];

export const EventDesk = ({
  eventData,
  authUser,
  eventMarket,
  fancyMarket,
  bookMakerMarket,
}: EventProp) => {
  const [selectedTab, setSelectedTab] = useState("Market");
  const [fancyTab, setFancyTab] = useState("ALL");
  const toast = useToast();

  const uniqueMarketTypes = [
    ...new Set(fancyMarket && fancyMarket.map((item: any) => item.marketType)),
  ];

  // Filter fancyData based on the selected fancyTab
  const filteredFancyData =
    fancyTab === "ALL"
      ? fancyMarket
      : fancyMarket?.filter((item: any) => item.marketType === fancyTab);

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
                if (authUser._id) {
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
          {selectedTab === "Info" && (
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

          {eventMarket &&
            eventMarket.length > 0 &&
            eventMarket.map((odds: any) => (
              <MatchOddsDesk
                oddsData={odds}
                key={odds?.marketId}
                eventData={eventData}
                authUser={authUser}
              />
            ))}
          {bookMakerMarket &&
            bookMakerMarket.length > 0 &&
            bookMakerMarket.map((odds:MarketType) => (
              <MatchOddsDesk
                oddsData={odds}
                key={odds?.marketId}
                eventData={eventData}
                authUser={authUser}
              />
            ))}

          {fancyMarket && fancyMarket.length > 0 && (
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
                {uniqueMarketTypes.map((items:any) => (
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
                  (odds:any) =>
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
    </div>
  );
};
