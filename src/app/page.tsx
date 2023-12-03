"use client";
import { Draggable } from '@/components/Draggable';
import { DropTarget } from '@/components/dropTarget';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export default function Home() {
  return (
    <DndProvider backend={HTML5Backend}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-4xl font-bold">Test2</h1>
        <DropTarget />
        <div style={{ overflow: 'hidden', clear: 'both' }}>
        <Draggable name="Glass" />
        <Draggable name="Banana" />
        <Draggable name="Paper" />
      </div>
      </main>
    </DndProvider>
  )
}
