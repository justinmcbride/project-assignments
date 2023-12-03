import { FC } from "react";
import { useDrag } from "react-dnd";

import { ItemTypes } from "./ItemTypes";
import { Card, CardOverflow, Chip, Typography } from "@mui/joy";
import Student from "@/types/Student";

interface Props {
  student: Student;
  onAddToRole: (student: Student, role: string) => void;
}

interface DropResult {
  name: string;
}

export const StudentItem: FC<Props> = ({ student, onAddToRole }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: student,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        console.log(`You dropped ${item.name} into ${dropResult.name}!`);
        onAddToRole(student, dropResult.name);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  return (
    <Card ref={drag} variant={isDragging ? "soft" : "outlined"}>
      <Chip
        size="md"
        variant={student.roles.length === 0 ? "outlined" : "solid"}
        color={student.roles.length === 0 ? "primary" : "danger"}
      >
        {student.name}
      </Chip>
      <CardOverflow
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          justifyContent: "space-around",
          py: 1,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
        variant="soft"
      >
        <Typography level="body-sm">
          {student.roles.length > 0
            ? ` (${student.roles.toString()})`
            : "No roles"}
        </Typography>
      </CardOverflow>
    </Card>
  );
};
