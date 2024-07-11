"use client";
import { useGetEventPlQuery } from "@/graphql/generated/schema";
import React from "react";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { SkeletonComp } from "../common/Skeleton";
import moment from "moment";
import { twMerge } from "tailwind-merge";
import { inPlaySports } from "../InPlay";

export const PL = () => {
  const { data, loading } = useGetEventPlQuery();
  const plData = data?.getEventPL;
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-primary text-[#3083FF] p-3 rounded-md text-xl font-bold">
        <h2 className="flex gap-2 items-center">
          <FaMoneyBillTransfer />
          Total Profit/Loss
        </h2>
      </div>
      {loading && <SkeletonComp />}
      <div>
        {plData?.map((pl) => (
          <div
            className={twMerge(
              "flex flex-col p-2 text-text text-xs lg:text-sm"
            )}
            key={pl?.eventId}
          >
            <div className="flex gap-3 border-b border-text pb-4 flex-wrap justify-between items-center">
              <h4 className="text-white font-bold"> {pl?.name}</h4>
              <h4>{moment(pl?.date).format("MMMM Do YYYY, h:mm a")}</h4>
              <h4 className="text-secondary font-bold">
                {inPlaySports.find((sport) => sport.id === pl?.sport)?.name}
              </h4>

              <h4
                className={twMerge(
                  "font-bold",
                  pl?.pl && pl?.pl < 0 ? "text-red-600" : "text-green-600"
                )}
              >
                Total PL: {pl?.pl}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
