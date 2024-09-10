"use client";
import { useGetEventPlQuery } from "@/graphql/generated/schema";
import React from "react";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import moment from "moment";
import { twMerge } from "tailwind-merge";
import { inPlaySports } from "../InPlay";
import { Loader } from "../common/Loader";

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
      {loading && <Loader />}
      <div>
        {plData && plData?.length > 0 ? (
          plData?.map((pl) => (
            <div
              className={twMerge(
                "flex flex-col p-2 text-text text-xs lg:text-sm"
              )}
              key={pl?.eventId}
            >
              <div className="grid grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-text pb-4  items-center">
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
          ))
        ) : (
          <h3 className="my-[30%] text-text font-bold text-center left-[30%]">
            No List To Show !!!
          </h3>
        )}
      </div>
    </div>
  );
};
