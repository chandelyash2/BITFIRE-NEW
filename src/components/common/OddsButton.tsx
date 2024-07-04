import { CMSModal } from "@/context";
import {
  BookmakerMarketType,
  MarketRunners,
  MarketType,
  PriceSize,
} from "@/graphql/generated/schema";
import { Button } from "@chakra-ui/react";

import { useContext } from "react";
import { twMerge } from "tailwind-merge";

interface OddsBtnProp {
  data?: PriceSize | null;
  oddsData?: MarketType | undefined | null | BookmakerMarketType;
  handleData?: any;
  runner?: MarketRunners | null;
  type?: string;
  color?: string;
  disable?: boolean;
}
export const OddsButton = ({
  data,
  oddsData,
  runner,
  handleData,
  type,
  color,
  disable,
}: OddsBtnProp) => {
  const { setBetPl } = useContext(CMSModal);
  return (
    <div
      // isDisabled={disable ? true : false}
      className={twMerge(
        "p-2 rounded-md flex flex-col items-center justify-center w-[70px] lg:w-[80px] cursor-pointer font-semibold",
        type === "back" ? "bg-[#0078FF38]" : "bg-[#FF008B36]"
      )}
      onClick={() => {
        setBetPl({
          selectionId: "",
          profit: 0,
          loss: 0,
          type: "",
        });
        handleData(
          data,
          oddsData,
          runner?.runnerName,
          runner?.selectionId,
          type
        );
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
