import { FC } from "react"
import { useDrag } from 'react-dnd'

import { ItemTypes } from './ItemTypes'
import { Chip } from '@mui/joy'

interface Props {
  name: string
}

interface DropResult {
  name: string
}

export const StudentItem: FC<Props> = ({ name }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>()
      if (item && dropResult) {
        console.log(`You dropped ${item.name} into ${dropResult.name}!`)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))

  const opacity = isDragging ? "opacity-50" : "opacity-100"

  return (
    <span className={`${opacity}`}>
      <Chip size="lg" ref={drag} >
        {name}
      </Chip>
    </span>
  )
}