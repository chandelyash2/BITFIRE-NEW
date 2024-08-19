"use client";
import { SiAirplayaudio } from "react-icons/si";
import { Banner } from "./Banner";
import { twMerge } from "tailwind-merge";
import { IoFootballOutline, IoTennisballOutline } from "react-icons/io5";
import { MdOutlineSportsCricket } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { InPlayEvents } from "./InPlayEvents";
import {
  useCasinoGamesListQuery,
  useGetRaceSportsEventQuery,
  useGetSportEventsQuery,
} from "@/graphql/generated/schema";
import { MdOutlineUpcoming } from "react-icons/md";
import { SkeletonComp } from "../common/Skeleton";
import { CMSModal } from "@/context";
import { Button } from "@chakra-ui/react";
import { OpenBets } from "../Event/Mobile/OpenBets";
import { ProfileProp } from "../Event";
import { GiHorseHead } from "react-icons/gi";
import { RaceInPlay } from "./RaceInPlay";
import { GiJumpingDog } from "react-icons/gi";
import Image from "next/image";

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
  {
    id: 7,
    name: "Horse",
    icon: <GiHorseHead />,
  },
  {
    name: "Greyhound",
    id: 4339,
    icon: <GiJumpingDog />,
  },
  {
    name: "Casino",
    id: 10,
    icon: <GiJumpingDog />,
  },
];
export const InPlay = ({ authUser }: ProfileProp) => {
  const { activeSport, setActiveSport } = useContext(CMSModal);

  const [openBet, setOpenBet] = useState(false);
  const {
    data: sportsEvent,
    loading: sportLoading,
    refetch,
  } = useGetSportEventsQuery({
    variables: {
      input: activeSport.id,
    },
  });
  const {
    data: casinoGameData,
    loading: casinoGameLoading,
    refetch: casinoGameRefetch,
  } = useCasinoGamesListQuery();
  const {
    data: raceSportsEvent,
    loading: raceSportLoading,
    refetch: raceSportRefetch,
  } = useGetRaceSportsEventQuery({
    variables: {
      input: activeSport.id,
    },
  });
  useEffect(() => {
    activeSport.id !== 10 && refetch();
    activeSport.id !== 10 && raceSportRefetch();
  }, [activeSport, raceSportRefetch, refetch]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
      raceSportRefetch();
    }, 30000);
    return () => {
      clearInterval(interval);
    };
  }, [raceSportRefetch, refetch]);
  const inPlayData: any = sportsEvent?.getSportEvents?.inPlay;
  const upcomingData: any = sportsEvent?.getSportEvents?.upcoming;
  const raceData: any = raceSportsEvent?.getRaceSportsEvent;

  return (
    <div className="flex flex-col gap-4">
      <Banner />
      <div className="flex items-center gap-4 mt-4">
        {inPlaySports.map((items) => (
          <div
            className={twMerge(
              "bg-highlight text-white/50 h-12 min-w-10 lg:w-32 max-w-32 rounded-md gap-1 flex items-center justify-center font-semibold cursor-pointer",
              activeSport.id === items.id && "bg-secondary text-black min-w-24"
            )}
            onClick={() => {
              setActiveSport(items);
            }}
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

      {activeSport.id !== 10 && (
        <div className="bg-primary text-[#3083FF] p-3 rounded-md text-xl font-bold flex justify-between items-center">
          <h2 className="flex gap-2 items-center">
            <SiAirplayaudio />
            In Play
          </h2>
          {authUser._id && (
            <Button
              className="text-secondary bg-[#FFFFFF12]"
              colorScheme="transparent"
              color="secondary"
              onClick={() => setOpenBet((prev) => !prev)}
            >
              {openBet ? "Close" : "Open Bets"}
            </Button>
          )}
        </div>
      )}

      {/* CASINO STARTS */}
      {activeSport.id === 10 && (
        <div>
          <div className="flex gap-2 items-center text-text">
            <h1>CASINO Data</h1>
          </div>
          <div className="grid grid-flow-row grid-cols-5 gap-4">
            {casinoGameData?.casinoGamesList?.map((item, index) => {
              return (
                <div key={index}>
                  <img
                  key={index}
                  alt="Card background"
                  src={item?.image || ""}
                  width={350}
                  height={100}
                  className="w-full md:w-[350px] lg:w-[385px]"
                />
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* CASINO ENDS */}
      {openBet ? (
        <OpenBets />
      ) : (
        inPlayData &&
        activeSport.id !== 7 &&
        activeSport.id !== 4339 &&
        activeSport.id !== 10 && (
          <>
            {inPlayData && <InPlayEvents event={inPlayData} />}

            <div className="bg-primary text-[#3083FF] p-3 rounded-md text-xl font-bold flex gap-2 items-center mt-4">
              <MdOutlineUpcoming />
              Upcoming
            </div>

            {upcomingData && <InPlayEvents event={upcomingData} />}
          </>
        )
      )}
      {sportLoading && <SkeletonComp />}
      {raceData && (activeSport.id === 7 || activeSport.id === 4339) && (
        <>
          <RaceInPlay event={raceData} />
        </>
      )}
      {(activeSport.id === 7 || activeSport.id === 4339) &&
        raceSportLoading && <SkeletonComp />}
    </div>
  );
};
