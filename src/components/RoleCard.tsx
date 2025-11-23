import {
  Card,
  CardContent,
  CardOverflow,
  Divider,
  Grid,
  Typography,
} from "@mui/joy";
import { FC, useCallback, useMemo } from "react";

import { ItemTypes } from "./ItemTypes";

import { useDrop } from "react-dnd";
import Role from "@/types/Role";
import Student from "@/types/Student";
import Mentor from "@/types/Mentor";
import { StudentItem } from "./StudentItem";
import { MentorItem } from "./MentorItem";
import { useAppState } from "@/AppContext";

export const ROLE_CARD_MIN_WIDTH = 300;
export const ROLE_CARD_MIN_HEIGHT = 200;

interface Props {
  role: Role;
}

export const RoleCard: FC<Props> = ({ role }) => {
  const {
    name,
    description,
    desiredStudents,
    students: studentNames,
    mentors: mentorNames,
  } = role;
  


  const { state } = useAppState();

  const allStudents = state.students;
  const allMentors = state.mentors;
  const students = useMemo(() => {
    return allStudents.filter((s) => studentNames.includes(s.name));
  }, [allStudents, studentNames]);
  const mentors = useMemo(() => {
    return allMentors.filter((m) => mentorNames.includes(m.name));
  }, [allMentors, mentorNames]);

  const [{ canDrop, isOver, draggedItem, draggedType }, drop] = useDrop<
    Student | Mentor,
    { role: Role },
    {
      isOver: boolean;
      canDrop: boolean;
      draggedItem: Student | Mentor | null;
      draggedType: string | null;
    }
  >(
    () => ({
      accept: [ItemTypes.STUDENT, ItemTypes.MENTOR],
      drop: () => {
        return { role };
      },
      canDrop: (item, monitor) => {
        const itemType = monitor.getItemType();
        if (itemType === ItemTypes.STUDENT) {
          return !studentNames.includes(item.name);
        }
        if (itemType === ItemTypes.MENTOR) {
          return !mentorNames.includes(item.name);
        }
        return false;
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        draggedItem: monitor.getItem() as Student | Mentor | null,
        draggedType: monitor.getItemType() as string | null,
      }),
    }),
    [role, studentNames, mentorNames]
  );

  const isStudentDrag = draggedType === ItemTypes.STUDENT;
  const isMentorDrag = draggedType === ItemTypes.MENTOR;
  const draggedName = draggedItem?.name ?? "";

  const isActive = canDrop && isOver;
  const isHoveringButCantDrop = !canDrop && isOver && draggedItem;
  const isAlreadyInRole = !!(
    isHoveringButCantDrop &&
    ((isStudentDrag && studentNames.includes(draggedName)) ||
      (isMentorDrag && mentorNames.includes(draggedName)))
  );

  const assignmentColor = 
    students.length === desiredStudents
      ? "success"
      : students.length < desiredStudents
        ? "neutral"
        : "danger";

  // Calculate if the drop would exceed the limit
  const wouldExceedLimit =
    isActive && isStudentDrag && students.length >= desiredStudents;

  const setDropRef = useCallback(
    (node: HTMLDivElement | null) => {
      drop(node);
    },
    [drop]
  );

  return (
    <div
      ref={setDropRef}
      style={{
        height: "100%",
        width: "100%",
        minHeight: ROLE_CARD_MIN_HEIGHT,
        minWidth: ROLE_CARD_MIN_WIDTH,
      }}
    >
      <Card
        variant={isActive || isAlreadyInRole ? "solid" : "outlined"}
        invertedColors={isActive || isAlreadyInRole}
        sx={{ 
          minWidth: ROLE_CARD_MIN_WIDTH,
          minHeight: ROLE_CARD_MIN_HEIGHT,
          width: "100%",
          height: "100%",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          transition: 'all 0.2s ease-in-out',
          position: 'relative', // Ensure relative positioning for absolute overlay
          border: (isActive || isAlreadyInRole) ? '3px solid' : undefined,
          borderLeft: (isActive || isAlreadyInRole) ? undefined : '4px solid',
          borderLeftColor: (isActive || isAlreadyInRole) ? undefined : (
             assignmentColor === 'success' ? 'success.500' : 
             assignmentColor === 'danger' ? 'danger.500' : 'neutral.300'
          ),
          borderColor: (isActive || isAlreadyInRole)
            ? (isAlreadyInRole || wouldExceedLimit ? 'danger.400' : 'success.500')
            : undefined,
          background: (isActive || isAlreadyInRole)
            ? (isAlreadyInRole || wouldExceedLimit
                ? 'linear-gradient(135deg, rgba(211, 47, 47, 0.12) 0%, rgba(211, 47, 47, 0.04) 50%, transparent 100%)'
                : 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0.05) 50%, transparent 100%)')
            : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)',
          boxShadow: (isActive || isAlreadyInRole) ? 'md' : 'sm',
          '&:hover': {
            boxShadow: 'md',
            borderColor: (isActive || isAlreadyInRole) ? undefined : 'primary.200',
          }
        }}
      >
        {/* Normal Content - Always rendered to maintain size, but hidden if active */}
        <CardContent sx={{ 
          p: 0.5, 
          flex: 1, 
          display: "flex", 
          flexDirection: "column", 
          minWidth: 0,
          visibility: (isActive || isAlreadyInRole) ? 'hidden' : 'visible' 
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <Typography 
              level="title-md" 
              sx={{ 
                fontWeight: 700,
                lineHeight: 1.2
              }}
            >
              {name}
            </Typography>
          </div>
          
          <Typography 
            level="body-xs" 
            sx={{ 
              mb: 1,
              color: 'text.secondary',
              fontSize: '0.75rem',
              lineHeight: 1.4,
            }}
          >
            {description}
          </Typography>

          {/* Students Section */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
            <Typography level="body-xs" fontWeight="lg" sx={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'text.tertiary' }}>
              Students
            </Typography>
            <Typography 
              level="body-xs" 
              fontWeight="md"
              sx={{ 
                fontSize: '0.7rem',
                color: assignmentColor === 'danger' ? 'danger.600' : assignmentColor === 'success' ? 'success.600' : 'text.secondary',
              }}
            >
              {students.length}/{desiredStudents}
            </Typography>
          </div>
          
          <Grid
            container
            spacing={0.5}
            sx={{
              mt: 0.5,
              mb: 1,
              minHeight: '32px',
              width: '100%',
              maxWidth: '100%',
              alignContent: 'flex-start',
            }}
          >
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
                <div style={{ 
                  border: '1px dashed', 
                  borderColor: 'var(--joy-palette-neutral-300)', 
                  borderRadius: '4px', 
                  padding: '4px', 
                  textAlign: 'center' 
                }}>
                  <Typography level="body-xs" textColor="text.tertiary">
                    Drop students
                  </Typography>
                </div>
              </Grid>
            )}
          </Grid>

          {/* Mentors Section */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography level="body-xs" fontWeight="lg" sx={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'text.tertiary' }}>
              Mentors
            </Typography>
            {mentors.length > 0 && (
              <Typography level="body-xs" fontWeight="md" sx={{ fontSize: '0.7rem', color: 'primary.600' }}>
                {mentors.length}
              </Typography>
            )}
          </div>

          <Grid
            container
            spacing={0.5}
            sx={{
              mt: 0.5,
              minHeight: '32px',
              width: '100%',
              maxWidth: '100%',
              alignContent: 'flex-start',
            }}
          >
            {mentors.map((mentor) => (
              <Grid xs="auto" key={mentor.name}>
                <MentorItem mentor={mentor} parentRole={role} />
              </Grid>
            ))}
            {mentors.length === 0 && (
              <Grid xs={12}>
                <div style={{ 
                  border: '1px dashed', 
                  borderColor: 'var(--joy-palette-neutral-300)', 
                  borderRadius: '4px', 
                  padding: '4px', 
                  textAlign: 'center' 
                }}>
                  <Typography level="body-xs" textColor="text.tertiary">
                    Drop mentors
                  </Typography>
                </div>
              </Grid>
            )}
          </Grid>
        </CardContent>

        {/* Hover Overlay - Absolute positioned */}
        {(isActive || isAlreadyInRole) && (
          <CardContent sx={{ 
            position: 'absolute',
            inset: 0,
            p: 3, 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center",
            textAlign: "center",
            gap: 2,
            zIndex: 10
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
                  {draggedName}
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
        )}
    </Card>
    </div>
  );
};
