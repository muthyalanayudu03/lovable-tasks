 import { useState, useCallback } from 'react';
 import { Task, TaskStatus } from '@/types/task';
 
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Design new landing page',
    description: 'Create wireframes and mockups for the redesigned homepage',
    status: 'todo',
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Set up database schema',
    description: 'Define tables and relationships for the project',
    status: 'todo',
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
  },
  {
    id: '3',
    title: 'Implement user authentication',
    description: 'Add login and signup functionality',
    status: 'in-progress',
    deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
  },
  {
    id: '4',
    title: 'Write API documentation',
    description: 'Document all endpoints and their usage',
    status: 'in-progress',
    createdAt: new Date(),
  },
  {
    id: '5',
    title: 'Deploy staging environment',
    description: 'Set up CI/CD pipeline for staging',
    status: 'done',
    createdAt: new Date(),
  },
];
 
 export function useTasks() {
   const [tasks, setTasks] = useState<Task[]>(initialTasks);
 
  const addTask = useCallback((title: string, description?: string, status: TaskStatus = 'todo', deadline?: Date) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      status,
      deadline,
      createdAt: new Date(),
    };
    setTasks((prev) => [...prev, newTask]);
  }, []);
 
   const updateTask = useCallback((id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
     setTasks((prev) =>
       prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
     );
   }, []);
 
   const deleteTask = useCallback((id: string) => {
     setTasks((prev) => prev.filter((task) => task.id !== id));
   }, []);
 
   const moveTask = useCallback((taskId: string, newStatus: TaskStatus) => {
     setTasks((prev) =>
       prev.map((task) =>
         task.id === taskId ? { ...task, status: newStatus } : task
       )
     );
   }, []);
 
   const getTasksByStatus = useCallback(
     (status: TaskStatus) => tasks.filter((task) => task.status === status),
     [tasks]
   );
 
   return {
     tasks,
     addTask,
     updateTask,
     deleteTask,
     moveTask,
     getTasksByStatus,
   };
 }