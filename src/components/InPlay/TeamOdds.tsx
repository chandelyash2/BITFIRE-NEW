import { MarketType } from "@/graphql/generated/schema";
import { OddsButton } from "../common/OddsButton";

interface TeamOddsProp {
  market: MarketType | undefined | null;
}
export const TeamOdds = ({ market }: TeamOddsProp) => {
  const matchOdds: any = market?.runners?.map((odds) => odds);

  return (
    <div className="flex items-center justify-between gap-6">
      <div className="flex gap-1 items-center">
        {matchOdds[0]?.back ? (
          <OddsButton data={matchOdds[0]?.back[0]} type="back" label="inplay" />
        ) : (
          <OddsButton type="back" />
        )}
        {matchOdds[0]?.lay ? (
          <OddsButton data={matchOdds[0]?.lay[0]} type="lay" label="inplay" />
        ) : (
          <OddsButton type="lay" />
        )}{" "}
      </div>

      <div className="flex gap-2 items-center">
        {matchOdds[1]?.back ? (
          <OddsButton data={matchOdds[1]?.back[0]} type="back" label="inplay" />
        ) : (
          <OddsButton type="back" />
        )}
        {matchOdds[1]?.lay ? (
          <OddsButton data={matchOdds[1]?.lay[0]} type="lay" label="inplay" />
        ) : (
          <OddsButton type="lay" />
        )}
      </div>
    </div>
  );
};
