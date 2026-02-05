 export type TaskStatus = 'todo' | 'in-progress' | 'done';
 
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  deadline?: Date;
  createdAt: Date;
}
 
 export interface Column {
   id: TaskStatus;
   title: string;
   tasks: Task[];
 }