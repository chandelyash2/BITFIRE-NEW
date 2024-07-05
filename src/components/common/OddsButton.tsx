import { CMSModal } from "@/context";
import {
  BookmakerMarketType,
  Event,
  MarketRunners,
  MarketType,
  PriceSize,
} from "@/graphql/generated/schema";

import { useContext } from "react";
import { twMerge } from "tailwind-merge";

interface OddsBtnProp {
  data?: PriceSize | null;
  oddsData?: MarketType | undefined | null | BookmakerMarketType;
  eventData?: Event;
  runner?: MarketRunners | null;
  type?: string;
  color?: string;
  disable?: boolean;
}
export const OddsButton = ({
  data,
  oddsData,
  eventData,
  runner,
  type,
  color,
  disable,
}: OddsBtnProp) => {
  const { setSelectedBetData } = useContext(CMSModal);
  return (
    <div
      // isDisabled={disable ? true : false}
      className={twMerge(
        "p-2 rounded-md flex flex-col items-center justify-center w-[70px] lg:w-[80px] cursor-pointer font-semibold",
        type === "back" ? "bg-[#0078FF38]" : "bg-[#FF008B36]"
      )}
      onClick={() => {
        setSelectedBetData({
          marketId: oddsData?.marketId,
          odds: data?.price,
          ...eventData,
          betType: type,
          ...runner,
        });
      }}
    >
      <span className="text-white text-sm font-bold">
        {data?.price || "--"}
      </span>
      <span
        className={twMerge(
          "text-[10px]",
          type === "back" ? "text-[#0078FF]" : "text-[#FF008B]"
        )}
      >
        {data?.size ? `${data.size}` : ""}
      </span>
    </div>
  );
};
