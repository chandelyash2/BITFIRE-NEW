import { OddsButton } from "@/components/common/OddsButton";
import {
  BookmakerMarketType,
  MarketType,
  User,
} from "@/graphql/generated/schema";

export interface MatchOddsProp {
  oddsData: MarketType | undefined | null | BookmakerMarketType;
  // eventData: Event | any;
  // user: User;
}
export const MatchOddsDesk = ({ oddsData }: MatchOddsProp) => {
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
              className="flex justify-between items-center bg-highlight text-white p-3 rounded-md mb-2"
            >
              <h4>{runner?.runnerName}</h4>
              <div className="flex gap-2 text-primary font-semibold">
                {runner?.ex?.availableToBack &&
                  runner?.ex?.availableToBack?.length > 0 &&
                  runner.ex.availableToBack
                    .sort((a: any, b: any) => a.price - b.price)
                    .map((data, i) =>
                      data && data?.price > 0 ? (
                        <OddsButton
                          key={i}
                          data={data}
                          oddsData={oddsData}
                          runner={runner}
                          // handleData={handleData}
                          type="back"
                          color="bg-blue-300"
                          disable={runner?.marketStatus === "SUSPENDED"}
                        />
                      ) : (
                        <OddsButton
                          key={i}
                          color="bg-blue-300"
                          disable={runner?.marketStatus === "SUSPENDED"}
                        />
                      )
                    )}

                {runner?.ex?.availableToLay &&
                  runner?.ex?.availableToLay?.length > 0 &&
                  runner.ex.availableToLay.map((data, i) =>
                    data && data?.price > 0 ? (
                      <OddsButton
                        key={i}
                        data={data}
                        oddsData={oddsData}
                        runner={runner}
                        // handleData={handleData}
                        type="lay"
                        color="bg-pink-300"
                        disable={runner?.marketStatus === "SUSPENDED"}
                      />
                    ) : (
                      <OddsButton
                        key={i}
                        color="bg-pink-300"
                        disable={runner?.marketStatus === "SUSPENDED"}
                      />
                    )
                  )}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
