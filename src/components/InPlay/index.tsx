/* eslint-disable @next/next/no-img-element */
"use client";

import { useContext, useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { twMerge } from "tailwind-merge";

// Icons
import { IoFootballOutline, IoTennisballOutline } from "react-icons/io5";
import {
  MdOutlineSportsCricket,
  MdOutlineUpcoming,
  MdSportsMartialArts,
  MdSportsRugby,
} from "react-icons/md";
import {
  GiHorseHead,
  GiJumpingDog,
  GiBoxingGloveSurprise,
} from "react-icons/gi";
import { FaBasketball } from "react-icons/fa6";
import { SiAirplayaudio } from "react-icons/si";
import { MdCasino } from "react-icons/md";

// Components
import { Banner } from "./Banner";
import { InPlayEvents } from "./InPlayEvents";
import { RaceInPlay } from "./RaceInPlay";
import { OpenBets } from "../Event/Mobile/OpenBets";

// GraphQL Queries
import {
  useCasinoGameInitLazyQuery,
  useCasinoGamesListQuery,
  useGetRacesQuery,
  useGetSportEventsQuery,
} from "@/graphql/generated/schema";

// Contexts
import { CMSModal } from "@/context";

// Types
import { ProfileProp } from "../Event";
import { Loader } from "../common/Loader";

// In-play sports data
export const inPlaySports = [
  { id: 4, name: "Cricket", icon: <MdOutlineSportsCricket /> },
  { id: 1, name: "Football", icon: <IoFootballOutline /> },
  { id: 2, name: "Tennis", icon: <IoTennisballOutline /> },
  { id: 10, name: "Casino", icon: <MdCasino /> },
  { id: 7, name: "Horse", icon: <GiHorseHead /> },
  { id: 4339, name: "Greyhound", icon: <GiJumpingDog /> },
  { id: 7522, name: "Basketball", icon: <FaBasketball /> },
  { id: 6, name: "Boxing", icon: <GiBoxingGloveSurprise /> },
  // { id: 3, name: "Golf", icon: <GiGolfTee /> },
  { id: 26420387, name: "Martial Art", icon: <MdSportsMartialArts /> },
  { id: 5, name: "Rugby", icon: <MdSportsRugby /> },
];

export const casinoTabs = [
  { id: 101, name: "Live", icon: <MdCasino /> },
  { id: 102, name: "Vivo", icon: <MdCasino /> },
  { id: 103, name: "Ezugi", icon: <MdCasino /> },
  { id: 104, name: "All", icon: <MdCasino /> },
];

export const InPlay = ({ authUser }: ProfileProp) => {
  const { activeSport, setActiveSport } = useContext(CMSModal);
  const [activeCasinoTab, setActiveCasinoTab] = useState<any>();
  const [openBet, setOpenBet] = useState(false);

  const {
    data: sportsEvent,
    loading: sportLoading,
    refetch: refetchSportEvents,
  } = useGetSportEventsQuery({
    variables: { input: activeSport.id },
  });
  const {
    data: casinoGameData,
    loading: casinoGameLoading,
    refetch: casinoGameRefetch,
  } = useCasinoGamesListQuery();
  const {
    data: raceSportsEvent,
    loading: raceSportLoading,
    refetch: refetchRaceEvents,
  } = useGetRacesQuery({
    variables: { input: activeSport.id },
  });

  const [
    casinoGamesInit,
    { data: casinoGamesInitData, loading: casinoGamesInitLoading },
  ] = useCasinoGameInitLazyQuery();

  useEffect(() => {
    refetchSportEvents();
    refetchRaceEvents();
  }, [activeSport, refetchSportEvents, refetchRaceEvents]);

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetchSportEvents();
      refetchRaceEvents();
    }, 30000);
    return () => {
      clearInterval(interval);
    };
  }, [activeSport]);

  useEffect(() => {
    if (casinoGamesInitData && !casinoGamesInitLoading) {
      window.location.href = casinoGamesInitData.casinoGameInit?.url!;
    }
  }, [casinoGamesInitData, casinoGamesInitLoading]);

  const inPlayData: any = sportsEvent?.getSportEvents?.inPlay;
  const upcomingData: any = sportsEvent?.getSportEvents?.upcoming;
  const raceData: any = raceSportsEvent?.getRaces;

  return (
    <div className="flex flex-col gap-4">
      <Banner />

      {/* Sport Selection */}
      <div className="flex items-center gap-4 mt-4 w-full overflow-auto">
        {inPlaySports.map((sport) => (
          <button
            key={sport.id}
            disabled={sportLoading || raceSportLoading}
            className={twMerge(
              "bg-highlight text-white/50 h-12 min-w-10 lg:min-w-32 rounded-md flex items-center justify-center font-semibold cursor-pointer",
              activeSport.id === sport.id && "bg-secondary text-black min-w-28"
            )}
            onClick={() => setActiveSport(sport)}
          >
            {sport.icon}
            <span
              className={twMerge(
                "hidden lg:flex",
                activeSport.id === sport.id && "flex"
              )}
            >
              {sport.name}
            </span>
          </button>
        ))}
      </div>

      {/* In-Play Header */}
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
            {/* <h1>CASINO Data</h1> */}
            <div className="flex items-center gap-4 mt-4 w-full overflow-auto">
              {casinoTabs.map((sport) => (
                <button
                  key={sport.id}
                  disabled={sportLoading || raceSportLoading}
                  className={twMerge(
                    "bg-highlight text-white/50 h-12 min-w-10 lg:min-w-32 rounded-md flex items-center justify-center font-semibold cursor-pointer",
                    activeCasinoTab?.id === sport.id &&
                      "bg-secondary text-black min-w-28"
                  )}
                  onClick={() => setActiveCasinoTab(sport)}
                >
                  {sport.icon} &nbsp;
                  <span
                    className={twMerge(
                      "hidden lg:flex",
                      activeCasinoTab?.id === sport.id && "flex"
                    )}
                  >
                    {sport.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {activeCasinoTab && activeCasinoTab?.id === 101 && (
          <div className="grid grid-flow-row grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {casinoGameData?.casinoGamesList?.Live?.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() =>
                    casinoGamesInit({
                      variables: {
                        input: {
                          currency: "EUR",
                          game_uuid: item?.uuid.toString()!,
                          player_id: authUser._id,
                          player_name: authUser.userName,
                        },
                      },
                    })
                  }
                >
                  <img
                    key={index}
                    alt="Card background"
                    src={item?.image || ""}
                    className="w-[200px] md:w-[350px] lg:w-[385px]"
                  />
                </div>
              );
            })}
            
          </div>
          )}
          {activeCasinoTab && activeCasinoTab?.id === 102 && (
          <div className="grid grid-flow-row grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {casinoGameData?.casinoGamesList?.VivoGames?.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() =>
                    casinoGamesInit({
                      variables: {
                        input: {
                          currency: "EUR",
                          game_uuid: item?.uuid.toString()!,
                          player_id: authUser._id,
                          player_name: authUser.userName,
                        },
                      },
                    })
                  }
                >
                  <img
                    key={index}
                    alt="Card background"
                    src={item?.image || ""}
                    className="w-[200px] md:w-[350px] lg:w-[385px]"
                  />
                </div>
              );
            })}
            
          </div>
          )}
           {activeCasinoTab && activeCasinoTab?.id === 103 && (
          <div className="grid grid-flow-row grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {casinoGameData?.casinoGamesList?.Ezugi?.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() =>
                    casinoGamesInit({
                      variables: {
                        input: {
                          currency: "EUR",
                          game_uuid: item?.uuid.toString()!,
                          player_id: authUser._id,
                          player_name: authUser.userName,
                        },
                      },
                    })
                  }
                >
                  <img
                    key={index}
                    alt="Card background"
                    src={item?.image || ""}
                    className="w-[200px] md:w-[350px] lg:w-[385px]"
                  />
                </div>
              );
            })}
            
          </div>
          )}
          {activeCasinoTab && activeCasinoTab?.id === 104 && (
          <div className="grid grid-flow-row grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {casinoGameData?.casinoGamesList?.All?.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() =>
                    casinoGamesInit({
                      variables: {
                        input: {
                          currency: "EUR",
                          game_uuid: item?.uuid.toString()!,
                          player_id: authUser._id,
                          player_name: authUser.userName,
                        },
                      },
                    })
                  }
                >
                  <img
                    key={index}
                    alt="Card background"
                    src={item?.image || ""}
                    className="w-[200px] md:w-[350px] lg:w-[385px]"
                  />
                </div>
              );
            })}
            
          </div>
          )}
        </div>
      )}

      {/* CASINO ENDS */}

      {/* In-Play and Upcoming Events */}
      {openBet ? (
        <OpenBets />
      ) : (
        <>
          {inPlayData &&
            activeSport.id !== 7 &&
            activeSport.id !== 4339 &&
            activeSport.id !== 10 && (
              <>
                <InPlayEvents event={inPlayData} />
                <div className="bg-primary text-[#3083FF] p-3 rounded-md text-xl font-bold flex gap-2 items-center mt-4">
                  <MdOutlineUpcoming />
                  Upcoming
                </div>
                <InPlayEvents event={upcomingData} />
              </>
            )}
        </>
      )}

      {/* Loading Skeleton */}
      {sportLoading && <Loader />}

      {(activeSport.id === 7 || activeSport.id === 4339) &&
        raceSportLoading && <Loader />}

      {/* Race In-Play Events */}
      {raceData &&
        (activeSport.id === 7 || activeSport.id === 4339) &&
        (raceData.length > 0 ? (
          <RaceInPlay event={raceData} />
        ) : (
          <p className="text-white/50 font-bold text-xl lg:text-2xl text-center mt-10">
            No Events Currently
          </p>
        ))}
    </div>
  );
};
