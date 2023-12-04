import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { RoleCard } from "@/components/RoleCard";
import { StudentItem } from "@/components/StudentItem";
import { Divider, Grid, Stack, Typography } from "@mui/joy";
import { useAppState } from "@/AppContext";
import { useMemo } from "react";

const MainComponent = () => {
  const { state } = useAppState();

  const students = state.students;
  const roles = state.roles;

  const availableStudents = useMemo(() => {
    return students.filter((s) => s.roles.length === 0);
  }, [students]);
  const assignedStudents = useMemo(() => {
    return students.filter((s) => s.roles.length > 0);
  }, [students]);

  return (
    <DndProvider backend={HTML5Backend}>
      <main className="flex flex-col items-center justify-between p-24">
        <Grid container>
          <Grid container xs={8}>
            {roles.map((role) => (
              <RoleCard key={role.name} role={role} />
            ))}
          </Grid>
          <Grid container xs={4}>
            <Stack direction={"column"} spacing={2}>
              <Divider>
                <Typography level="h3" sx={{ color: "text.primary" }}>
                  Available Students
                </Typography>
              </Divider>
              <Grid container>
                {availableStudents.map((student) => (
                  <StudentItem student={student} key={student.name} />
                ))}
              </Grid>
              <Divider>
                <Typography level="h3">Assigned Students</Typography>
              </Divider>
              <Grid container>
                {assignedStudents.map((student) => (
                  <StudentItem student={student} key={student.name} />
                ))}
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </main>
    </DndProvider>
  );
};

export default MainComponent;
