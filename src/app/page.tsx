"use client";

import { AppProvider } from "@/AppContext";
import MainComponent from "@/components/MainComponent";
import { Typography } from "@mui/joy";

import Image from "next/image";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <AppProvider>
        <Typography level="h1" textAlign={"center"}>
          Final Project Assignments
        </Typography>
        <MainComponent />
        <div className="flex flex-row justify-center">
          <Image src="/cairn.png" alt="Cairn Logo" width={900} height={575} />
        </div>
      </AppProvider>
    </div>
  );
};

export default HomePage;
