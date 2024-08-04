import React, { useContext, useState } from "react";
import { MatchOddsProp } from "./MatchOddsMob";
import { OddsButton } from "@/components/common/OddsButton";
import {
  PriceSize,
  useGetFancyPlQuery,
  useGetMarketPlQuery,
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

export const FancyMark = ({ oddsData, eventData, authUser }: MatchOddsProp) => {
  const { selectedBetData } = useContext(CMSModal);
  const [selectedRunner, setSelectedRunner] = useState("");

  const { data: fancyPl } = useGetFancyPlQuery({
    variables: {
      marketId: parseInt(oddsData?.marketId as any),
    },
  });
  const marketPl = fancyPl?.getFancyPl;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const renderOddsButton = (runner: any, type: "back" | "lay") => {
    const odds = type === "back" ? runner?.back : runner?.lay;
    const sortedOdds = odds
      ? odds
          .filter((data: PriceSize) => data && data.price > 0)
          .sort((a: any, b: any) =>
            type === "back" ? b.price - a.price : a.price - b.price
          )
      : [];

    return sortedOdds.length > 0 ? (
      <OddsButton
        key={type}
        data={sortedOdds[0]}
        oddsData={oddsData}
        runner={runner}
        eventData={eventData}
        type={type}
        disable={runner?.marketStatus === "SUSPENDED" || runner?.ballRunning}
        authUser={authUser}
      />
    ) : (
      <OddsButton
        key={type}
        disable={runner?.marketStatus === "SUSPENDED" || runner?.ballRunning}
        authUser={authUser}
        type={type}
      />
    );
  };
  return (
    <>
      {oddsData?.runners?.map(
        (runner, index) =>
          runner?.runnerName && (
            <div
              className="relative flex justify-between gap-2 items-center bg-[#24262B5E] text-white p-2 rounded-md text-sm mb-1"
              key={index}
            >
              <h4
                className="flex flex-col gap-1 font-semibold"
                onClick={() => {
                  setSelectedRunner(runner.runnerName);
                  onOpen();
                }}
              >
                {runner?.runnerName}
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
                {oddsData?.bettingType === "LINE" ? (
                  <>
                    {renderOddsButton(runner, "lay")}
                    {renderOddsButton(runner, "back")}
                  </>
                ) : (
                  <>
                    {renderOddsButton(runner, "back")}
                    {renderOddsButton(runner, "lay")}
                  </>
                )}
              </div>

              {runner?.marketStatus === "SUSPENDED" && (
                <div className="absolute left-[40%] z-20 border-2 border-red-600 text-red-600 font-bold text-xl text-center w-[200px]">
                  <h2>Suspended</h2>
                </div>
              )}
              {runner?.ballRunning && (
                <div className="absolute left-[40%] z-20 border-2 border-red-600 text-red-600 font-bold text-xl text-center w-[200px]">
                  <h2>Ball Running</h2>
                </div>
              )}
            </div>
          )
      )}
      <div className="flex lg:hidden">
        {oddsData?.marketId === selectedBetData.marketId && (
          <BetSlipMob authUser={authUser} />
        )}
      </div>
      {marketPl?.runs &&
        marketPl.runs.length >
          0&&(
            <Modal isOpen={isOpen} onClose={onClose} >
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
