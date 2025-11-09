import {
  Card,
  CardContent,
  CardOverflow,
  Chip,
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

  const assignmentColor = 
    students.length === desiredStudents
      ? "success"
      : students.length < desiredStudents
        ? "neutral"
        : "danger";

  return (
    <Card
      variant={isActive ? "solid" : "outlined"}
      invertedColors={isActive}
      ref={drop}
      sx={{ 
        width: "100%", 
        minHeight: "280px",
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: 'md',
          transform: 'translateY(-2px)'
        }
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <div className="flex items-start justify-between gap-2 mb-2">
          <Typography 
            level="h4" 
            sx={{ 
              fontSize: '1.1rem',
              fontWeight: 600,
              flex: 1
            }}
          >
            {name}
          </Typography>
          <Chip
            size="sm"
            variant="solid"
            color={assignmentColor}
            sx={{ fontWeight: 'bold' }}
          >
            {students.length}/{desiredStudents}
          </Chip>
        </div>
        <Divider sx={{ my: 1.5 }} />
        <Typography 
          level="body-sm" 
          sx={{ 
            mb: 2,
            color: 'text.secondary',
            minHeight: '2.5rem'
          }}
        >
          {description}
        </Typography>
        <Divider sx={{ my: 1.5 }}>
          <Typography level="body-xs" fontWeight="lg">Students</Typography>
        </Divider>
        <Grid container spacing={1} sx={{ minHeight: '60px' }}>
          {students.map((student) => (
            <Grid xs="auto" key={student.name}>
              <StudentItem
                student={student}
                parentRole={role}
              />
            </Grid>
          ))}
          {students.length === 0 && (
            <Grid xs={12}>
              <Typography 
                level="body-sm" 
                textColor="text.tertiary" 
                textAlign="center"
                sx={{ py: 2 }}
              >
                Drag students here
              </Typography>
            </Grid>
          )}
        </Grid>
      </CardContent>
      <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
        <Divider inset="context" />
        <CardContent orientation="horizontal" sx={{ py: 1 }}>
          <Typography
            level="body-xs"
            fontWeight="md"
            textColor="text.secondary"
          >
            {students.length} student{students.length !== 1 ? 's' : ''}
          </Typography>
        </CardContent>
      </CardOverflow>
    </Card>
  );
};
