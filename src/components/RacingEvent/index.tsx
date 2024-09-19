"use client";
import { RacingEventsMob } from "./Mobile/RacingEventsMob";
import {
  useGetEventQuery,
  useGetRaceMarketQuery,
  useGetRaceQuery,
} from "@/graphql/generated/schema";
import { usePathname } from "next/navigation";
import { ProfileProp } from "../Event";
import { EventsDeskNew } from "./Desktop/EventsDeskNew";
import { useEffect } from "react";
import { Loader } from "../common/Loader";
import { decryptData } from "@/utils/crypto";

export const RacingEvent = () => {
  const pathName = usePathname();
  const eventId = pathName.split("/")[2];
  const marketId = pathName.split("/")[3];
  const { data } = useGetRaceQuery({
    variables: {
      input: eventId,
    },
  });
  const eventData = data?.getRace;

  const {
    data: marketdata,
    loading,
    refetch,
  } = useGetRaceMarketQuery({
    variables: {
      input: marketId,
    },
  });
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [eventData?.name, refetch]);
  const marketData = marketdata?.getRaceMarket;
  const encryptedData: any = localStorage.getItem("userData");
  const decryptedData = decryptData(encryptedData);
  const authUser = JSON.parse(decryptedData);
  return (
    <div>
      <EventsDeskNew
        authUser={authUser}
        eventData={eventData}
        oddsData={marketData}
      />
      <RacingEventsMob
        authUser={authUser}
        eventData={eventData}
        oddsData={marketData}
      />
      {loading && <Loader />}
    </div>
  );
};
