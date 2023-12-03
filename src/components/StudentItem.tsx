import { FC } from "react"
import { useDrag } from 'react-dnd'

import { ItemTypes } from './ItemTypes'
import { Chip } from '@mui/joy'
import Student from "@/types/Student"

interface Props {
  student: Student;
  onAddToRole: (student: Student, role: string) => void;
}

interface DropResult {
  name: string
}

export const StudentItem: FC<Props> = ({ student, onAddToRole }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: student,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>()
      if (item && dropResult) {
        console.log(`You dropped ${item.name} into ${dropResult.name}!`);
        onAddToRole(student, dropResult.name);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))

  return (
    <span>
    <Chip size="md" ref={drag} className={isDragging ? "opacity-50" : "opacity-100"} variant={student.roles.length === 0 ? "outlined" : "solid"} color={student.roles.length === 0 ? "primary" : "danger"}>
      {student.name} ({student.roles.map((role) => role)})
    </Chip>
    </span>
  )
}