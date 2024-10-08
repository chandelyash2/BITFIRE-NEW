import { useEffect, useState } from "react";
import { EventProp } from "../Desktop/EventDesk";
import { twMerge } from "tailwind-merge";
import { MatchOddsMob } from "./MatchOddsMob";
import {
  useGetBookmakerListQuery,
  useGetEventMarketOddsQuery,
  useGetEventMarketQuery,
  useGetFancyQuery,
} from "@/graphql/generated/schema";
import { SkeletonComp } from "@/components/common/Skeleton";
import { AspectRatio, Image, Spinner } from "@chakra-ui/react";
import { OpenBets } from "./OpenBets";
import { FancyMark } from "./FancyMark";

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
  {
    name: "Open Bets",
  },
];

export const EventMob = ({ authUser, eventData }: EventProp) => {
  const [selectedTab, setSelectedTab] = useState("Market");
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };
  const { data, loading, refetch } = useGetEventMarketQuery({
    variables: {
      input: parseInt(eventData?.eventId),
    },
  });
  const { data: bookMaker, refetch: bookMakerRefetch } =
    useGetBookmakerListQuery({
      variables: {
        input: parseInt(eventData?.eventId),
      },
    });

  const { data: fancy, refetch: fancyRefetch } = useGetFancyQuery({
    variables: {
      input: parseInt(eventData?.eventId),
    },
  });
  const { data: eventOdd, refetch: eventRefetch } = useGetEventMarketOddsQuery({
    variables: {
      input: parseInt(eventData?.eventId),
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
      bookMakerRefetch();
      eventRefetch();
      fancyRefetch();
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [bookMakerRefetch, eventData?.name, refetch, eventRefetch, fancyRefetch]);
  const matchOddsData = data?.getEventMarket;
  const bookMakerData = bookMaker?.getBookmakerList;
  const fancyData = fancy?.getFancy;
  const eventDataOdds = eventOdd?.getEventMarketOdds;
  const [fancyTab, setFancyTab] = useState("ALL");

  const uniqueMarketTypes = [
    ...new Set(fancyData && fancyData.map((item: any) => item.marketType)),
  ];

  // Filter fancyData based on the selected fancyTab
  const filteredFancyData =
    fancyTab === "ALL"
      ? fancyData
      : fancyData?.filter((item: any) => item.marketType === fancyTab);
  return (
    <div className="lg:hidden flex flex-col gap-4">
      <div className="bg-primary p-3 rounded-md flex justify-center items-center w-full ">
        <h2 className="text-[#3083FF] text-sm font-bold">{eventData?.name}</h2>
      </div>
      <div className="flex items-center h-10 gap-1 bg-highlight text-white/50 text-center text-sm rounded-md">
        {eventTabs.map((tab) => (
          <span
            className={twMerge(
              "rounded-md cursor-pointer w-24 md:w-52 h-10 flex items-center justify-center",
              tab.name === selectedTab && "bg-secondary text-black font-bold"
            )}
            key={tab.name}
            onClick={() => setSelectedTab(tab.name)}
          >
            {tab.name}
          </span>
        ))}
      </div>
      {selectedTab === "Info" && (
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
            sandbox="allow-same-origin allow-scripts allow-popups"
          />
        </AspectRatio>
      )}

      {selectedTab === "Open Bets" ? (
        <OpenBets />
      ) : (
        <div className="flex flex-col gap-6 ">
          {matchOddsData &&
            matchOddsData.length > 0 &&
            matchOddsData.map((odds) => (
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
              <MatchOddsMob
                oddsData={odds}
                key={odds?.marketId}
                eventData={eventData}
                authUser={authUser}
              />
            ))}
        </div>
      )}

      {loading && <SkeletonComp />}
    </div>
  );
};
