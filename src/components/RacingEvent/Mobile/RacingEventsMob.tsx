import { OddsButton } from "@/components/common/OddsButton";

import { useContext, useMemo } from "react";
import {
  Event,
  MarketType,
  PriceSize,
  RaceMarketType,
  useGetMarketPlQuery,
  User,
} from "@/graphql/generated/schema";
import { CMSModal } from "@/context";
import { twMerge } from "tailwind-merge";
import { BetSlipMob } from "@/components/Event/Mobile/BetSlipMob";
import { FaLongArrowAltRight } from "react-icons/fa";
import { SkeletonComp } from "@/components/common/Skeleton";
import { usePathname } from "next/navigation";

export interface MatchOddsProp {
  oddsData: MarketType | undefined | null | RaceMarketType | any;
  eventData: Event | any;
  authUser: User;
}

export const RacingEventsMob = ({
  oddsData,
  eventData,
  authUser,
}: MatchOddsProp) => {
  const { selectedBetData, betPl } = useContext(CMSModal);

  const { data, loading } = useGetMarketPlQuery({
    variables: {
      marketId: oddsData?.marketId,
    },
  });
  const marketPl = data?.getMarketPl;

  const findPL: any = (selectionId: string): number | null => {
    const plData = marketPl?.pl?.find(
      (item) => item?.selectionId === selectionId
    );
    return plData?.price || null;
  };
  const findCurrentPl: any = (selectionId: string): number | null => {
    const plData: any = marketPl?.pl?.find(
      (item) => item?.selectionId === selectionId
    );
    if (!plData) return null;

    if (marketPl?.marketId === betPl.marketId) {
      if (plData.selectionId === betPl.selectionId) {
        return betPl.type === "back"
          ? Math.round(plData.price + betPl.profit) || null
          : Math.round(plData.price - betPl.loss) || null;
      } else {
        return betPl.type === "back"
          ? Math.round(plData.price - betPl.loss) || null
          : Math.round(plData.price + betPl.profit) || null;
      }
    }
    return plData.price;
  };
  const renderOddsButton = (runner: any, type: "back" | "lay") => {
    const odds = type === "back" ? runner?.back : runner?.lay;
    const sortedOdds = odds
      ? odds
          .filter((data: PriceSize) => data && data.price > 0)
          .sort((a: any, b: any) =>
            type === "back" ? b.price - a.price : a.price - b.price
          )
      : [];

    return sortedOdds.length > 0 ? (
      <OddsButton
        key={oddsData?.marketId}
        data={sortedOdds[0]}
        oddsData={oddsData}
        runner={runner}
        eventData={eventData}
        type={type}
        disable={runner?.marketStatus === "SUSPENDED" || runner?.ballRunning}
        authUser={authUser}
      />
    ) : (
      <OddsButton
        key={oddsData?.marketId}
        disable={runner?.marketStatus === "SUSPENDED" || runner?.ballRunning}
        authUser={authUser}
        type={type}
      />
    );
  };

  const renderRunners = useMemo(() => {
    return oddsData?.runners?.map((runner: any, index: any) => (
      <>
        <div
          className="relative bg-[#24262B5E] text-white p-3 rounded-md mb-2 text-sm"
          key={runner?.selectionId}
        >
          <div className="flex items-center justify-between gap-2">
            <h4 className="flex flex-col gap-1 font-semibold">
              {runner?.runnerName}
              <span
                className={twMerge(
                  betPl.profit
                    ? findCurrentPl(runner?.selectionId) >= 0
                      ? "text-green-500"
                      : "text-red-500"
                    : findPL(runner?.selectionId) >= 0
                    ? "text-green-500"
                    : "text-red-500"
                )}
              >
                {betPl.profit ? (
                  <div className="flex items-center">
                    {oddsData?.marketId === betPl.marketId &&
                      findCurrentPl(runner?.selectionId) !== null && (
                        <span className="text-text">
                          <FaLongArrowAltRight />
                        </span>
                      )}
                    {findCurrentPl(runner?.selectionId, oddsData?.marketId)}
                  </div>
                ) : (
                  findPL(runner?.selectionId)
                )}
              </span>
            </h4>

            <div className="flex gap-2 text-primary font-semibold">
              {oddsData?.bettingType === "LINE" ? (
                <>
                  {renderOddsButton(runner, "lay")}
                  {renderOddsButton(runner, "back")}
                </>
              ) : (
                <>
                  {renderOddsButton(runner, "back")}
                  {renderOddsButton(runner, "lay")}
                </>
              )}
            </div>
          </div>

          {runner?.status === "SUSPENDED" && (
            <div className="absolute top-[20%] left-[45%] z-20  text-red-600 font-bold text-xl text-center w-[200px]">
              <h2>Suspended</h2>
            </div>
          )}
        </div>
        {selectedBetData.selectionId == runner?.selectionId && (
          <BetSlipMob authUser={authUser} />
        )}
      </>
    ));
  }, [oddsData, marketPl, selectedBetData, betPl]);

  return (
    <div className="flex flex-col lg:hidden gap-4">
      <h2 className="text-[#3083FF] text-lg font-bold text-center">
        {eventData?.name}
      </h2>

      <div className="bg-[#171717] text-secondary text-sm font-bold py-2 px-3 text-center rounded-md">
        {oddsData?.marketName}
      </div>
      {renderRunners}
      {loading && <SkeletonComp />}
    </div>
  );
};
