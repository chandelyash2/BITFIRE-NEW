import { OddsButton } from "@/components/common/OddsButton";
import { CMSModal } from "@/context";
import {
  Event,
  MarketType,
  useGetMarketPlQuery,
  User,
} from "@/graphql/generated/schema";
import { useContext, useMemo } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

export interface MatchOddsProp {
  oddsData: MarketType | undefined | null;
  eventData: Event;
  authUser: User;
}

export const MatchOddsDesk = ({
  oddsData,
  eventData,
  authUser,
}: MatchOddsProp) => {
  const { betPl } = useContext(CMSModal);
  const { data } = useGetMarketPlQuery({
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

  const renderOddsButtons = (runner: any, type: "back" | "lay") => {
    const odds = type === "back" ? runner?.back : runner?.lay;
    return odds && odds.length > 0
      ? odds
          .sort((a: any, b: any) => a?.price - b?.price)
          .map((data: any, i: number) =>
            data && data.price > 0 ? (
              <OddsButton
                key={i}
                data={data}
                oddsData={oddsData}
                eventData={eventData}
                runner={runner}
                type={type}
                disable={runner.marketStatus === "SUSPENDED"  || runner?.ballRunning}
                authUser={authUser}
              />
            ) : (
              <OddsButton
                key={i}
                disable={runner.marketStatus === "SUSPENDED"  || runner?.ballRunning}
                authUser={authUser}
                type={type}
              />
            )
          )
      : Array.from(
          { length: oddsData?.bettingType === "LINE" ? 1 : 3 },
          (_, index) => (
            <OddsButton
              key={index}
              authUser={authUser}
              disable={runner?.marketStatus === "SUSPENDED"  || runner?.ballRunning}
              type={type}
            />
          )
        );
  };

  const renderRunners = useMemo(() => {
    return oddsData?.runners
      ?.sort((a: any, b: any) => a?.price - b?.price)
      .map((runner, index: number) => (
        <div
          key={index}
          className="relative flex justify-between items-center bg-highlight text-white p-3 rounded-md mb-2"
        >
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
                {renderOddsButtons(runner, "lay")}
                {renderOddsButtons(runner, "back")}
              </>
            ) : (
              <>
                {renderOddsButtons(runner, "back")}
                {renderOddsButtons(runner, "lay")}
              </>
            )}
          </div>
          {runner?.marketStatus === "SUSPENDED" && (
            <div className="absolute left-[40%] z-20 border-2 border-red-600 text-red-600 font-bold text-xl text-center w-[300px]">
              <h2>Suspended</h2>
            </div>
          )}
          {runner?.ballRunning && (
            <div className="absolute left-[40%] z-20 border-2 border-red-600 text-red-600 font-bold text-xl text-center w-[200px]">
              <h2>Ball Running</h2>
            </div>
          )}
        </div>
      ));
  }, [oddsData, betPl, marketPl]);

  return (
    <div>
      <div className="bg-[#171717] text-secondary text-lg font-bold py-2 px-3 text-center rounded-md inline-block">
        {oddsData?.marketName}
      </div>
      {renderRunners}
    </div>
  );
};
