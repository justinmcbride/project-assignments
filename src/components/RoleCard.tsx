import {
  Badge,
  Card,
  CardContent,
  CardOverflow,
  Divider,
  Typography,
} from "@mui/joy";
import { FC, useCallback, useState } from "react";

import { ItemTypes } from "./ItemTypes";

import { useDrop } from "react-dnd";
import Role from "@/types/Role";

interface Props {
  role: Role;
}

export const RoleCard: FC<Props> = ({ role }) => {
  const [students, setStudents] = useState<string[]>([]);

  const handleDrop = useCallback((item: any) => {
    setStudents((students) => [...students, item.name]);
    return {
      name: role.name,
    };
  }, []);
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: handleDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;

  return (
    <Badge
      badgeContent={`${students.length}/${role.desiredStudents}`}
      color={students.length === role.desiredStudents ? "success" : students.length < role.desiredStudents ? "neutral" : "danger"}
      className="min-h-[200px] min-w-[250px]"
    >
      <Card
        variant={isActive ? "solid" : "outlined"}
        invertedColors={isActive}
        ref={drop}
        sx={{ width: "100%", height: "100%" }}
      >
        <CardContent>
          <Typography level="h1">{role.name}</Typography>
          <Typography level="title-md">{role.description}</Typography>
          {students.map((name) => (
            <Typography level="body-sm">{name}</Typography>
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
