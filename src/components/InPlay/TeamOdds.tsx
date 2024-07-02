import { MarketRunners, MarketType } from "@/graphql/generated/schema";
import { OddsButton } from "../common/OddsButton";

interface TeamOddsProp {
  market: MarketType | undefined | null;
}
export const TeamOdds = ({ market }: TeamOddsProp) => {
  const matchOdds: any = market?.runners?.map((odds) => odds?.ex);
  console.log(matchOdds, "MAAA");

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-1 items-center">
        <OddsButton
          data={matchOdds[0]?.availableToBack[0]}
          handleData={() => null}
          type="back"
          color="bg-[#0078FF38]"
          disable={true}
        />
        <OddsButton
          data={matchOdds[0]?.availableToLay[0]}
          handleData={() => null}
          type="lay"
          color="bg-[#FF008B36]"
          disable={true}
        />
      </div>
      <span className="text-primary">X</span>
      <div className="flex gap-2 items-center">
        <OddsButton
          data={matchOdds[1]?.availableToBack[0]}
          handleData={() => null}
          type="back"
          color="bg-[#0078FF38]"
          disable={true}
        />
        <OddsButton
          data={matchOdds[1]?.availableToLay[0]}
          handleData={() => null}
          type="lay"
          color="bg-[#FF008B36]"
          disable={true}
        />
      </div>
    </div>
  );
};
