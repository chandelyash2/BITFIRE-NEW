"use client";
import { RacingEventsMob } from "./Mobile/RacingEventsMob";
import {
  useGetRaceMarketQuery,
  useGetRaceQuery,
  User,
} from "@/graphql/generated/schema";
import { usePathname } from "next/navigation";
import { EventsDeskNew } from "./Desktop/EventsDeskNew";
import { useContext, useEffect, useState } from "react";
import { Loader } from "../common/Loader";
import { CMSModal } from "@/context";
import { inPlaySports } from "../InPlay";

export const RacingEvent = () => {
  const { setActiveSport } = useContext(CMSModal);
  const pathName = usePathname();
  const [authUser, setAuthUSer] = useState<User | any>();
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
    const encryptedData: any = sessionStorage.getItem("userData");
    // const decryptedData = decryptData(encryptedData);
    const authUser = JSON.parse(encryptedData);
    setAuthUSer(authUser);
  }, []);

  useEffect(() => {
    if (eventData?.sportId) {
      const findSport = inPlaySports.find(
        (item) => item.id == eventData.sportId
      );
      setActiveSport({
        id: findSport?.id,
        name: findSport?.name,
      });
    }
  }, [eventData]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [eventData?.name, refetch]);

  const marketData = marketdata?.getRaceMarket;
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
