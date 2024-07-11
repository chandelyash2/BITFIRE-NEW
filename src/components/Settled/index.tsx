"use client";
import {
  BetEnumType,
  BetType,
  useOpenBetsQuery,
} from "@/graphql/generated/schema";
import { IoLockClosed } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import { SkeletonComp } from "../common/Skeleton";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { RiArrowUpDownLine } from "react-icons/ri";

export const Settled = () => {
  const { data, loading } = useOpenBetsQuery({
    variables: { input: BetEnumType.Settle },
  });
  const betsData: any = data?.openBets;
  const [expandedEvents, setExpandedEvents] = useState<{
    [key: string]: boolean;
  }>({});

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
    <div className="flex flex-col gap-4">
      <div className="bg-primary text-[#3083FF] p-3 rounded-md text-xl font-bold">
        <h2 className="flex gap-2 items-center">
          <IoLockClosed />
          Settled Bets
        </h2>
      </div>
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
                <div
                  className={twMerge(
                    "flex flex-col p-2 text-text text-xs lg:text-sm"
                  )}
                  key={item._id}
                >
                  <div className="flex gap-3 border-b border-text pb-4 flex-wrap justify-between items-center text-center">
                    <span
                      className={twMerge(
                        "p-2 rounded-lg",
                        item.betType === "back"
                          ? "text-[#0078FF] bg-[#0078FF38]"
                          : "text-[#FF008B] bg-[#FF008B36]"
                      )}
                    >
                      {item.odds}
                    </span>
                    <h4 className="text-white font-bold">{item.runnerName}</h4>
                    <h4 className="text-[10px] md:text-sm">
                      {moment(item.createdAt).format("MMMM Do YYYY, h:mm a")}
                    </h4>

                    <div className="flex items-center gap-2 bg-[#161616] p-3 rounded">
                      Stake:
                      <span className="font-bold">{item.stake}</span>
                    </div>

                    <div
                      className={twMerge(
                        "flex items-center justify-center gap-1",
                        item.win ? "text-green-600" : " text-red-600"
                      )}
                    >
                      <RiArrowUpDownLine />
                      Winning:{item?.win ? item.profit : item?.loss}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ))
      ) : (
        <h3 className="my-[30%] font-bold text-center left-[30%]">
          No Bets To Show !!!
        </h3>
      )}
    </div>
  );
};
