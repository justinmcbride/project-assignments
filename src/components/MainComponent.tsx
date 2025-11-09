"use client";

import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { RoleCard } from "@/components/RoleCard";
import { StudentItem } from "@/components/StudentItem";
import { EditConfigModal } from "@/components/EditConfigModal";
import { Divider, Grid, Typography, Button } from "@mui/joy";
import { useAppState } from "@/AppContext";
import SettingsIcon from "@mui/icons-material/Settings";

const MainComponent = () => {
  const { state } = useAppState();
  const [editModalOpen, setEditModalOpen] = useState(false);

  const students = state.students;
  const roles = state.roles;

  return (
    <DndProvider backend={HTML5Backend}>
      <main className="w-full flex flex-col" style={{ height: 'calc(100vh - 10rem)', overflow: 'hidden' }}>
        {/* Students section at the top */}
        <div className="bg-white rounded-lg shadow-md p-3 mb-4" style={{ flexShrink: 0 }}>
          <div className="flex items-center justify-between mb-2">
            <Divider sx={{ flex: 1 }}>
              <Typography level="title-lg" sx={{ color: "primary.600" }}>
                All Students
              </Typography>
            </Divider>
            <Button
              variant="soft"
              color="primary"
              startDecorator={<SettingsIcon />}
              onClick={() => setEditModalOpen(true)}
              sx={{ ml: 2 }}
            >
              Edit Config
            </Button>
          </div>
          <Grid container spacing={1}>
            {students.map((student) => (
              <Grid xs="auto" key={student.name}>
                <StudentItem student={student} />
              </Grid>
            ))}
          </Grid>
        </div>
        
        {/* Roles grid - fixed 2 rows x 4 columns */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gap: '1rem', minHeight: 0 }}>
          {roles.slice(0, 8).map((role) => (
            <div key={role.name} style={{ minWidth: 0, minHeight: 0 }}>
              <RoleCard role={role} />
            </div>
          ))}
        </div>
      </main>

      <EditConfigModal open={editModalOpen} onClose={() => setEditModalOpen(false)} />
    </DndProvider>
  );
};

export default MainComponent;
