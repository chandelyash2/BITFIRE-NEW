"use client";
import { usePathname } from "next/navigation";
import { EventDesk } from "./Desktop/EventDesk";
import { User, useGetEventQuery } from "@/graphql/generated/schema";
import { EventMob } from "./Mobile/EventMob";
import { decryptData } from "@/utils/crypto";
export interface ProfileProp {
  authUser: User;
  onProfileClose?: () => void;
}

export const Event = () => {
  const pathName = usePathname();

  const eventId = pathName.split("/")[2];

  const { data } = useGetEventQuery({
    variables: {
      eventId: parseInt(eventId),
    },
  });
  const eventData = data?.getEvent;
  const encryptedData: any = localStorage.getItem("userData");
  const decryptedData = decryptData(encryptedData);
  const authUser = JSON.parse(decryptedData);
  return (
    <div>
      <EventDesk authUser={authUser} eventData={eventData} />
      <EventMob authUser={authUser} eventData={eventData} />
    </div>
  );
};
