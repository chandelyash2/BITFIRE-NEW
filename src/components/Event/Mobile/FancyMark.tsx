import React, { useContext, useState } from "react";
import { MatchOddsProp } from "./MatchOddsMob";
import { OddsButton } from "@/components/common/OddsButton";
import {
  FancyMarket,
  FancyMarketNew,
  PriceSize,
  useGetFancyPlQuery,
  useGetMarketPlQuery,
  User,
} from "@/graphql/generated/schema";
import { CMSModal } from "@/context";
import { twMerge } from "tailwind-merge";
import { BetSlipMob } from "./BetSlipMob";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@chakra-ui/react";
import { FancyExposure } from "./FancyExposure";

interface FancyProp {
  oddsData: FancyMarketNew | undefined | null;
  eventData: Event | any;
  authUser: User;
}
export const FancyMark = ({ oddsData, eventData, authUser }: FancyProp) => {
  const { selectedBetData } = useContext(CMSModal);
  const [selectedRunner, setSelectedRunner] = useState<string>("");

  const { data: fancyPl } = useGetFancyPlQuery({
    variables: {
      marketId: parseInt(oddsData?.marketId as any),
    },
  });
  const marketPl = fancyPl?.getFancyPl;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const renderOddsButton = (runner: any, type: "back" | "lay") => {
    const odds = type === "back" ? runner?.back : runner?.lay;

    return (
      <OddsButton
        key={type}
        data={odds}
        oddsData={oddsData}
        runner={runner}
        eventData={eventData}
        type={type}
        disable={runner?.marketStatus === "SUSPENDED" || runner?.ballRunning}
        authUser={authUser}
      />
    );
  };
  return (
    <>
      <div className="relative flex justify-between gap-2 items-center bg-[#24262B5E] text-white p-2 rounded-md text-sm mb-1">
        <h4
          className="flex flex-col gap-1 font-semibold"
          onClick={() => {
            oddsData?.runnerName && setSelectedRunner(oddsData?.runnerName);
            onOpen();
          }}
        >
          {oddsData?.runnerName}
          <span
            className={twMerge(
              marketPl?.exposure && marketPl?.exposure < 0
                ? "text-red-500"
                : "text-text"
            )}
          >
            {marketPl?.exposure}
          </span>
        </h4>

        <div className="flex gap-2 text-primary font-semibold">
          {renderOddsButton(oddsData, "lay")}
          {renderOddsButton(oddsData, "back")}
        </div>

        {oddsData?.status !== "" && (
          <div className="absolute left-[48%] z-20 text-red-600 font-bold text-xl text-center w-[200px]">
            <h2>{oddsData?.status}</h2>
          </div>
        )}
      </div>

      <div className="flex lg:hidden">
        {oddsData?.marketId === selectedBetData.marketId && (
          <BetSlipMob authUser={authUser} />
        )}
      </div>
      {marketPl?.runs && marketPl.runs.length > 0 && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            <ModalHeader className="text-secondary">Exposure</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FancyExposure
                selectedRunner={selectedRunner}
                expoData={marketPl?.runs}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
