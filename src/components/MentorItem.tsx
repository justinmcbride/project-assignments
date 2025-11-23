import { FC, useCallback } from "react";
import { useDrag } from "react-dnd";
import { Chip, ChipDelete } from "@mui/joy";

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
    mentor.roles.length > 1 ? ` (in ${mentor.roles.length} roles)` : "";

  const isUnassigned = mentor.roles.length === 0;
  const isInMultipleRoles = mentor.roles.length > 1;

  const chipVariant = isUnassigned
    ? "outlined"
    : isInMultipleRoles
      ? "soft"
      : "solid";
  const chipColor = isUnassigned
    ? "primary"
    : isInMultipleRoles
      ? "warning"
      : "success";

  return (
    <div
      ref={(node) => {
        drag(node);
      }}
      style={{ display: "inline-block" }}
    >
      <Chip
        size="md"
        variant={chipVariant}
        color={chipColor}
        endDecorator={
          parentRole ? <ChipDelete onDelete={handleRemoveFromRole} /> : null
        }
        sx={{
          cursor: "grab",
          transition: "all 0.2s ease-in-out",
          "&:active": { cursor: "grabbing" },
        }}
      >
        {mentor.name}
        {rolesCountText}
      </Chip>
    </div>
  );
};
