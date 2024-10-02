import { useContext, useEffect, useRef, useState } from "react";
import { customOrder, EventProp } from "../Desktop/EventDesk";
import { twMerge } from "tailwind-merge";
import { MatchOddsMob } from "./MatchOddsMob";
import {
  useGetBookmakerListQuery,
  useGetEventMarketQuery,
  useGetSelectedFancyQuery,
} from "@/graphql/generated/schema";
import { AspectRatio, useToast } from "@chakra-ui/react";
import { OpenBets } from "./OpenBets";
import { FancyMark } from "./FancyMark";
import { CMSModal } from "@/context";
import { SkeletonComp } from "@/components/common/Skeleton";

const eventTabs = [
  {
    name: "Market",
  },

  {
    name: "Watch",
  },
  {
    name: "Open Bets",
  },
];

export const EventMob = ({ authUser, eventData }: EventProp) => {
  const [selectedTab, setSelectedTab] = useState("Market");
  const { selectedBetData } = useContext(CMSModal);

  const toast = useToast();
  const { data, loading, refetch } = useGetEventMarketQuery({
    variables: {
      input: parseInt(eventData?.eventId),
    },
  });
  const { data: bookMaker, refetch: bookMakerRefetch } =
    useGetBookmakerListQuery({
      skip: eventData?.sportId !== 4,
      variables: { input: parseInt(eventData?.eventId) },
    });
  const { data: fancy, refetch: fancyRefetch } = useGetSelectedFancyQuery({
    skip: eventData?.sportId !== 4,
    variables: {
      eventId: parseInt(eventData?.eventId),
      sportId: eventData?.sportId,
    },
  });
  const containerRef = useRef(null);

  useEffect(() => {
    if (selectedBetData.odds > 0) {
      window.scrollBy({
        top: 200, // Adjust this value as needed
        behavior: "smooth", // Ensures smooth scrolling
      });
    }
  }, [selectedBetData.odds]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
      bookMakerRefetch();
      fancyRefetch();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [bookMakerRefetch, eventData?.name, refetch, fancyRefetch]);
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
      : matchOddsData;
  const bookMakerData = bookMaker?.getBookmakerList;
  const fancyData = fancy?.getSelectedFancy;

  const [fancyTab, setFancyTab] = useState("ALL");

  const uniqueMarketTypes = [
    ...new Set(fancyData && fancyData.map((item: any) => item?.marketType)),
  ];

  // Filter fancyData based on the selected fancyTab
  const filteredFancyData =
    fancyTab === "ALL"
      ? fancyData
      : fancyData?.filter((item: any) => item?.marketType === fancyTab);

  return (
    <div
      className={twMerge("lg:hidden flex flex-col gap-4")}
      ref={containerRef}
    >
      <div className="bg-primary p-3 rounded-md flex justify-center items-center w-full ">
        <h2 className="text-[#3083FF] text-sm font-bold">{eventData?.name}</h2>
      </div>
      <div className="flex items-center h-10 gap-1 bg-highlight text-white/50 text-center text-sm rounded-md">
        {eventTabs.map((tab) => (
          <span
            className={twMerge(
              "rounded-md cursor-pointer w-32 md:w-52 h-10 flex items-center justify-center",
              tab.name === selectedTab && "bg-secondary text-black font-bold"
            )}
            key={tab.name}
            onClick={() => {
              if (authUser?._id) {
                setSelectedTab(tab.name);
              } else {
                return toast({
                  description: "Login Required",
                  status: "warning",
                });
              }
            }}
          >
            {tab.name}
          </span>
        ))}
      </div>
      {selectedTab === "Market" && authUser?._id && (
        <iframe
          title="score"
          src={`https://score.hr08bets.in/api?eventid=${eventData?.eventId}`}
          allowFullScreen
        />
      )}

      {selectedTab === "Watch" && (
        <AspectRatio maxW="560px" maxHeight="190px" ratio={1}>
          <iframe
            title="stream"
            src={`https://dpmatka.in/dcasino/nntv.php?MatchID=${eventData?.eventId}`}
            allowFullScreen
            frameBorder="0"
          />
        </AspectRatio>
      )}

      {selectedTab === "Open Bets" ? (
        <OpenBets />
      ) : (
        <div className="flex flex-col gap-6 ">
          {sortedData &&
            sortedData.length > 0 &&
            sortedData.map((odds: any) => (
              <MatchOddsMob
                oddsData={odds}
                key={odds?.marketId}
                eventData={eventData}
                authUser={authUser}
              />
            ))}
          {bookMakerData &&
            bookMakerData.length > 0 &&
            bookMakerData.map((odds) => (
              <MatchOddsMob
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
              <div className="flex rounded-md overflow-auto w-full items-center">
                <div
                  className={twMerge(
                    "w-[100px] bg-[#171717] text-left text-[10px] font-bold py-2 px-3 text-center cursor-pointer",
                    fancyTab === "ALL" ? "text-secondary" : "text-text"
                  )}
                  onClick={() => setFancyTab("ALL")}
                >
                  All
                </div>
                {uniqueMarketTypes.map((items) => (
                  <div
                    className={twMerge(
                      "w-[100px] bg-[#171717] text-left text-[10px] font-bold py-2 px-3 text-center cursor-pointer",
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
      )}
      {loading && <SkeletonComp />}
    </div>
  );
};
