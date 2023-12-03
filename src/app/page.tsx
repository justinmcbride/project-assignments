"use client";
import { RoleCard } from "@/components/RoleCard";
import { StudentItem } from "@/components/StudentItem";
import { Grid, Stack } from "@mui/joy";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

let students = [
  "Student A",
  "Student B",
  "Student C",
  "Student D",
  "Student E",
  "Student F",
  "Student G",
  "Student H",
  "Student I",
  "Student J",
  "Student K",
  "Student L",
  "Student M",
  "Student N",
  "Student O",
  "Student P",
  "Student Q",
  "Student R",
  "Student S",
  "Student T",
  "Student U",
  "Student V",
  "Student W",
  "Student X",
  "Student Y",
  "Student Z",
];
let roles = ["Role A", "Role B", "Role C", "Role D"];

export default function Home() {
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
            {students.map((name) => (
              <StudentItem name={name} />
            ))}
          </Grid>
        </Grid>
      </main>
    </DndProvider>
  );
}
