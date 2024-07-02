import { SiAirplayaudio } from "react-icons/si";
import { Banner } from "./Banner";
import { twMerge } from "tailwind-merge";
import { IoFootballOutline, IoTennisballOutline } from "react-icons/io5";
import { MdOutlineSportsCricket } from "react-icons/md";
import { useState } from "react";
import { InPlayEvents } from "./InPlayEvents";
import { useInPlayQuery } from "@/graphql/generated/schema";

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
  const [activeSport, setActiveSport] = useState({
    id: 4,
    name: "Cricket",
  });
  const { data, loading, refetch } = useInPlayQuery();
  const inPlayData:any = data?.inPlay;

  return (
    <div className="flex flex-col gap-4">
      <Banner />
      <div className="bg-primary text-[#3083FF] mt-6 p-3 rounded-md text-xl font-bold flex gap-2 items-center">
        <SiAirplayaudio />
        In Play
      </div>
      <div className="flex items-center gap-4">
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
      {inPlayData&& (
        <InPlayEvents
          sportId={activeSport.id}
          event={inPlayData[activeSport.name.toLowerCase()]}
        />
      )}
    </div>
  );
};
