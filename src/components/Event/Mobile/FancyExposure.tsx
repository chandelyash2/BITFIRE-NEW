import { RunsList } from "@/graphql/generated/schema";
import { twMerge } from "tailwind-merge";

interface FancyExposureProp {
  selectedRunner: string;
  expoData: RunsList | null | any;
}
export const FancyExposure = ({
  selectedRunner,
  expoData,
}: FancyExposureProp) => {
  return (
    <div className="h-[170px] overflow-auto">
      <h2 className="font-bold">{selectedRunner}</h2>
      {expoData.map((expo: RunsList) => (
        <div
          key={expo.name}
          className={twMerge(
            "flex justify-between items-center py-2 px-4 border-b text-xs",
            expo.price && expo.price < 0 ? "bg-[#FF008B36]" : "bg-[#0078FF38]"
          )}
        >
          <h2>{expo.name}</h2>
          <h2
            className={twMerge(
              expo.price && expo.price > 0
                ? "text-secondary"
                : expo.price && expo.price < 0
                ? "text-red-500"
                : "text-black",

              "font-bold"
            )}
          >
            {expo.price}
          </h2>
        </div>
      ))}
    </div>
  );
};
