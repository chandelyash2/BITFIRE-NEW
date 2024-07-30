import { CMSModal } from "@/context";
import {
  Event,
  MarketRunners,
  MarketType,
  PriceSize,
  User,
} from "@/graphql/generated/schema";
import { Button, useToast } from "@chakra-ui/react";
import { useContext } from "react";
import { twMerge } from "tailwind-merge";

interface OddsBtnProp {
  data?: PriceSize | null;
  oddsData?: MarketType | undefined | null ;
  eventData?: Event;
  runner?: MarketRunners | null;
  type?: string;
  color?: string;
  disable?: boolean;
  authUser?: User;
  label?: string;
}
export const OddsButton = ({
  data,
  oddsData,
  eventData,
  runner,
  type,
  disable,
  authUser,
  label,
}: OddsBtnProp) => {
  const { setSelectedBetData, setActiveSlip } = useContext(CMSModal);
  const toast = useToast();
  return (
    <Button
      colorScheme="transparent"
      isDisabled={disable}
      color="transparent"
      className={twMerge(
        "p-2 rounded-md flex flex-col items-center justify-center w-[70px] lg:w-[80px] cursor-pointer font-semibold",
        type === "back" ? "bg-[#0078FF38]" : "bg-[#FF008B36]"
      )}
      onClick={() => {
        if (label === "inplay") return null;
        if (!authUser?._id && !disable) {
          return toast({
            description: "Please login to continue",
            status: "error",
            duration: 2000,
          });
        }
        setSelectedBetData({
          marketId: oddsData?.marketId,
          odds: data?.price,
          ...eventData,
          betType: type,
          ...runner,
          bettingType: oddsData?.bettingType,
        });
        setActiveSlip("Bet Slip");
      }}
    >
      <span className="text-white text-sm font-bold">
        {oddsData?.bettingType === "LINE"
          ? data?.line || "--"
          : data?.price || "--"}
      </span>
      <span
        className={twMerge(
          "text-[10px]",
          type === "back" ? "text-[#0078FF]" : "text-[#FF008B]"
        )}
      >
        {oddsData?.bettingType === "LINE" ? data?.price : data?.size || ""}
      </span>
    </Button>
  );
};
