import {
  Badge,
  Card,
  CardContent,
  CardOverflow,
  Divider,
  Grid,
  Typography,
} from "@mui/joy";
import { FC, useMemo } from "react";

import { ItemTypes } from "./ItemTypes";

import { useDrop } from "react-dnd";
import Role from "@/types/Role";
import Student from "@/types/Student";
import { StudentItem } from "./StudentItem";
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
  }, [allStudents, studentNames]);

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop: () => {
        console.log(`role ${role.name} dropped on`);
        return { role };
      },
      canDrop: (item: Student) => {
        const canDrop = !studentNames.includes(item.name);
        return canDrop;
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [role]
  );

  const isActive = canDrop && isOver;

  return (
    <Badge
      badgeContent={`${students.length}/${desiredStudents}`}
      color={
        students.length === desiredStudents
          ? "success"
          : students.length < desiredStudents
            ? "neutral"
            : "danger"
      }
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
          <Divider />
          <Typography level="title-md">{description}</Typography>
          <Divider>Students</Divider>
          <Grid container>
            {students.map((student) => (
              <StudentItem
                key={student.name}
                student={student}
                parentRole={role}
              />
            ))}
          </Grid>
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
            {/* <Divider orientation="vertical" />
            <Typography
              level="body-xs"
              fontWeight="md"
              textColor="text.secondary"
            >
              1 hour ago
            </Typography> */}
          </CardContent>
        </CardOverflow>
      </Card>
    </Badge>
  );
};
