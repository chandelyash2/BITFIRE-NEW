import { SiAirplayaudio } from "react-icons/si";
import { Banner } from "./Banner";
import { twMerge } from "tailwind-merge";
import { IoFootballOutline, IoTennisballOutline } from "react-icons/io5";
import { MdOutlineSportsCricket } from "react-icons/md";
import { useContext } from "react";
import { InPlayEvents } from "./InPlayEvents";
import {
  useGetSportEventsQuery,
  useInPlayQuery,
} from "@/graphql/generated/schema";
import { MdOutlineUpcoming } from "react-icons/md";
import { SkeletonComp } from "../common/Skeleton";
import { CMSModal } from "@/context";

export const inPlaySports = [
  {
    id: 1,
    name: "Football",
    icon: <IoFootballOutline />,
  },
  {
    id: 4,
    name: "Cricket",
    icon: <MdOutlineSportsCricket />,
  },
  {
    id: 2,
    name: "Tennis",
    icon: <IoTennisballOutline />,
  },
];
export const InPlay = () => {
  const { activeSport, setActiveSport } = useContext(CMSModal);
  const { data, loading } = useInPlayQuery();
  const { data: sportsEvent, loading: sportLoading } = useGetSportEventsQuery({
    variables: {
      input: activeSport.id,
    },
  });
  const inPlayData: any = data?.inPlay;
  const upcomingData: any = sportsEvent?.getSportEvents?.upcoming;

  return (
    <div className="flex flex-col gap-4">
      <Banner />
      <div className="flex items-center gap-4  mt-4">
        {inPlaySports.map((items) => (
          <div
            className={twMerge(
              "bg-highlight text-white/50 h-12 min-w-10 lg:w-32 max-w-32 rounded-md gap-1 flex items-center justify-center font-semibold cursor-pointer",
              activeSport.id === items.id && "bg-secondary text-black min-w-24"
            )}
            onClick={() => setActiveSport(items)}
            key={items.name}
          >
            {items.icon}

            <span
              className={twMerge(
                "hidden lg:flex",
                activeSport.id === items.id && "flex"
              )}
            >
              {items.name}
            </span>
          </div>
        ))}
      </div>
      <div className="bg-primary text-[#3083FF] p-3 rounded-md text-xl font-bold flex gap-2 items-center">
        <SiAirplayaudio />
        In Play
      </div>
      {inPlayData && (
        <InPlayEvents
          sportId={activeSport.id}
          event={inPlayData[activeSport.name.toLowerCase()]}
        />
      )}
      {loading && <SkeletonComp />}
      <div className="bg-primary text-[#3083FF] p-3 rounded-md text-xl font-bold flex gap-2 items-center mt-4">
        <MdOutlineUpcoming />
        Upcoming
      </div>

      {upcomingData && (
        <InPlayEvents sportId={activeSport.id} event={upcomingData} />
      )}
      {sportLoading && <SkeletonComp />}
    </div>
  );
};
