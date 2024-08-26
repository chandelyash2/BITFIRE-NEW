import { RaceEvent } from "@/graphql/generated/schema";
import moment from "moment";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface InPlayProp {
  event: RaceEvent[];
}

export const RaceInPlay = ({ event }: InPlayProp) => {
  if (!event || event.length === 0) {
    return null; // Render nothing if there are no events
  }

  return (
    <>
      {event.map(({ id,name, event: raceEvents }) => (
        <div
          key={name}
          className="bg-highlight p-2 rounded-md text-white/50 flex flex-col gap-2"
        >
          <h2 className="text-white font-bold">{name}</h2>
          <div className="flex flex-wrap items-center gap-4">
            {raceEvents &&
              raceEvents?.length > 0 &&
              raceEvents
                .sort(
                  (a, b) =>
                    moment(a?.startTime).valueOf() -
                    moment(b?.startTime).valueOf()
                )
                .map((market) => {
                  const isPast = moment(market?.startTime).isBefore(moment());
                  return (
                    market?.eventStatus !== "CLOSED" && (
                      <Link
                        href={`/event/${id}/${market?.eventId}`}
                        key={market?.eventId}
                        className={twMerge(
                          "p-2 rounded",
                          isPast
                            ? "bg-secondary text-white"
                            : "bg-primary text-text"
                        )}
                      >
                        {moment(market?.startTime).format("HH:mm")}
                      </Link>
                    )
                  );
                })}
          </div>
        </div>
      ))}
    </>
  );
};
