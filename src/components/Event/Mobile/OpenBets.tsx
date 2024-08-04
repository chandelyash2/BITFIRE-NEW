import { SkeletonComp } from "@/components/common/Skeleton";
import {
  useOpenBetsQuery,
  BetEnumType,
  useBetSubscription,
  BetType,
} from "@/graphql/generated/schema";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";
import { twMerge } from "tailwind-merge";

export const OpenBets = () => {
  const { data, refetch, loading } = useOpenBetsQuery({
    variables: {
      input: BetEnumType.Open,
    },
  });
  const { data: settleBet } = useBetSubscription();
  const settleBetData = settleBet?.betSettleSub;
  const betsData = data?.openBets;

  const [expandedEvents, setExpandedEvents] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    refetch();
  }, [settleBetData]);

  useEffect(() => {
    if (betsData) {
      const initialExpandedState = betsData.reduce((acc: any, bet: any) => {
        acc[bet.eventName] = true;
        return acc;
      }, {});
      setExpandedEvents(initialExpandedState);
    }
  }, [betsData]);

  const groupedBets = betsData?.reduce((acc: any, bet: any) => {
    if (!acc[bet.eventName]) {
      acc[bet.eventName] = [];
    }
    acc[bet.eventName].push(bet);
    return acc;
  }, {});

  const toggleEvent = (eventName: string) => {
    setExpandedEvents((prev) => ({
      ...prev,
      [eventName]: !prev[eventName],
    }));
  };

  return (
    <div className="flex flex-col gap-1 mt-4 p-2">
      {loading && <SkeletonComp />}
      {groupedBets && Object.keys(groupedBets).length > 0 ? (
        Object.keys(groupedBets).map((eventName) => (
          <div key={eventName}>
            <h3
              className="font-bold text-sm p-2 rounded-t-lg flex gap-1 cursor-pointer bg-[#171717] text-secondary"
              onClick={() => toggleEvent(eventName)}
            >
              {eventName}
              <span className="text-xl">
                {expandedEvents[eventName] ? (
                  <MdOutlineKeyboardArrowUp />
                ) : (
                  <MdOutlineKeyboardArrowDown />
                )}
              </span>
            </h3>
            {expandedEvents[eventName] &&
              groupedBets[eventName].map((item: BetType) => (
                <Link
                  href={`/event/${item.eventId}`}
                  className={twMerge(
                    "flex flex-col p-2 text-text text-xs lg:text-sm"
                  )}
                  key={item._id}
                >
                  <div className="flex flex-col gap-3 border-b border-text pb-4 ">
                    <div className="flex items-center justify-between gap-8">
                      <div className="flex gap-2 items-center">
                        <span
                          className={twMerge(
                            "p-2 rounded-lg",
                            item.betType === "back"
                              ? "text-[#0078FF] bg-[#0078FF38]"
                              : "text-[#FF008B] bg-[#FF008B36]"
                          )}
                        >
                          {item.bettingType === "LINE" ? item.run : item.odds}
                        </span>
                        <h4 className="text-white font-bold">
                          {item.runnerName}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2 bg-[#161616] p-3 rounded">
                        Stake:
                        <span className="font-bold">{item.stake}</span>
                      </div>
                    </div>
                    <div className="flex justify-between  gap-4 items-center">
                      <div className="flex items-center justify-center gap-1 text-green-600">
                        <TbTriangleFilled />
                        Profit: {item.profit}
                      </div>
                      <div className="flex items-center justify-center gap-1 text-red-600">
                        <TbTriangleInvertedFilled />
                        Loss: {item.loss}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        ))
      ) : (
        <h3 className="text-white font-bold text-center ">
          No Bets To Show !!!
        </h3>
      )}
    </div>
  );
};
