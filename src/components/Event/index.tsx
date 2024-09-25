"use client";
import { usePathname } from "next/navigation";
import { EventDesk } from "./Desktop/EventDesk";
import { User, useGetEventQuery } from "@/graphql/generated/schema";
import { EventMob } from "./Mobile/EventMob";
import { useContext } from "react";
import { CMSModal } from "@/context";
import { useEffect } from "react";
import { inPlaySports } from "../InPlay";
export interface ProfileProp {
  authUser: User;
  onProfileClose?: () => void;
}

export const Event = () => {
  const { setActiveSport } = useContext(CMSModal);
  const pathName = usePathname();

  const eventId = pathName.split("/")[2];

  const { data } = useGetEventQuery({
    variables: {
      eventId: parseInt(eventId),
    },
  });
  const eventData = data?.getEvent;

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

  const encryptedData: any = sessionStorage.getItem("userData");
  // const decryptedData = decryptData(encryptedData);
  const authUser = JSON.parse(encryptedData);
  return (
    <div>
      <EventDesk authUser={authUser} eventData={eventData} />
      <EventMob authUser={authUser} eventData={eventData} />
    </div>
  );
};
