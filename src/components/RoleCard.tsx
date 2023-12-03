import { Card, CardContent, CardOverflow, Divider, Typography } from "@mui/joy"
import { FC, useCallback, useState } from "react"

import { ItemTypes } from './ItemTypes'

import { useDrop } from 'react-dnd'

interface Props {
  name: string
}

export const RoleCard: FC<Props> = ({ name }) => {
  const [students, setStudents] = useState<string[]>([])

  const handleDrop = useCallback((item: any) => {
    setStudents((students) => [...students, item.name])
    return {
      name: name
    }
  }, []);
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: handleDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  const isActive = canDrop && isOver
  let backgroundColor = '#222'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }

  return (
    <Card variant={isActive ? "solid" : "outlined" } invertedColors={isActive} sx={{ width: 320, height: 300 }} ref={drop}>
      <CardContent>
        <Typography level="title-lg">{name}</Typography>
        {
          students.map((name) => (
            <Typography level="body-sm">{name}</Typography>
          ))
        }
      </CardContent>
      <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
            {students.length} students
          </Typography>
          <Divider orientation="vertical" />
          <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
            1 hour ago
          </Typography>
        </CardContent>
      </CardOverflow>
    </Card>
  )
}