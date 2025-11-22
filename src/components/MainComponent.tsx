"use client";

import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { RoleCard, ROLE_CARD_MIN_HEIGHT, ROLE_CARD_MIN_WIDTH } from "@/components/RoleCard";
import { StudentItem } from "@/components/StudentItem";
import { MentorItem } from "@/components/MentorItem";
import { EditConfigModal } from "@/components/EditConfigModal";
import { Divider, Grid, Typography, Button } from "@mui/joy";
import { useAppState } from "@/AppContext";

const MainComponent = () => {
  const { state } = useAppState();
  const [editModalOpen, setEditModalOpen] = useState(false);

  const students = state.students;
  const mentors = state.mentors;
  const roles = state.roles;

  return (
    <DndProvider backend={HTML5Backend}>
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

        <div className="flex flex-1 gap-3 min-h-0 items-stretch">
          {/* Roles grid - fixed 2 rows x 4 columns */}
          <section className="flex-1 min-w-0 flex flex-col min-h-0">
            <div
              style={{
                flex: 1,
                display: "grid",
                gridTemplateColumns: `repeat(4, minmax(${ROLE_CARD_MIN_WIDTH}px, 1fr))`,
                gridTemplateRows: `repeat(2, minmax(${ROLE_CARD_MIN_HEIGHT}px, 1fr))`,
                gap: "1rem",
                minHeight: 0,
              }}
            >
              {roles.map((role) => (
                <div
                  key={role.name}
                  style={{
                    minWidth: ROLE_CARD_MIN_WIDTH,
                    minHeight: ROLE_CARD_MIN_HEIGHT,
                  }}
                >
                  <RoleCard role={role} />
                </div>
              ))}
            </div>
          </section>

          {/* Students & mentors column */}
          <aside
            className="bg-white rounded-l-lg rounded-r-none shadow-md px-3 py-2 flex flex-col h-full"
            style={{
              width: "18rem",
              flexShrink: 0,
              minHeight: 0,
            }}
          >
            <div style={{ overflowY: "auto", paddingRight: "0.25rem", flex: 1, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <section>
                <Divider sx={{ mb: 1 }}>
                  <Typography level="title-lg" sx={{ color: "primary.600" }}>
                    Students ({students.length})
                  </Typography>
                </Divider>
                <Grid container spacing={0.5}>
                  {students.map((student) => (
                    <Grid xs={12} key={student.name}>
                      <StudentItem student={student} />
                    </Grid>
                  ))}
                </Grid>
              </section>
              <section>
                <Divider sx={{ mb: 1 }}>
                  <Typography level="title-lg" sx={{ color: "warning.600" }}>
                    Mentors ({mentors.length})
                  </Typography>
                </Divider>
                <Grid container spacing={0.5}>
                  {mentors.map((mentor) => (
                    <Grid xs={12} key={mentor.name}>
                      <MentorItem mentor={mentor} />
                    </Grid>
                  ))}
                </Grid>
              </section>
            </div>
          </aside>
        </div>
      </main>

      <EditConfigModal open={editModalOpen} onClose={() => setEditModalOpen(false)} />
    </DndProvider>
  );
};

export default MainComponent;
