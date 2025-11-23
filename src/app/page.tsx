"use client";

import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Typography, Button } from "@mui/joy";
import { useAppState } from "@/AppContext";
import { EditConfigModal } from "@/components/EditConfigModal";
import { RolesGrid } from "@/components/RolesGrid";
import { PeopleSidebar } from "@/components/PeopleSidebar";

const HomePage = () => {
  const { state } = useAppState();
  const [editModalOpen, setEditModalOpen] = useState(false);

  const students = state.students;
  const mentors = state.mentors;
  const roles = state.roles;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full min-h-[calc(100vh-5rem)] bg-gradient-to-br from-slate-50 to-blue-50 p-6 flex flex-col">
        <main
          className="w-full flex flex-col flex-1"
          style={{ minHeight: "calc(100vh - 10rem)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <Typography level="title-md" sx={{ fontWeight: 600 }}>
              Assignments Overview
            </Typography>
            <Button
              variant="outlined"
              size="sm"
              color="neutral"
              onClick={() => setEditModalOpen(true)}
            >
              Edit Config
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4 flex-1 min-h-0">
            <RolesGrid roles={roles} />
            <PeopleSidebar students={students} mentors={mentors} />
          </div>
        </main>

        <EditConfigModal open={editModalOpen} onClose={() => setEditModalOpen(false)} />
      </div>
    </DndProvider>
  );
};

export default HomePage;
