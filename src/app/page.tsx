"use client";

import { AppProvider } from "@/AppContext";
import MainComponent from "@/components/MainComponent";
import { Typography } from "@mui/joy";

import Image from "next/image";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <AppProvider>
        <div className="container mx-auto pl-3 pr-0 py-6 max-w-[1600px]">
          <div className="flex items-center justify-center gap-4 mb-3">
            <Image 
              src="/voc.png" 
              alt="VOC Logo" 
              width={120} 
              height={120}
              className="h-auto opacity-80"
              style={{ maxHeight: '6rem' }}
            />
            <Typography 
              level="h1" 
              textAlign="center"
              sx={{ 
                fontSize: { xs: '1.75rem', md: '2.5rem' },
                fontWeight: 700,
                color: 'primary.600'
              }}
            >
              Final Project Assignments
            </Typography>
            <Image 
              src="/cairn.png" 
              alt="Cairn Logo" 
              width={120} 
              height={120}
              className="h-auto opacity-80"
              style={{ maxHeight: '6rem' }}
            />
          </div>
          <MainComponent />
        </div>
      </AppProvider>
    </div>
  );
};

export default HomePage;
