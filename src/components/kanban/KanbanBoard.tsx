 import { useState } from 'react';
 import {
   DndContext,
   DragEndEvent,
   DragOverEvent,
   DragOverlay,
   DragStartEvent,
   PointerSensor,
   useSensor,
   useSensors,
 } from '@dnd-kit/core';
 import { Task, TaskStatus } from '@/types/task';
 import { useTasks } from '@/hooks/useTasks';
 import { KanbanColumn } from './KanbanColumn';
 import { TaskCard } from './TaskCard';
 
 const columns: { id: TaskStatus; title: string }[] = [
   { id: 'todo', title: 'To Do' },
   { id: 'in-progress', title: 'In Progress' },
   { id: 'done', title: 'Done' },
 ];
 
 export function KanbanBoard() {
   const { tasks, addTask, updateTask, deleteTask, moveTask, getTasksByStatus } = useTasks();
   const [activeTask, setActiveTask] = useState<Task | null>(null);
 
   const sensors = useSensors(
     useSensor(PointerSensor, {
       activationConstraint: {
         distance: 8,
       },
     })
   );
 
   const handleDragStart = (event: DragStartEvent) => {
     const task = tasks.find((t) => t.id === event.active.id);
     if (task) {
       setActiveTask(task);
     }
   };
 
   const handleDragOver = (event: DragOverEvent) => {
     const { active, over } = event;
     if (!over) return;
 
     const activeId = active.id as string;
     const overId = over.id as string;
 
     // Check if dropping on a column
     if (columns.some((col) => col.id === overId)) {
       const task = tasks.find((t) => t.id === activeId);
       if (task && task.status !== overId) {
         moveTask(activeId, overId as TaskStatus);
       }
     }
   };
 
   const handleDragEnd = (event: DragEndEvent) => {
     const { active, over } = event;
     setActiveTask(null);
 
     if (!over) return;
 
     const activeId = active.id as string;
     const overId = over.id as string;
 
     // If dropping on a column
     if (columns.some((col) => col.id === overId)) {
       moveTask(activeId, overId as TaskStatus);
     }
   };
 
    return (
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 p-3 sm:p-6 overflow-x-auto min-h-[calc(100vh-80px)]">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={getTasksByStatus(column.id)}
              onAddTask={addTask}
              onUpdateTask={updateTask}
              onDeleteTask={deleteTask}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask && (
            <div className="rotate-3 opacity-90">
              <TaskCard
                task={activeTask}
                onUpdate={() => {}}
                onDelete={() => {}}
              />
            </div>
          )}
        </DragOverlay>
      </DndContext>
    );
  }