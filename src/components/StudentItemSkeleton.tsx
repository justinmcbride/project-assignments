"use client";

import { Skeleton } from "@mui/joy";

export const StudentItemSkeleton = () => {
  return (
    <Skeleton
      variant="rectangular"
      width={100}
      height={32}
      sx={{
        borderRadius: "8px",
        display: "inline-block",
      }}
    />
  );
};
