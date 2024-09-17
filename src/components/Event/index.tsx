"use client";
import { usePathname } from "next/navigation";
import { EventDesk } from "./Desktop/EventDesk";
import {
  User,
  useGetBookmakerListQuery,
  useGetEventMarketQuery,
  useGetEventQuery,
  useGetFancyQuery,
} from "@/graphql/generated/schema";
import { EventMob } from "./Mobile/EventMob";
import { useEffect, useState } from "react";
import { SkeletonComp } from "../common/Skeleton";
import { SkeletonDesk } from "./Desktop/SkeletonDesk";

export interface ProfileProp {
  authUser: User;
  onProfileClose?: () => void;
}

export const Event = ({ authUser }: ProfileProp) => {
  const pathName = usePathname();
  const eventId = pathName.split("/")[2];

  // State to manage data and loading states
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [eventData, setEventData] = useState<any>(null);
  const [matchOddsData, setMatchOddsData] = useState<any>(null);
  const [bookMakerData, setBookMakerData] = useState<any>(null);
  const [fancyData, setFancyData] = useState<any>(null);
  const [loadingData, setLoadingData] = useState(true); // Separate loading state

  // Fetch event data
  const { data } = useGetEventQuery({
    variables: {
      eventId: parseInt(eventId),
    },
    onCompleted: (data) => {
      setEventData(data?.getEvent);
      setInitialLoadComplete(true); // Mark that the first load is done
      setLoadingData(false); // Stop showing the loading state
    },
  });

  // Fetch event market data
  const {
    data: eventMarket,
    refetch: refetchMarket,
  } = useGetEventMarketQuery({
    variables: { input: parseInt(eventId) },
    skip: !initialLoadComplete, // Skip this query until initial load is complete
    onCompleted: (data) => {
      setMatchOddsData(data?.getEventMarket);
    },
  });

  // Fetch bookmaker data
  const { data: bookMaker, refetch: refetchBookmaker } =
    useGetBookmakerListQuery({
      variables: { input: parseInt(eventId) },
      skip: !initialLoadComplete,
      onCompleted: (data) => {
        setBookMakerData(data?.getBookmakerList);
      },
    });

  // Fetch fancy data if event sportId is 4
  const { data: fancy, refetch: refetchFancy } = useGetFancyQuery({
    skip: eventData?.sportId !== 4 || !initialLoadComplete,
    variables: {
      eventId: parseInt(eventId),
      sportId: eventData?.sportId || 1,
    },
    onCompleted: (data) => setFancyData(data?.getFancy),
  });

  // Refetch data at regular intervals (only after the initial load)
  useEffect(() => {
    if (initialLoadComplete) {
      const interval = setInterval(() => {
        refetchMarket();
        refetchBookmaker();
        refetchFancy();
      }, 2000);

      return () => clearInterval(interval); // Cleanup interval
    }
  }, [initialLoadComplete, refetchMarket, refetchBookmaker, refetchFancy]);

  return (
    <div>
      {loadingData ? ( // Show loading skeleton only on the first load
        <>
          <div className="lg:hidden">
            <SkeletonComp />
          </div>
          <div className="hidden lg:flex flex-col">
            <SkeletonDesk />
          </div>
        </>
      ) : (
        <>
          <EventDesk
            authUser={authUser}
            eventData={eventData}
            eventMarket={matchOddsData}
            bookMakerMarket={bookMakerData}
            fancyMarket={fancyData}
          />
          <EventMob
            authUser={authUser}
            eventData={eventData}
            eventMarket={matchOddsData}
            bookMakerMarket={bookMakerData}
            fancyMarket={fancyData}
          />
        </>
      )}
    </div>
  );
};
