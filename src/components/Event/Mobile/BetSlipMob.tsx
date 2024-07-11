import { CMSModal } from "@/context";
import {
  BetType,
  GetMarketPlDocument,
  MeDocument,
  OpenBetsDocument,
  UnMatchedBetsDocument,
  usePlaceBetMutation,
} from "@/graphql/generated/schema";
import { Button, Input, useToast } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";
import { twMerge } from "tailwind-merge";
import { ProfileProp } from "..";

export const BetSlipMob = ({ authUser }: ProfileProp) => {
  const { setSelectedBetData, selectedBetData } = useContext(CMSModal);
  const [stake, setStake] = useState<number>(0);
  const [odds, setOdds] = useState<number>(selectedBetData.odds);
  const [profit, setProfit] = useState<number>(0);
  const [loss, setLoss] = useState<number>(0);
  const toast = useToast();
  const [placeBet, { loading: betLoading }] = usePlaceBetMutation({
    refetchQueries: [
      OpenBetsDocument,
      GetMarketPlDocument,
      MeDocument,
      UnMatchedBetsDocument,
    ],
  });

  useEffect(() => {
    calculateProfitLoss(selectedBetData, odds, stake);
  }, [odds]);

  useEffect(() => {
    resetBetSlip();
  }, [selectedBetData.odds]);

  const resetBetSlip = () => {
    setProfit(0);
    setLoss(0);
    setStake(0);
    setOdds(selectedBetData.odds);
  };

  const calculateProfitLoss = (
    betType: BetType,
    odds: number,
    stake: number
  ) => {
    if (betType.betType === "back") {
      setProfit((odds - 1) * stake);
      setLoss(stake);
      // setBetPl({
      //     selectionId: betType.selectionId,
      //     profit: (odds - 1) * stake,
      //     loss: stake,
      //     type: "back",
      //     marketId: betType.marketId,
      // });
    } else {
      setProfit(stake);
      setLoss((odds - 1) * stake);
      // setBetPl({
      //     selectionId: betType.selectionId,
      //     profit: stake,
      //     loss: (odds - 1) * stake,
      //     type: "lay",
      //     marketId: betType.marketId,
      // });
    }
  };
  const handleStakeChange = (value: number) => {
    const newValue = stake + value;
    setStake(newValue);
    if (newValue) {
      calculateProfitLoss(selectedBetData, odds, newValue);
    }
  };

  const handleInputStakeChange = (value: number) => {
    setStake(value);
    if (value > 0) {
      calculateProfitLoss(selectedBetData, odds, value);
    } else {
      setProfit(0);
      setLoss(0);
    }
  };

  const handleBetPlacement = async () => {
    if (stake > selectedBetData.maxLimit) {
      return toast({
        description: "Stake should be less than max bet limit",
        status: "error",
        size: "10",
        duration: 1000,
      });
    }
    if (stake < selectedBetData.minLimit) {
      return toast({
        description: "Stake should be greater than min bet limit",
        size: "10",
        status: "error",
        duration: 1000,
      });
    }

    const result = await placeBet({
      variables: {
        input: {
          stake,
          odds,
          profit: Math.round(profit as number),
          loss: Math.round(loss as number),
          exposure: authUser.exposure || 0,
          eventId: selectedBetData.eventId,
          sportId: selectedBetData.sportId,
          betType: selectedBetData.betType,
          eventName: selectedBetData.name,
          runnerName: selectedBetData.runnerName,
          selectionId: selectedBetData.selectionId,
          marketId: selectedBetData.marketId,
        },
      },
    });
    const placedBet = result.data?.placeBet;
    if (placedBet?.bet) {
      toast({
        description: "Bet Placed",
        status: "success",
      });
      setSelectedBetData({});
    }
    if (placedBet?.error) {
      toast({
        description: placedBet.error.message,
        status: "error",
      });
    }
  };
  return (
    <div className="bg-[#FFFFFF08] rounded-md p-3 flex flex-col gap-3">
      <div className="flex items-center justify-between rounded-md">
        <h2 className="text-white text-xs flex gap-1 items-center font-bold">
          {selectedBetData.runnerName}
          <span
            className={twMerge(
              "font-medium",
              selectedBetData.betType === "back"
                ? "text-[#0078FF]"
                : "text-[#FF008B]"
            )}
          >
            ({selectedBetData.betType})
          </span>
        </h2>
        <h4 className="bg-[#0078FF] p-1 text-white text-xs rounded-md">
          Max Market:
          <span className="font-bold">{selectedBetData.maxLimit * 5}</span>
        </h4>
      </div>
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex items-center gap-1 text-xs">
          <h2 className="bg-primary text-text p-1 rounded-md">
            Min : {selectedBetData.minLimit}
          </h2>
          <h2 className="bg-primary text-text p-1 rounded-md">
            Max : {selectedBetData.maxLimit}
          </h2>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <h2 className="bg-primary p-1 rounded-md flex items-center gap-1 text-green-600">
            <TbTriangleFilled />
            P:{Math.round(profit)}
          </h2>
          <h2 className="bg-primary p-1 rounded-md flex items-center gap-1 text-red-600">
            <TbTriangleInvertedFilled />
            L:{Math.round(loss)}
          </h2>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="bg-secondary text-white py-1 rounded-md flex items-center gap-2 w-40 justify-center">
          <Button
            className="text-lg w-10"
            background="transparent"
            colorScheme="transparent"
            onClick={() =>
              setOdds((prevOdds) => parseFloat((prevOdds - 0.01).toFixed(2)))
            }
          >
            -
          </Button>
          <span className="bg-[#0000006E] py-1 w-20 flex justify-center rounded-md">
            {odds}
          </span>
          <Button
            className="text-lg w-10"
            background="transparent"
            colorScheme="transparent"
            onClick={() =>
              setOdds((prevOdds) => parseFloat((prevOdds + 0.01).toFixed(2)))
            }
          >
            +
          </Button>
        </div>
        <Input
          placeholder="Stake"
          className="max-w-32"
          textColor="white"
          background="#FFFFFF17"
          type="number"
          textAlign="center"
          value={stake}
          onChange={(e) => handleInputStakeChange(parseInt(e.target.value))}
        />
      </div>
      <div className="grid grid-cols-4 gap-2 text-xs">
        {authUser.stakes &&
          authUser?.stakes.map((item) => (
            <span
              className="p-2 bg-[#1C1E21] text-text rounded-md w-20 flex justify-center  items-center cursor-pointer"
              key={item}
              onClick={() => item && handleStakeChange(item)}
            >
              {item}
            </span>
          ))}
        <span
          className="p-2 bg-[#141414] text-text rounded-md w-20 flex justify-center cursor-pointer items-center"
          onClick={() => handleStakeChange(selectedBetData.maxLimit)}
        >
          Max
        </span>
      </div>
      <div className="flex items-center justify-between">
        <Button
          background="#FFFFFF14"
          color="#FFFFFF8A"
          className="w-32"
          onClick={() => setSelectedBetData({})}
          colorScheme="red"
          isDisabled={betLoading}
        >
          Remove Bet
        </Button>
        <Button
          background="#0078FF70"
          color="white"
          className="w-32"
          colorScheme="green"
          onClick={handleBetPlacement}
          isLoading={betLoading}
        >
          Place Bet
        </Button>
      </div>
    </div>
  );
};
