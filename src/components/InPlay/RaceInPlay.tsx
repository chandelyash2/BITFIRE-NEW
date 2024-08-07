import { RaceEvent } from "@/graphql/generated/schema";
import moment from "moment";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
interface InPlayProp {
  event: RaceEvent[];
}
export const RaceInPlay = ({ event }: InPlayProp) => {
  return (
    <>
      {event &&
        event.length > 0 &&
        event.map((item) => (
          <div
            key={item.eventId}
            className="bg-highlight p-2 rounded-md text-white/50 flex flex-col gap-2"
          >
            <h2 className="text-white font-bold">{item.name}</h2>
            <div className="flex flex-wrap items-center gap-4">
              {item.market &&
                item.market.length > 0 &&
                item.market
                  .sort(
                    (a, b) =>
                      moment(a?.marketTime).valueOf() -
                      moment(b?.marketTime).valueOf()
                  )
                  .map(
                    (market) =>
                      market?.runners &&
                      market?.runners[0]?.marketStatus !== "CLOSED" && (
                        <Link
                          href={`/event/${item?.eventId}/${market.marketId}`}
                          key={market?.marketId}
                          className={twMerge(
                            "p-2 rounded",
                            moment(market?.marketTime).isBefore(moment())
                              ? "bg-secondary text-white"
                              : "bg-primary text-text"
                          )}
                        >
                          {moment(market?.marketTime).format("HH:mm")}
                        </Link>
                      )
                  )}
            </div>
          </div>
        ))}
    </>
  );
};
