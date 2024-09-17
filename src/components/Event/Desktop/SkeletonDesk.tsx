import { Skeleton, Stack } from "@chakra-ui/react";

export const SkeletonDesk = () => {
  return (
    <>
      <Stack mt="4">
        <Skeleton
          height="25px"
          startColor="gray.100"
          endColor="gray.200"
          width="70%"
        />
        <Skeleton
          height="25px"
          startColor="gray.100"
          endColor="gray.200"
          width="70%"
        />
      </Stack>{" "}
      <Stack mt="4">
        <Skeleton
          height="25px"
          startColor="gray.100"
          endColor="gray.200"
          width="70%"
        />
        <Skeleton
          height="25px"
          startColor="gray.100"
          endColor="gray.200"
          width="70%"
        />
      </Stack>{" "}
      <Stack mt="4">
        <Skeleton
          height="25px"
          startColor="gray.100"
          endColor="gray.200"
          width="70%"
        />
        <Skeleton
          height="25px"
          startColor="gray.100"
          endColor="gray.200"
          width="70%"
        />
      </Stack>
    </>
  );
};
