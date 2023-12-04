import { FC, useCallback } from "react";
import { useDrag } from "react-dnd";

import { ItemTypes } from "./ItemTypes";
import { Chip, ChipDelete } from "@mui/joy";
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

  const handleAddStudentToRole = useCallback((student: Student, role: Role) => {
    dispatch({ type: "ADD_STUDENT_TO_ROLE", student, role });
  }, [dispatch]);

  const handleRemoveFromRole = useCallback(() => {
    if (!parentRole) return;
    dispatch({ type: "REMOVE_STUDENT_FROM_ROLE", student, role: parentRole });
  }, [dispatch]);
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: student,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        console.log(`You dropped ${item.name} into ${dropResult.role.name}!`);
        handleAddStudentToRole(student, dropResult.role);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const rolesCountText = student.roles.length > 1 ? ` (in ${student.roles.length} roles)` : "";

  return (
    <span>
      <Chip
        size="md"
        ref={drag}
        variant={student.roles.length === 0 ? "outlined" : "solid"}
        color={student.roles.length === 0 ? "primary" : student.roles.length > 1 ? "danger" : "success"}
        endDecorator={parentRole ? <ChipDelete onDelete={handleRemoveFromRole}/> : null}
      >
        {student.name}{rolesCountText}
      </Chip>
    </span>
  );
};
