import { Box, Skeleton, SkeletonText, Stack } from "@chakra-ui/react";

export const SkeletonDesk = () => {
  return (
    <>
      <Box padding="6" boxShadow="lg" bg="transparent">
        <SkeletonText
          mt="4"
          noOfLines={4}
          spacing="4"
          skeletonHeight="4"
          width="70%"
        />
      </Box>{" "}
      <Box padding="6" boxShadow="lg" bg="transparent">
        <SkeletonText
          mt="4"
          noOfLines={4}
          spacing="4"
          skeletonHeight="4"
          width="70%"
        />
      </Box>{" "}
      <Box padding="6" boxShadow="lg" bg="transparent">
        <SkeletonText
          mt="4"
          noOfLines={4}
          spacing="4"
          skeletonHeight="4"
          width="70%"
        />
      </Box>{" "}
    </>
  );
};
