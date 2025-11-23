import { Typography } from "@mui/joy";
import Image from "next/image";
import { ConfigButton } from "@/components/ConfigButton";

export const Header = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-center gap-4 shadow-sm z-10 relative">
      <Image
        src="/voc.png"
        alt="VOC Logo"
        width={120}
        height={120}
        className="opacity-80"
        style={{ maxHeight: "4rem" }}
      />
      <Typography
        level="h1"
        textAlign="center"
        sx={{
          fontSize: { xs: "1.5rem", md: "2rem" },
          fontWeight: 700,
          color: "primary.600",
          textShadow: "0 2px 4px rgba(0,0,0,0.2)",
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
        style={{ maxHeight: "4rem" }}
      />
      
      <div style={{ position: "absolute", right: "1.5rem" }}>
        <ConfigButton />
      </div>
    </header>
  );
};
