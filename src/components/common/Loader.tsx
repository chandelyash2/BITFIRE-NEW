import { Spinner } from "@chakra-ui/react";
export const Loader = () => {
  return (
    <div className="fixed z-1 left-0 top-0 w-full h-full overflow-auto bg-transparent">
      <div className="relative left-[40%] lg:left-[50%] top-[45%]">
        <Spinner color="green.500" size="xl" />
      </div>
    </div>
  );
};
