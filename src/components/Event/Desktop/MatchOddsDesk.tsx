import { OddsButton } from "@/components/common/OddsButton";
import { CMSModal } from "@/context";
import {
  BookmakerMarketType,
  Event,
  MarketType,
  useGetMarketPlQuery,
  User,
} from "@/graphql/generated/schema";
import { useContext } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

export interface MatchOddsProp {
  oddsData: MarketType | undefined | null | BookmakerMarketType;
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
  console.log(oddsData, "ODSSSSS");

  const findPL: any = (selectionId: string) => {
    const plData = marketPl?.pl?.find(
      (item) => item?.selectionId === selectionId
    );

    if (plData?.price) {
      return plData?.price;
    }
  };
  const findCurrentPl: any = (selectionId: string) => {
    const plData: any = marketPl?.pl?.find(
      (item) => item?.selectionId === selectionId
    );
    if (marketPl?.marketId === betPl.marketId) {
      if (plData?.selectionId === betPl?.selectionId) {
        return betPl?.type === "back"
          ? Math.round(plData?.price + betPl?.profit) || null
          : Math.round(plData?.price - betPl?.loss) || null;
      } else {
        return betPl?.type === "back"
          ? Math.round(plData?.price - betPl?.loss) || null
          : Math.round(plData?.price + betPl?.profit) || null;
      }
    } else if (plData?.price) {
      return plData.price;
    } else {
      return null;
    }
  };
  return (
    <div>
      <div className="bg-[#171717] text-secondary text-lg font-bold py-2 px-3 text-center rounded-md inline-block">
        {oddsData?.marketName}
      </div>

      {oddsData?.runners && (
        <>
          {oddsData.runners.slice(0, 3).map((runner, index) => (
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
                      {oddsData.marketId === betPl.marketId &&
                        findCurrentPl(runner?.selectionId) !== null && (
                          <span className="text-text">
                            <FaLongArrowAltRight />
                          </span>
                        )}
                      {findCurrentPl(runner?.selectionId, oddsData.marketId)}
                    </div>
                  ) : (
                    findPL(runner?.selectionId)
                  )}
                </span>
              </h4>
              <div className="flex gap-2 text-primary font-semibold">
                {runner?.back && runner.back.length > 0 ? (
                  runner.back
                    .sort((a: any, b: any) => a.price - b.price)
                    .map((data, i) =>
                      data && data?.price > 0 ? (
                        <OddsButton
                          authUser={authUser}
                          key={i}
                          data={data}
                          oddsData={oddsData}
                          eventData={eventData}
                          runner={runner}
                          type="back"
                          disable={runner?.marketStatus === "SUSPENDED"}
                        />
                      ) : (
                        <OddsButton
                          authUser={authUser}
                          key={i}
                          disable={runner?.marketStatus === "SUSPENDED"}
                          type="back"
                        />
                      )
                    )
                ) : (
                  <>
                    {Array.from({ length: 3 }, (_, index) => (
                      <OddsButton
                        key={index}
                        authUser={authUser}
                        disable={runner?.marketStatus === "SUSPENDED"}
                        type="lay"
                      />
                    ))}
                  </>
                )}

                {runner?.lay && runner?.lay.length > 0 ? (
                  runner.lay.map((data, i) =>
                    data && data?.price > 0 ? (
                      <OddsButton
                        key={i}
                        data={data}
                        oddsData={oddsData}
                        eventData={eventData}
                        runner={runner}
                        type="lay"
                        disable={runner?.marketStatus === "SUSPENDED"}
                        authUser={authUser}
                      />
                    ) : (
                      <OddsButton
                        key={i}
                        disable={runner?.marketStatus === "SUSPENDED"}
                        authUser={authUser}
                        type="lay"
                      />
                    )
                  )
                ) : (
                  <>
                    {Array.from({ length: 3 }, (_, index) => (
                      <OddsButton
                        key={index}
                        authUser={authUser}
                        disable={runner?.marketStatus === "SUSPENDED"}
                        type="back"
                      />
                    ))}
                  </>
                )}
              </div>
              {oddsData?.runners &&
                oddsData?.runners[0]?.marketStatus === "SUSPENDED" && (
                  <div className="absolute left-[40%] z-20 border-2 border-red-600 text-red-600 font-bold text-2xl text-center w-[300px]">
                    <h2>Suspended</h2>
                  </div>
                )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};
