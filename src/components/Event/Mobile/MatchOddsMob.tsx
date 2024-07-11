import { OddsButton } from "@/components/common/OddsButton";
import { BetSlipMob } from "./BetSlipMob";
import { useContext } from "react";
import {
  BookmakerMarketType,
  Event,
  MarketType,
  useGetMarketPlQuery,
  User,
} from "@/graphql/generated/schema";
import { CMSModal } from "@/context";
import { twMerge } from "tailwind-merge";
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
  const { data } = useGetMarketPlQuery({
    variables: {
      marketId: oddsData?.marketId,
    },
  });
  const marketPl = data?.getMarketPl;

  const findPL: any = (selectionId: string) => {
    const plData = marketPl?.pl?.find(
      (item) => item?.selectionId === selectionId
    );

    if (plData?.price) {
      return plData?.price;
    }
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
              className="relative flex justify-between items-center bg-[#24262B5E] text-white p-3 rounded-md mb-2 text-sm"
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
                    disable={runner?.marketStatus === "SUSPENDED"}
                    authUser={authUser}
                  />
                ) : (
                  <OddsButton
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
                    disable={runner?.marketStatus === "SUSPENDED"}
                    authUser={authUser}
                  />
                ) : (
                  <OddsButton
                    disable={runner?.marketStatus === "SUSPENDED"}
                    authUser={authUser}
                  />
                )}
              </div>
              {oddsData?.runners &&
                oddsData?.runners[0]?.marketStatus === "SUSPENDED" && (
                  <div className="absolute left-[40%] z-20 border-2 border-red-600 text-red-600 font-bold text-2xl text-center w-[200px]">
                    <h2>Suspended</h2>
                  </div>
                )}
            </div>
          ))}
          {oddsData.marketId === selectedBetData.marketId && (
            <BetSlipMob authUser={authUser} />
          )}
        </>
      )}
    </div>
  );
};
