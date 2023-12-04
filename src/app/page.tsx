"use client";

import { AppProvider, useAppState } from "@/AppContext";
import Test from "@/components/MainComponent";
import { Typography } from "@mui/joy";

export default () => {
  return (
    <div>
      <AppProvider>
        <Test />
      </AppProvider>
    </div>
  );
};
