"use client";
import { RoleCard } from "@/components/RoleCard";
import { StudentItem } from "@/components/StudentItem";
import Student from "@/types/Student";
import { Grid } from "@mui/joy";
import { useCallback, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import previewStudents from "@/previewData/previewStudents";

let roles = ["Role A", "Role B", "Role C", "Role D", "Role E"];

export default () => {
  const [students, setStudents] = useState<Student[]>(previewStudents);

  const handleAddStudentToRole = useCallback(
    (student: Student, role: string) => {
      setStudents((previousStudents) => {
        return previousStudents.map((s) =>
          s.name == student.name ? { ...s, roles: s.roles.concat(role) } : s
        );
      });
    },
    []
  );
  return (
    <DndProvider backend={HTML5Backend}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Grid container>
          <Grid container xs={8}>
            {roles.map((name) => (
              <RoleCard name={name} />
            ))}
          </Grid>
          <Grid container xs={4}>
            {students.map((student) => (
              <StudentItem student={student} key={student.name} onAddToRole={handleAddStudentToRole} />
            ))}
          </Grid>
        </Grid>
      </main>
    </DndProvider>
  );
};
