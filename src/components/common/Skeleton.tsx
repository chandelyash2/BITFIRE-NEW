import { Skeleton, Stack } from "@chakra-ui/react";

export const SkeletonComp = () => {
  return (
    <Stack>
      <Skeleton height="40px"></Skeleton>
      <Skeleton
        height="40px"
        bg="green.500"
        color="white"
        fadeDuration={1}
      ></Skeleton>
      <Skeleton
        height="40px"
        fadeDuration={4}
        bg="blue.500"
        color="white"
      ></Skeleton>
    </Stack>
  );
};
