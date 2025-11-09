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
      <main className="w-full h-screen flex flex-col p-4" style={{ maxHeight: '100vh', overflow: 'hidden' }}>
        {/* Students section at the top */}
        <div className="bg-white rounded-lg shadow-md p-3 mb-4" style={{ flexShrink: 0 }}>
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
        
        {/* Roles grid - fixed 2 rows x 4 columns */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gap: '1rem', minHeight: 0 }}>
          {roles.slice(0, 8).map((role) => (
            <div key={role.name} style={{ minWidth: 0, minHeight: 0 }}>
              <RoleCard role={role} />
            </div>
          ))}
        </div>
      </main>
    </DndProvider>
  );
};

export default MainComponent;
