import { OddsButton } from "@/components/common/OddsButton";
import { BetSlipMob } from "./BetSlipMob";
import { useContext, useMemo } from "react";
import {
  Event,
  MarketType,
  PriceSize,
  useGetMarketPlQuery,
  User,
} from "@/graphql/generated/schema";
import { CMSModal } from "@/context";
import { twMerge } from "tailwind-merge";

export interface MatchOddsProp {
  oddsData: MarketType | undefined | null;
  eventData: Event;
  authUser: User;

}

export const MatchOddsMob = ({
  oddsData,
  eventData,
  authUser,
}: MatchOddsProp) => {
  const { selectedBetData } = useContext(CMSModal);
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
        disable={runner?.marketStatus === "SUSPENDED" || runner?.ballRunning}
        authUser={authUser}
      />
    ) : (
      <OddsButton
        key={type}
        disable={runner?.marketStatus === "SUSPENDED" || runner?.ballRunning}
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
              findPL(runner?.selectionId) >= 0
                ? "text-green-500"
                : "text-red-500"
            )}
          >
            {findPL(runner?.selectionId)}
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

        {runner?.marketStatus === "SUSPENDED" && (
          <div className="absolute left-[40%] z-20 border-2 border-red-600 text-red-600 font-bold text-xl text-center w-[200px]">
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
  }, [oddsData, marketPl]);

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
