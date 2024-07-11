import { MarketType } from "@/graphql/generated/schema";
import { OddsButton } from "../common/OddsButton";

interface TeamOddsProp {
  market: MarketType | undefined | null;
}
export const TeamOdds = ({ market }: TeamOddsProp) => {
  const matchOdds: any = market?.runners?.map((odds) => odds?.ex);

  return (
    <div className="flex items-center justify-between gap-6">
      <div className="flex gap-1 items-center">
        <OddsButton
          data={matchOdds[0]?.availableToBack[0]}
          type="back"
          disable={true}
        />
        <OddsButton
          data={matchOdds[0]?.availableToLay[0]}
          type="back"
          disable={true}
        />
      </div>

      <div className="flex gap-2 items-center">
        <OddsButton
          data={matchOdds[1]?.availableToBack[0]}
          type="back"
          disable={true}
        />
        <OddsButton
          data={matchOdds[1]?.availableToLay[0]}
          type="lay"
          disable={true}
        />
      </div>
    </div>
  );
};
