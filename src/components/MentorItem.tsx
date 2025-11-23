import { FC, useCallback } from "react";
import { useDrag } from "react-dnd";
import { IconButton } from "@mui/joy";
import CloseIcon from "@mui/icons-material/Close";

import { ItemTypes } from "./ItemTypes";
import Mentor from "@/types/Mentor";
import Role from "@/types/Role";
import { useAppState } from "@/AppContext";

interface Props {
  mentor: Mentor;
  parentRole?: Role;
}

interface DropResult {
  role: Role;
}

export const MentorItem: FC<Props> = ({ mentor, parentRole }) => {
  const { dispatch } = useAppState();

  const handleAddMentorToRole = useCallback(
    (mentor: Mentor, role: Role) => {
      dispatch({ type: "ADD_MENTOR_TO_ROLE", mentor, role });
    },
    [dispatch]
  );

  const handleRemoveFromRole = useCallback(() => {
    if (!parentRole) return;
    dispatch({ type: "REMOVE_MENTOR_FROM_ROLE", mentor, role: parentRole });
  }, [dispatch, parentRole, mentor]);

  const [, drag] = useDrag(() => ({
    type: ItemTypes.MENTOR,
    item: mentor,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        const destinationRole = dropResult.role;
        const draggingFromRole = parentRole;

        if (draggingFromRole && destinationRole.name !== draggingFromRole.name) {
          dispatch({
            type: "REMOVE_MENTOR_FROM_ROLE",
            mentor,
            role: draggingFromRole,
          });
        }

        handleAddMentorToRole(mentor, destinationRole);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const rolesCountText =
    mentor.roles.length > 1 ? ` (${mentor.roles.length})` : "";

  const isUnassigned = mentor.roles.length === 0;
  const isInMultipleRoles = mentor.roles.length > 1;

  const backgroundColor = isUnassigned
    ? "rgba(139, 92, 246, 0.12)"
    : isInMultipleRoles
      ? "rgba(251, 146, 60, 0.12)"
      : "rgba(34, 197, 94, 0.12)";

  const borderColor = isUnassigned
    ? "#a78bfa"
    : isInMultipleRoles
      ? "#fb923c"
      : "#4ade80";

  const textColor = isUnassigned
    ? "#7c3aed"
    : isInMultipleRoles
      ? "#ea580c"
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
        {mentor.name}
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
