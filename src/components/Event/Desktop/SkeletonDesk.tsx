import { Skeleton, Stack } from "@chakra-ui/react";

export const SkeletonDesk = () => {
  return (
    <>
      <Stack>
        <Skeleton
          height="35px"
          startColor="gray.100"
          endColor="gray.200"
          width="70%"
        />
        <Skeleton
          height="35px"
          startColor="gray.100"
          endColor="gray.200"
          width="70%"
        />
      </Stack>{" "}
      <Stack>
        <Skeleton
          height="35px"
          startColor="gray.100"
          endColor="gray.200"
          width="70%"
        />
        <Skeleton
          height="35px"
          startColor="gray.100"
          endColor="gray.200"
          width="70%"
        />
      </Stack>{" "}
      <Stack>
        <Skeleton
          height="35px"
          startColor="gray.100"
          endColor="gray.200"
          width="70%"
        />
        <Skeleton
          height="35px"
          startColor="gray.100"
          endColor="gray.200"
          width="70%"
        />
      </Stack>
    </>
  );
};
