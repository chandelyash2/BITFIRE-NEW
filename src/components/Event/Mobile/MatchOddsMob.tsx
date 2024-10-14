import { OddsButton } from "@/components/common/OddsButton";
import { BetSlipMob } from "./BetSlipMob";
import { useContext, useMemo } from "react";
import {
  BookmakerMarketType,
  Event,
  FancyMarket,
  MarketType,
  PriceSize,
  useGetMarketPlQuery,
  User,
} from "@/graphql/generated/schema";
import { CMSModal } from "@/context";
import { twMerge } from "tailwind-merge";
import { FaLongArrowAltRight } from "react-icons/fa";

export interface MatchOddsProp {
  oddsData: MarketType | undefined | null | BookmakerMarketType;
  eventData: Event | any;
  authUser: User;
}

export const MatchOddsMob = ({
  oddsData,
  eventData,
  authUser,
}: MatchOddsProp) => {
  const { selectedBetData, betPl } = useContext(CMSModal);
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
        key={type}
        data={sortedOdds[0]}
        oddsData={oddsData}
        runner={runner}
        eventData={eventData}
        type={type}
        disable={
          runner?.status === "SUSPENDED" ||
          runner?.ballRunning ||
          runner?.eventStatus === "CLOSED"
        }
        authUser={authUser}
      />
    ) : (
      <OddsButton
        key={type}
        disable={
          runner?.status === "SUSPENDED" ||
          runner?.ballRunning ||
          runner?.eventStatus === "CLOSED"
        }
        authUser={authUser}
        type={type}
      />
    );
  };

  const renderRunners = useMemo(() => {
    return oddsData?.runners?.map((runner, index) => (
      <div
        className="relative flex justify-between gap-2 items-center bg-[#24262B5E] text-white p-3 rounded-md mb-2 text-sm"
        key={index}
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

        {(runner?.marketStatus === "SUSPENDED" ||
          runner?.eventStatus === "CLOSED") && (
          <div className="absolute left-[45%] z-20 text-text font-bold text-lg text-center w-[200px]">
            <h2>Suspended</h2>
          </div>
        )}
        {runner?.marketStatus !== "SUSPENDED" && runner?.ballRunning && (
          <div className="absolute left-[45%] z-20 text-text font-bold text-lg text-center w-[200px]">
            <h2>Ball Running</h2>
          </div>
        )}
      </div>
    ));
  }, [oddsData, marketPl, betPl]);

  return (
    <div>
      <div className="bg-[#171717] text-secondary text-sm font-bold py-2 px-3 text-center rounded-md">
        {oddsData?.marketName}
      </div>
      {renderRunners}
      {oddsData?.marketId === selectedBetData.marketId && (
        <BetSlipMob authUser={authUser} />
      )}
    </div>
  );
};
