import { Button } from "@chakra-ui/react";
import React from "react";

const CasinogamePlay = ({
  src,
  title,
  handleClose,
}: {
  src: string;
  title: string;
  handleClose: () => void;
}) => {
  return (
    <div className="p-2 lg:p-8 md:p-8">
      <div className="mb-4 flex justify-end">
        <Button size='xs' colorScheme="yellow" onClick={handleClose}>
          Close Game
        </Button>
      </div>

      <div
        className="relative w-full h-full overflow-hidden"
        style={{ paddingTop: "56.25%" }}
      >
        <iframe
          src={src} // Replace with your URL
          title={title}
          className="absolute top-0 left-0 w-full h-full border-0"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default CasinogamePlay;
