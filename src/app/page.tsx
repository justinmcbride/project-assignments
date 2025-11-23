"use client";


import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Typography, Divider, Grid, Skeleton } from "@mui/joy";
import { useAppState } from "@/AppContext";

import { RolesGrid } from "@/components/RolesGrid";
import { PeopleSidebar } from "@/components/PeopleSidebar";
import { RoleCardSkeleton } from "@/components/RoleCardSkeleton";
import { StudentItemSkeleton } from "@/components/StudentItemSkeleton";
import { ROLE_CARD_MIN_HEIGHT, ROLE_CARD_MIN_WIDTH } from "@/components/RoleCard";

const HomePage = () => {
  const { state, isLoading } = useAppState();

  const students = state.students;
  const mentors = state.mentors;
  const roles = state.roles;

  if (isLoading) {
    return (
      <div className="w-full min-h-[calc(100vh-5rem)] bg-gradient-to-br from-slate-50 to-blue-50 p-6 flex flex-col">
        <main
          className="w-full flex flex-col flex-1"
          style={{ minHeight: "calc(100vh - 10rem)" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4 flex-1 min-h-0">
            {/* Roles Grid Skeleton */}
            <section className="flex-1 min-w-0 flex flex-col min-h-0">
              <div
                style={{
                  flex: 1,
                  display: "grid",
                  gridTemplateColumns: `repeat(auto-fit, minmax(${ROLE_CARD_MIN_WIDTH}px, 1fr))`,
                  gap: "1rem",
                  minHeight: 0,
                  overflowY: "auto",
                  paddingBottom: "1rem",
                  maxWidth: "100%",
                  gridAutoFlow: "dense",
                }}
              >
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      minWidth: ROLE_CARD_MIN_WIDTH,
                      minHeight: ROLE_CARD_MIN_HEIGHT,
                    }}
                  >
                    <RoleCardSkeleton />
                  </div>
                ))}
              </div>
            </section>

            {/* People Sidebar Skeleton */}
            <aside
              className="p-4 flex flex-col h-full overflow-hidden"
              style={{
                width: "100%",
                flexShrink: 0,
                minHeight: 0,
                backdropFilter: "blur(10px)",
              }}
            >
              <div style={{ overflowY: "auto", paddingRight: "0.25rem", flex: 1, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {/* Students Section Skeleton */}
                <section>
                  <Divider sx={{ mb: 1 }}>
                    <Skeleton variant="text" level="title-lg" width={120} />
                  </Divider>
                  <Skeleton variant="text" level="body-sm" width={100} sx={{ mb: 0.5 }} />
                  <Grid container spacing={0.5}>
                    {[...Array(4)].map((_, i) => (
                      <Grid key={i}>
                        <StudentItemSkeleton />
                      </Grid>
                    ))}
                  </Grid>
                </section>

                {/* Mentors Section Skeleton */}
                <section>
                  <Divider sx={{ mb: 1 }}>
                    <Skeleton variant="text" level="title-lg" width={100} />
                  </Divider>
                  <Skeleton variant="text" level="body-sm" width={100} sx={{ mb: 0.5 }} />
                  <Grid container spacing={0.5}>
                    {[...Array(2)].map((_, i) => (
                      <Grid key={i}>
                        <StudentItemSkeleton />
                      </Grid>
                    ))}
                  </Grid>
                </section>
              </div>
            </aside>
          </div>
        </main>
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full min-h-[calc(100vh-5rem)] bg-gradient-to-br from-slate-50 to-blue-50 p-6 flex flex-col">
        <main
          className="w-full flex flex-col flex-1"
          style={{ minHeight: "calc(100vh - 10rem)" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4 flex-1 min-h-0">
            <RolesGrid roles={roles} />
            <PeopleSidebar students={students} mentors={mentors} />
          </div>
        </main>
      </div>
    </DndProvider>
  );
};

export default HomePage;
