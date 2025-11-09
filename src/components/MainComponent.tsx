import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { RoleCard } from "@/components/RoleCard";
import { StudentItem } from "@/components/StudentItem";
import { Divider, Grid, Typography } from "@mui/joy";
import { useAppState } from "@/AppContext";

const MainComponent = () => {
  const { state } = useAppState();

  const students = state.students;
  const roles = state.roles;

  return (
    <DndProvider backend={HTML5Backend}>
      <main className="w-full">
        <Grid container spacing={2}>
          {/* Students section at the top */}
          <Grid xs={12}>
            <div className="bg-white rounded-lg shadow-md p-3">
              <Divider sx={{ mb: 2 }}>
                <Typography level="title-lg" sx={{ color: "primary.600" }}>
                  All Students
                </Typography>
              </Divider>
              <Grid container spacing={1}>
                {students.map((student) => (
                  <Grid xs="auto" key={student.name}>
                    <StudentItem student={student} />
                  </Grid>
                ))}
              </Grid>
            </div>
          </Grid>
          
          {/* Roles grid below */}
          <Grid xs={12}>
            <Grid container spacing={2}>
              {roles.map((role) => (
                <Grid xs={12} sm={6} md={4} xl={3} key={role.name}>
                  <RoleCard role={role} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </main>
    </DndProvider>
  );
};

export default MainComponent;
