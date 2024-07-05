import { OddsButton } from "@/components/common/OddsButton";
import { BetSlipMob } from "./BetSlipMob";
import { useContext } from "react";
import {
  BookmakerMarketType,
  Event,
  MarketType,
  User,
} from "@/graphql/generated/schema";
import { CMSModal } from "@/context";
interface MatchOddsProp {
  oddsData: MarketType | undefined | null | BookmakerMarketType;
  eventData: Event;
  authUser: User;
}
export const MatchOddsMob = ({
  oddsData,
  eventData,
  authUser,
}: MatchOddsProp) => {
  const { selectedBetData } = useContext(CMSModal);

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
                    eventData={eventData}
                    type="back"
                    color="bg-blue-300"
                    disable={runner?.marketStatus === "SUSPENDED"}
                    authUser={authUser}
                  />
                ) : (
                  <OddsButton
                    color="bg-blue-300"
                    disable={runner?.marketStatus === "SUSPENDED"}
                    authUser={authUser}
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
                    eventData={eventData}
                    type="lay"
                    color="bg-pink-300"
                    disable={runner?.marketStatus === "SUSPENDED"}
                    authUser={authUser}
                  />
                ) : (
                  <OddsButton
                    color="bg-pink-300"
                    disable={runner?.marketStatus === "SUSPENDED"}
                    authUser={authUser}
                  />
                )}
              </div>
            </div>
          ))}
          {oddsData.marketId === selectedBetData.marketId && <BetSlipMob />}
        </>
      )}
    </div>
  );
};
