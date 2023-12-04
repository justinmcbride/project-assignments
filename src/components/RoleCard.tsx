import {
  Badge,
  Card,
  CardContent,
  CardOverflow,
  Divider,
  Typography,
} from "@mui/joy";
import { FC, useMemo } from "react";

import { ItemTypes } from "./ItemTypes";

import { useDrop } from "react-dnd";
import Role from "@/types/Role";
import Student from "@/types/Student";
import { StudentItem, Style } from "./StudentItem";
import { useAppState } from "@/AppContext";

interface Props {
  role: Role;
}

export const RoleCard: FC<Props> = ({ role }) => {
  const { name, description, desiredStudents, students: studentNames } = role;

  const { state } = useAppState();

  const allStudents = state.students;
  const students = useMemo(() => {
    return allStudents.filter((s) => studentNames.includes(s.name));
  }, allStudents);

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: () => {
      console.log(`role ${role.name} dropped on`);
      return { role }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;

  return (
    <Badge
      badgeContent={`${students.length}/${desiredStudents}`}
      color={students.length === desiredStudents ? "success" : students.length < desiredStudents ? "neutral" : "danger"}
      className="min-h-[200px] w-[300px]"
    >
      <Card
        variant={isActive ? "solid" : "outlined"}
        invertedColors={isActive}
        ref={drop}
        sx={{ width: "100%", height: "100%" }}
      >
        <CardContent>
          <Typography level="h3">{name}</Typography>
          <Typography level="title-md">{description}</Typography>
          {students.map((student) => (
            <StudentItem key={student.name} student={student} parentRole={role}/>
          ))}
        </CardContent>
        <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
          <Divider inset="context" />
          <CardContent orientation="horizontal">
            <Typography
              level="body-xs"
              fontWeight="md"
              textColor="text.secondary"
            >
              {students.length} students
            </Typography>
            <Divider orientation="vertical" />
            <Typography
              level="body-xs"
              fontWeight="md"
              textColor="text.secondary"
            >
              1 hour ago
            </Typography>
          </CardContent>
        </CardOverflow>
      </Card>
    </Badge>
  );
};
