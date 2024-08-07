"use client";
import { RacingEventsMob } from "./Mobile/RacingEventsMob";
import {
  useGetEventQuery,
  useGetMarketDataQuery,
} from "@/graphql/generated/schema";
import { usePathname } from "next/navigation";
import { ProfileProp } from "../Event";
import { EventsDeskNew } from "./Desktop/EventsDeskNew";
import { useEffect } from "react";
import { SkeletonComp } from "../common/Skeleton";

export const RacingEvent = ({ authUser }: ProfileProp) => {
  const pathName = usePathname();
  const eventId = pathName.split("/")[2];
  const marketId = pathName.split("/")[3];
  const { data } = useGetEventQuery({
    variables: {
      eventId: parseInt(eventId),
    },
  });
  const eventData = data?.getEvent;
  const {
    data: marketdata,
    loading,
    refetch,
  } = useGetMarketDataQuery({
    variables: {
      input: {
        marketId,
        eventId: parseInt(eventId),
      },
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
  const marketData = marketdata?.getMarketData;
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
      {loading && <SkeletonComp />}
    </div>
  );
};
