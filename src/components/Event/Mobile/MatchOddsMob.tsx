import { OddsButton } from "@/components/common/OddsButton";
import { BetSlipMob } from "./BetSlipMob";
import { useState } from "react";
import { BookmakerMarketType, MarketType } from "@/graphql/generated/schema";
interface MatchOddsProp {
  oddsData: MarketType | undefined | null | BookmakerMarketType;
  // eventData: Event | any;
  // user: User;
}
export const MatchOddsMob = ({ oddsData }: MatchOddsProp) => {
  const [marketId, setMarketId] = useState("");
  const handleData = (marketId: string) => {
    setMarketId("");
    setMarketId(marketId);
  };

  return (
    <div>
      <div className="bg-[#171717] text-secondary text-sm font-bold py-2 px-3 text-center rounded-md">
        {oddsData?.marketName}
      </div>
      {oddsData?.runners && (
        <>
          {oddsData.runners.map((runner, index) => (
            <div
              className="flex justify-between items-center bg-[#24262B5E] text-white p-3 rounded-md mb-2 text-sm"
              key={index}
            >
              <h4>{runner?.runnerName}</h4>

              <div className="flex gap-2 text-primary font-semibold">
                {runner?.ex?.availableToBack &&
                runner?.ex?.availableToBack?.length > 0 ? (
                  <OddsButton
                    data={
                      runner.ex.availableToBack
                        .filter((data) => data && data.price > 0)
                        .sort((a: any, b: any) => b.price - a.price)[0]
                    }
                    oddsData={oddsData}
                    runner={runner}
                    handleData={handleData}
                    type="back"
                    color="bg-blue-300"
                    disable={runner?.marketStatus === "SUSPENDED"}
                  />
                ) : (
                  <OddsButton
                    color="bg-blue-300"
                    disable={runner?.marketStatus === "SUSPENDED"}
                  />
                )}

                {runner?.ex?.availableToLay &&
                runner?.ex?.availableToLay?.length > 0 ? (
                  <OddsButton
                    data={
                      runner.ex.availableToLay
                        .filter((data) => data && data.price > 0)
                        .sort((a: any, b: any) => a.price - b.price)[0]
                    }
                    oddsData={oddsData}
                    runner={runner}
                    handleData={handleData}
                    type="lay"
                    color="bg-pink-300"
                    disable={runner?.marketStatus === "SUSPENDED"}
                  />
                ) : (
                  <OddsButton
                    color="bg-pink-300"
                    disable={runner?.marketStatus === "SUSPENDED"}
                  />
                )}
              </div>
            </div>
          ))}
          {oddsData.marketId === marketId && (
            <BetSlipMob setMarketId={() => setMarketId("")} />
          )}
        </>
      )}
    </div>
  );
};
