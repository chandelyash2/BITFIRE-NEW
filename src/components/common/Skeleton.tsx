import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

export const SkeletonComp = () => {
  return (
    <>
      <Box padding="6" boxShadow="lg" bg="transparent">
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
      </Box>{" "}
      <Box padding="6" boxShadow="lg" bg="transparent">
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
      </Box>{" "}
      <Box padding="6" boxShadow="lg" bg="transparent">
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
      </Box>{" "}
      <Box padding="6" boxShadow="lg" bg="transparent">
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
      </Box>
    </>
  );
};
