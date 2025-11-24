"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Divider, Grid, Skeleton } from "@mui/joy";
import { useAppState } from "@/AppContext";

import { RolesGrid } from "@/components/RolesGrid";
import { PeopleSidebar } from "@/components/PeopleSidebar";
import { RoleCardSkeleton } from "@/components/RoleCardSkeleton";
import { StudentItemSkeleton } from "@/components/StudentItemSkeleton";
import {
  ROLE_CARD_MIN_HEIGHT,
  ROLE_CARD_MIN_WIDTH,
} from "@/components/RoleCard";

const HomePage = () => {
  const { state, isLoading } = useAppState();

  const students = state.students;
  const mentors = state.mentors;
  const roles = state.roles;

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-5rem)] w-full flex-col bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <main
          className="flex w-full flex-1 flex-col"
          style={{ minHeight: "calc(100vh - 10rem)" }}
        >
          <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-[1fr_300px]">
            {/* Roles Grid Skeleton */}
            <section className="flex min-w-0 flex-1 flex-col">
              <div
                style={{
                  flex: 1,
                  display: "grid",
                  gridTemplateColumns: `repeat(auto-fit, minmax(${ROLE_CARD_MIN_WIDTH}px, 1fr))`,
                  gap: "1rem",
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
              className="sticky top-4 flex flex-col p-4"
              style={{
                width: "100%",
                flexShrink: 0,
                backdropFilter: "blur(10px)",
                maxHeight: "calc(100vh - 2rem)",
                overflowY: "auto",
              }}
            >
              <div
                style={{
                  paddingRight: "0.25rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                {/* Students Section Skeleton */}
                <section>
                  <Divider sx={{ mb: 1 }}>
                    <Skeleton variant="text" level="title-lg" width={120} />
                  </Divider>
                  <Skeleton
                    variant="text"
                    level="body-sm"
                    width={100}
                    sx={{ mb: 0.5 }}
                  />
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
                  <Skeleton
                    variant="text"
                    level="body-sm"
                    width={100}
                    sx={{ mb: 0.5 }}
                  />
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
      <div className="flex min-h-[calc(100vh-5rem)] w-full flex-col bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <main
          className="flex w-full flex-1 flex-col"
          style={{ minHeight: "calc(100vh - 10rem)" }}
        >
          <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-[1fr_300px]">
            <RolesGrid roles={roles} />
            <PeopleSidebar students={students} mentors={mentors} />
          </div>
        </main>
      </div>
    </DndProvider>
  );
};

export default HomePage;
