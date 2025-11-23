import { Divider, Grid, Typography } from "@mui/joy";
import { StudentItem } from "@/components/StudentItem";
import { MentorItem } from "@/components/MentorItem";
import Student from "@/types/Student";
import Mentor from "@/types/Mentor";

interface PeopleSidebarProps {
  students: Student[];
  mentors: Mentor[];
}

export const PeopleSidebar = ({ students, mentors }: PeopleSidebarProps) => {
  return (
    <aside
      className="bg-white/80 backdrop-blur-md border-l border-gray-200 p-4 flex flex-col h-full overflow-hidden shadow-sm"
      style={{
        width: "100%",
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
              <Grid key={student.name}>
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
              <Grid key={mentor.name}>
                <MentorItem mentor={mentor} />
              </Grid>
            ))}
          </Grid>
        </section>
      </div>
    </aside>
  );
};
