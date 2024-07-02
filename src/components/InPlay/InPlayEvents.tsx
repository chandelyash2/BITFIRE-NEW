import { Event } from "@/graphql/generated/schema";
import moment from "moment";
import { TeamOdds } from "./TeamOdds";

interface InPlayProp {
  event: Event[];
  sportId: number;
}
export const InPlayEvents = ({ event, sportId }: InPlayProp) => {
  console.log(event, ">>>>>");

  return (
    <>
      {event.map((item) => (
        <div
          className="bg-highlight p-2 rounded-md text-white/50"
          key={item.id}
        >
          <div className="flex flex-col lg:flex-row gap-2 justify-between">
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
        </div>
      ))}
    </>
  );
};
