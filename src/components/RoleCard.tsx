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

  const [{ canDrop, isOver, draggedStudent }, drop] = useDrop(
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
        draggedStudent: monitor.getItem() as Student | null,
      }),
    }),
    [role]
  );

  const isActive = canDrop && isOver;
  const isHoveringButCantDrop = !canDrop && isOver && draggedStudent;
  const isAlreadyInRole = !!(isHoveringButCantDrop && studentNames.includes(draggedStudent?.name || ''));

  const assignmentColor = 
    students.length === desiredStudents
      ? "success"
      : students.length < desiredStudents
        ? "neutral"
        : "danger";

  // Calculate if the drop would exceed the limit
  const wouldExceedLimit = isActive && students.length >= desiredStudents;
  const withinLimit = isActive && students.length < desiredStudents;

  return (
    <div ref={drop as any} style={{ height: '100%', width: '100%' }}>
      <Card
        variant={isActive || isAlreadyInRole ? "solid" : "outlined"}
        invertedColors={isActive || isAlreadyInRole}
        sx={{ 
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: 'all 0.2s ease-in-out',
          border: (isActive || isAlreadyInRole) ? '3px solid' : undefined,
          borderColor: (isActive || isAlreadyInRole)
            ? (isAlreadyInRole || wouldExceedLimit ? 'danger.400' : 'success.500')
            : undefined,
          background: (isActive || isAlreadyInRole)
            ? (isAlreadyInRole || wouldExceedLimit
                ? 'linear-gradient(135deg, rgba(211, 47, 47, 0.12) 0%, rgba(211, 47, 47, 0.04) 50%, transparent 100%)'
                : 'linear-gradient(135deg, rgba(25, 135, 84, 0.15) 0%, rgba(25, 135, 84, 0.05) 50%, transparent 100%)')
            : undefined,
          '&:hover': {
            boxShadow: 'md',
            transform: (isActive || isAlreadyInRole) ? 'scale(1.02)' : 'translateY(-2px)'
          }
        }}
      >
      {(isActive || isAlreadyInRole) ? (
        // Simplified hover view showing role title and count
        <CardContent sx={{ 
          p: 3, 
          flex: 1, 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          justifyContent: "center",
          textAlign: "center",
          gap: 2
        }}>
          <Typography 
            level="h2" 
            sx={{ 
              fontSize: '2rem',
              fontWeight: 700,
              color: (isAlreadyInRole || wouldExceedLimit) ? 'danger.700' : 'success.700',
              mb: 1
            }}
          >
            {name}
          </Typography>
          {isAlreadyInRole ? (
            <>
              <Typography 
                level="h3" 
                sx={{ 
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: 'danger.600',
                }}
              >
                {draggedStudent?.name}
              </Typography>
              <Typography 
                level="body-md" 
                sx={{ 
                  color: 'danger.500',
                  fontWeight: 500
                }}
              >
                ⚠ Already in this role
              </Typography>
            </>
          ) : wouldExceedLimit ? (
            <Typography 
              level="body-md" 
              sx={{ 
                color: 'danger.500',
                fontWeight: 500
              }}
            >
              ⚠ Over limit
            </Typography>
          ) : null}
        </CardContent>
      ) : (
        <CardContent sx={{ p: 1.5, flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: 'hidden' }}>
          <Typography 
            level="h4" 
            sx={{ 
              fontSize: '1rem',
              fontWeight: 600,
              mb: 1
            }}
          >
            {name}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography 
            level="body-sm" 
            sx={{ 
              mb: 1,
              color: 'text.secondary',
              minHeight: '2.5rem',
              fontSize: '0.875rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {description}
          </Typography>
          <Divider sx={{ my: 1 }}>
            <Typography level="body-xs" fontWeight="lg">Students</Typography>
          </Divider>
          <Grid container spacing={1} sx={{ minHeight: '60px', flex: 1, overflow: 'auto', width: '100%', maxWidth: '100%' }}>
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
                  sx={{ py: 1.5 }}
                >
                  Drag students here
                </Typography>
              </Grid>
            )}
          </Grid>
        </CardContent>
      )}
      <CardOverflow 
        variant="soft" 
        sx={{ 
          bgcolor: assignmentColor === 'danger' ? 'danger.softBg' : assignmentColor === 'success' ? 'success.softBg' : 'background.level1',
          borderTop: assignmentColor === 'danger' ? '2px solid' : '1px solid',
          borderColor: assignmentColor === 'danger' ? 'danger.500' : 'divider'
        }}
      >
        <Divider inset="context" />
        <CardContent orientation="horizontal" sx={{ py: 0.75 }}>
          <Typography
            level="body-xs"
            fontWeight="md"
            sx={{ 
              color: assignmentColor === 'danger' ? 'danger.600' : assignmentColor === 'success' ? 'success.600' : 'text.secondary',
              fontWeight: assignmentColor === 'danger' ? 'bold' : 'md'
            }}
          >
            {students.length} / {desiredStudents} student{desiredStudents !== 1 ? 's' : ''}
          </Typography>
        </CardContent>
      </CardOverflow>
    </Card>
    </div>
  );
};
