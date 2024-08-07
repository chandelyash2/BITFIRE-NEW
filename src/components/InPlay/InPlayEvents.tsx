import { Event } from "@/graphql/generated/schema";
import moment from "moment";
import { TeamOdds } from "./TeamOdds";
import Link from "next/link";

interface InPlayProp {
  event: Event[];
}
export const InPlayEvents = ({ event }: InPlayProp) => {
  return (
    <>
      {event && event?.length > 0 ? (
        event.map((item) => (
          <Link
            href={`/event/${item.eventId}`}
            className="bg-highlight p-2 rounded-md text-white/50"
            key={item.id}
          >
            <div className="flex flex-col lg:flex-row gap-2 justify-between lg:items-center">
              <div className="flex flex-col gap-1">
                <h2 className="text-white font-bold">{item.name}</h2>
                <h4 className="text-xs">
                  {moment(item.openDate).format("MMMM Do YYYY, h:mm:ss a")}
                </h4>
                <h4 className="text-xs">{item.competitionName}</h4>
              </div>
              <div>
                {item.market &&
                  item.market.length > 0 &&
                  item.market.map((market) => (
                    <TeamOdds market={market} key={market?.marketId} />
                  ))}
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-white/50 font-bold text-xl lg:text-2xl text-center mt-10">
          No In Play Matches Currently
        </p>
      )}
    </>
  );
};
