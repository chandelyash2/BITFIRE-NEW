import { useEffect, useState } from "react";
import { EventProp } from "../Desktop/EventDesk";
import { twMerge } from "tailwind-merge";
import { MatchOddsMob } from "./MatchOddsMob";
import {
  useGetBookmakerListQuery,
  useGetEventMarketQuery,
  useGetFancyQuery,
} from "@/graphql/generated/schema";
import { SkeletonComp } from "@/components/common/Skeleton";
import { Image } from "@chakra-ui/react";
import { OpenBets } from "./OpenBets";

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

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
      bookMakerRefetch();
      fancyRefetch();
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [bookMakerRefetch, eventData?.name, fancyRefetch, refetch]);
  const matchOddsData = data?.getEventMarket;
  const bookMakerData = bookMaker?.getBookmakerList;
  const fancyData = fancy?.getFancy;

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
        <Image src="/img/Info.png" alt="Info" height={150} />
      )}
      {selectedTab === "Watch" && (
        <Image src="/img/Live.png" alt="Info" height={150} />
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
              {bookMakerData && bookMakerData.length > 0 ? (
            bookMakerData.map((odds) => (
              <MatchOddsMob
                oddsData={odds}
                key={odds?.marketId}
                eventData={eventData}
                authUser={authUser}
              />
            ))
          ) : (
            <SkeletonComp />
          )}
          {fancyData && fancyData.length > 0 ? (
            fancyData.map((odds) => (
              <MatchOddsMob
                oddsData={odds}
                key={odds?.marketId}
                eventData={eventData}
                authUser={authUser}
              />
            ))
          ) : (
            <SkeletonComp />
          )}
        </div>
      )}

      {loading && <SkeletonComp />}
    </div>
  );
};
