"use client";

import { AppProvider } from "@/AppContext";
import MainComponent from "@/components/MainComponent";
import { Typography } from "@mui/joy";

import Image from "next/image";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <AppProvider>
        <div className="container mx-auto px-3 py-6 max-w-[1600px]">
          <Typography 
            level="h1" 
            textAlign="center"
            sx={{ 
              mb: 3,
              fontSize: { xs: '1.75rem', md: '2.5rem' },
              fontWeight: 700,
              color: 'primary.600'
            }}
          >
            Final Project Assignments
          </Typography>
          <MainComponent />
          <div className="mt-12 flex flex-row justify-center">
            <Image 
              src="/cairn.png" 
              alt="Cairn Logo" 
              width={900} 
              height={575}
              className="max-w-full h-auto opacity-80"
            />
          </div>
        </div>
      </AppProvider>
    </div>
  );
};

export default HomePage;
