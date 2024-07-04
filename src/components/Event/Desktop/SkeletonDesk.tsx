import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

export const SkeletonDesk = () => {
  return (
    <Stack>
      <Skeleton
        height="50px"
        startColor="gray.100"
        endColor="gray.200"
        width="70%"
      />
      <Skeleton
        height="50px"
        startColor="gray.100"
        endColor="gray.200"
        width="70%"
      />
    </Stack>
  );
};
