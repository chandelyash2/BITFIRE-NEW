import { Skeleton, Stack } from "@chakra-ui/react";

export const SkeletonComp = () => {
  return (
    <Stack>
      <Skeleton height="50px" startColor="gray.100" endColor="gray.200" />
      <Skeleton height="50px" startColor="gray.100" endColor="gray.200" />
      <Skeleton height="50px" startColor="gray.100" endColor="gray.200" />
    </Stack>
  );
};
