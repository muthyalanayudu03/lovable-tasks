 import { useDroppable } from '@dnd-kit/core';
 import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
 import { Task, TaskStatus } from '@/types/task';
 import { TaskCard } from './TaskCard';
 import { AddTaskForm } from './AddTaskForm';
 
 interface KanbanColumnProps {
   id: TaskStatus;
   title: string;
   tasks: Task[];
   onAddTask: (title: string, description?: string, status?: TaskStatus) => void;
   onUpdateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
   onDeleteTask: (id: string) => void;
 }
 
 const columnStyles: Record<TaskStatus, { bg: string; accent: string; badge: string }> = {
   'todo': {
     bg: 'bg-column-todo',
     accent: 'bg-column-todo-accent',
     badge: 'bg-column-todo-accent text-white',
   },
   'in-progress': {
     bg: 'bg-column-progress',
     accent: 'bg-column-progress-accent',
     badge: 'bg-column-progress-accent text-white',
   },
   'done': {
     bg: 'bg-column-done',
     accent: 'bg-column-done-accent',
     badge: 'bg-column-done-accent text-white',
   },
 };
 
 export function KanbanColumn({
   id,
   title,
   tasks,
   onAddTask,
   onUpdateTask,
   onDeleteTask,
 }: KanbanColumnProps) {
   const { setNodeRef, isOver } = useDroppable({ id });
   const styles = columnStyles[id];
 
   return (
     <div
       className={`
         flex flex-col rounded-xl p-4 min-h-[500px] w-80 flex-shrink-0
         transition-all duration-200
         ${styles.bg}
         ${isOver ? 'ring-2 ring-primary ring-offset-2' : ''}
       `}
     >
       <div className="flex items-center gap-2 mb-4">
         <div className={`w-2 h-2 rounded-full ${styles.accent}`} />
         <h3 className="font-semibold text-foreground">{title}</h3>
         <span
           className={`
             ml-auto text-xs font-medium px-2 py-0.5 rounded-full
             ${styles.badge}
           `}
         >
           {tasks.length}
         </span>
       </div>
 
       <div
         ref={setNodeRef}
         className="flex-1 flex flex-col gap-2"
       >
         <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
           {tasks.map((task) => (
             <TaskCard
               key={task.id}
               task={task}
               onUpdate={onUpdateTask}
               onDelete={onDeleteTask}
             />
           ))}
         </SortableContext>
 
         <AddTaskForm status={id} onAdd={onAddTask} />
       </div>
     </div>
   );
 }