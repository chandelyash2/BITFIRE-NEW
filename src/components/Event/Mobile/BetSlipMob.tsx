import { Button, Input } from "@chakra-ui/react";
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";

const arr = [200, 300, 800, 1500, 5000, 10000, 15000];
export const BetSlipMob = () => {
  return (
    <div className="bg-[#FFFFFF08] rounded-md p-3 flex flex-col gap-3">
      <div className="flex items-center justify-between rounded-md">
        <h2 className="text-white text-sm">Dummy (Back)</h2>
        <h4 className="bg-[#0078FF] p-1 text-white text-xs rounded-md">
          Max Market:<span className="font-bold">50000</span>
        </h4>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs">
          <h2 className="bg-primary text-text p-1 rounded-md">Min : 100</h2>
          <h2 className="bg-primary text-text p-1 rounded-md">Max : 10000</h2>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <h2 className="bg-primary text-text p-1 rounded-md flex items-center gap-1 text-green-500">
            <TbTriangleFilled />
            P:1000
          </h2>
          <h2 className="bg-primary text-text p-1 rounded-md flex items-center gap-1 text-red-500">
            <TbTriangleInvertedFilled />
            L:10000
          </h2>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="bg-secondary text-white py-1 px-4 rounded-md flex items-center gap-2 w-32 justify-center">
          <span className="text-lg">-</span>
          <span className="bg-[#0000006E] py-1 px-4 rounded-md">1.51</span>
          <span className="text-lg">+</span>
        </div>
        <Input
          placeholder="Stake"
          className="max-w-32"
          textColor="white"
          background="#FFFFFF17"
          type="number"
          textAlign="center"
        />
      </div>
      <div className="grid grid-cols-4 gap-2 text-xs">
        {arr.map((item) => (
          <span
            className="p-2 bg-[#1C1E21] text-text rounded-md w-20 flex justify-center "
            key={item}
          >
            {item}
          </span>
        ))}
        <span className="p-2 bg-[#141414] text-text rounded-md w-20 flex justify-center">
          Max
        </span>
      </div>
      <div className="flex items-center justify-between">
        <Button background="#FFFFFF14" color="#FFFFFF8A" className="w-40">
          Remove Bet
        </Button>
        <Button background="#0078FF70" color="white" className="w-40">
          Place Bet
        </Button>
      </div>
    </div>
  );
};
