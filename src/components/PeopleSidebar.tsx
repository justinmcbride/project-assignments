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
  // Partition students into unassigned and assigned based on their roles array
  const unassignedStudents = students.filter(student => student.roles.length === 0);
  const assignedStudents = students.filter(student => student.roles.length > 0);

  // Partition mentors into unassigned and assigned based on their roles array
  const unassignedMentors = mentors.filter(mentor => mentor.roles.length === 0);
  const assignedMentors = mentors.filter(mentor => mentor.roles.length > 0);

  return (
    <aside
      className="p-4 flex flex-col sticky top-4"
      style={{
        width: "100%",
        flexShrink: 0,
        backdropFilter: "blur(10px)",
        maxHeight: "calc(100vh - 2rem)",
        overflowY: "auto",
      }}
    >
      <div style={{ paddingRight: "0.25rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <section>
          <Divider sx={{ mb: 1 }}>
            <Typography level="title-lg" sx={{ color: "primary.600" }}>
              Students ({students.length})
            </Typography>
          </Divider>
          
          {/* Unassigned Students */}
          {unassignedStudents.length > 0 && (
            <>
              <Typography level="body-sm" sx={{ mb: 0.5, mt: 0.5, opacity: 0.7 }}>
                Unassigned ({unassignedStudents.length})
              </Typography>
              <Grid container spacing={0.5} sx={{ mb: 1 }}>
                {unassignedStudents.map((student) => (
                  <Grid key={student.name}>
                    <StudentItem student={student} />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
          
          {/* Assigned Students */}
          {assignedStudents.length > 0 && (
            <>
              <Typography level="body-sm" sx={{ mb: 0.5, mt: unassignedStudents.length > 0 ? 1 : 0.5, opacity: 0.7 }}>
                Assigned ({assignedStudents.length})
              </Typography>
              <Grid container spacing={0.5}>
                {assignedStudents.map((student) => (
                  <Grid key={student.name}>
                    <StudentItem student={student} />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </section>
        
        <section>
          <Divider sx={{ mb: 1 }}>
            <Typography level="title-lg" sx={{ color: "warning.600" }}>
              Mentors ({mentors.length})
            </Typography>
          </Divider>
          
          {/* Unassigned Mentors */}
          {unassignedMentors.length > 0 && (
            <>
              <Typography level="body-sm" sx={{ mb: 0.5, mt: 0.5, opacity: 0.7 }}>
                Unassigned ({unassignedMentors.length})
              </Typography>
              <Grid container spacing={0.5} sx={{ mb: 1 }}>
                {unassignedMentors.map((mentor) => (
                  <Grid key={mentor.name}>
                    <MentorItem mentor={mentor} />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
          
          {/* Assigned Mentors */}
          {assignedMentors.length > 0 && (
            <>
              <Typography level="body-sm" sx={{ mb: 0.5, mt: unassignedMentors.length > 0 ? 1 : 0.5, opacity: 0.7 }}>
                Assigned ({assignedMentors.length})
              </Typography>
              <Grid container spacing={0.5}>
                {assignedMentors.map((mentor) => (
                  <Grid key={mentor.name}>
                    <MentorItem mentor={mentor} />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </section>
      </div>
    </aside>
  );
};
