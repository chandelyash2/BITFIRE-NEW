"use client";
import { usePathname } from "next/navigation";
import { EventDesk } from "./Desktop/EventDesk";
import { User, useGetEventQuery } from "@/graphql/generated/schema";
import { EventMob } from "./Mobile/EventMob";
export interface ProfileProp {
  authUser: User;
}
export const Event = ({ authUser }: ProfileProp) => {
  const pathName = usePathname();
  const eventId = pathName.split("/")[2];

  const { data, loading: eventLoading } = useGetEventQuery({
    variables: {
      eventId: parseInt(eventId),
    },
  });
  const eventData = data?.getEvent;

  return (
    <div>
      <EventDesk authUser={authUser} eventData={eventData} />
      <EventMob authUser={authUser} eventData={eventData} />
    </div>
  );
};
