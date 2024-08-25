import { Event } from "@/graphql/generated/schema";
import moment from "moment";
import { TeamOdds } from "./TeamOdds";
import Link from "next/link";

interface InPlayProp {
  event: Event[];
}

export const InPlayEvents = ({ event }: InPlayProp) => {
  if (!event || event.length === 0) {
    return (
      <p className="text-white/50 font-bold text-xl lg:text-2xl text-center mt-10">
        No Matches Currently
      </p>
    );
  }

  return (
    <>
      {event.map(({ eventId, id, name, openDate, competitionName, market }) => (
        <Link
          href={`/event/${eventId}`}
          className="bg-highlight p-2 rounded-md text-white/50"
          key={id}
          aria-label={`View details for ${name}`}
        >
          <div className="flex flex-col lg:flex-row gap-2 justify-between lg:items-center">
            <div className="flex flex-col gap-1">
              <h2 className="text-white font-bold">{name}</h2>
              <h4 className="text-xs">
                {moment(openDate).format("MMMM Do YYYY, h:mm:ss a")}
              </h4>
              <h4 className="text-xs">{competitionName}</h4>
            </div>
            {market && market.length > 0 && (
              <TeamOdds market={market[0]} key={market[0]?.marketId} />
            )}
          </div>
        </Link>
      ))}
    </>
  );
};
