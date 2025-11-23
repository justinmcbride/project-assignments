import { FC, useCallback } from "react";
import { useDrag } from "react-dnd";

import { ItemTypes } from "./ItemTypes";
import { IconButton } from "@mui/joy";
import CloseIcon from "@mui/icons-material/Close";
import Student from "@/types/Student";
import Role from "@/types/Role";
import { useAppState } from "@/AppContext";

interface Props {
  student: Student;
  parentRole?: Role;
}

interface DropResult {
  role: Role;
}

export const StudentItem: FC<Props> = ({ student, parentRole }) => {
  const { dispatch } = useAppState();

  const handleAddStudentToRole = useCallback(
    (student: Student, role: Role) => {
      dispatch({ type: "ADD_STUDENT_TO_ROLE", student, role });
    },
    [dispatch]
  );

  const handleRemoveFromRole = useCallback(() => {
    if (!parentRole) return;
    dispatch({ type: "REMOVE_STUDENT_FROM_ROLE", student, role: parentRole });
  }, [dispatch, parentRole, student]);

  const [, drag] = useDrag(() => ({
    type: ItemTypes.STUDENT,
    item: student,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        const destinationRole = dropResult.role;
        const draggingFromRole = parentRole;

        if (draggingFromRole && destinationRole.name !== draggingFromRole.name) {
          dispatch({
            type: "REMOVE_STUDENT_FROM_ROLE",
            student,
            role: draggingFromRole,
          });
        }

        handleAddStudentToRole(student, destinationRole);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const rolesCountText =
    student.roles.length > 1 ? ` (${student.roles.length})` : "";

  const isUnassigned = student.roles.length === 0;
  const isInMultipleRoles = student.roles.length > 1;

  const backgroundColor = isUnassigned
    ? "rgba(99, 102, 241, 0.12)"
    : isInMultipleRoles
      ? "rgba(239, 68, 68, 0.12)"
      : "rgba(34, 197, 94, 0.12)";

  const borderColor = isUnassigned
    ? "#818cf8"
    : isInMultipleRoles
      ? "#f87171"
      : "#4ade80";

  const textColor = isUnassigned
    ? "#6366f1"
    : isInMultipleRoles
      ? "#dc2626"
      : "#16a34a";

  return (
    <div
      ref={(node) => {
        drag(node);
      }}
      style={{
        display: "inline-block",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          padding: "6px 12px",
          paddingRight: parentRole ? "32px" : "12px",
          borderRadius: "8px",
          background: backgroundColor,
          border: `1.5px solid ${borderColor}`,
          cursor: "grab",
          transition: "all 0.2s ease-in-out",
          position: "relative",
          fontSize: "0.875rem",
          fontWeight: 500,
          color: textColor,
          userSelect: "none",
        }}
        onMouseDown={(e) => {
          (e.currentTarget as HTMLElement).style.cursor = "grabbing";
        }}
        onMouseUp={(e) => {
          (e.currentTarget as HTMLElement).style.cursor = "grab";
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
        }}
      >
        {student.name}
        <span style={{ opacity: 0.7, fontSize: "0.75rem" }}>{rolesCountText}</span>
        {parentRole && (
          <IconButton
            size="sm"
            variant="plain"
            color="neutral"
            onClick={handleRemoveFromRole}
            sx={{
              position: "absolute",
              right: "2px",
              top: "50%",
              transform: "translateY(-50%)",
              minWidth: "24px",
              minHeight: "24px",
              "--IconButton-size": "24px",
              "&:hover": {
                bgcolor: "rgba(0,0,0,0.08)",
              },
            }}
          >
            <CloseIcon sx={{ fontSize: "14px" }} />
          </IconButton>
        )}
      </div>
    </div>
  );
};
