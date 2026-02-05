 import { useState } from 'react';
 import { Plus, X } from 'lucide-react';
 import { motion, AnimatePresence } from 'framer-motion';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Textarea } from '@/components/ui/textarea';
 import { TaskStatus } from '@/types/task';
 
 interface AddTaskFormProps {
   status: TaskStatus;
   onAdd: (title: string, description?: string, status?: TaskStatus) => void;
 }
 
 export function AddTaskForm({ status, onAdd }: AddTaskFormProps) {
   const [isOpen, setIsOpen] = useState(false);
   const [title, setTitle] = useState('');
   const [description, setDescription] = useState('');
 
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     if (title.trim()) {
       onAdd(title.trim(), description.trim() || undefined, status);
       setTitle('');
       setDescription('');
       setIsOpen(false);
     }
   };
 
   const handleCancel = () => {
     setTitle('');
     setDescription('');
     setIsOpen(false);
   };
 
   return (
     <div className="mt-2">
       <AnimatePresence mode="wait">
         {isOpen ? (
           <motion.form
             key="form"
             initial={{ opacity: 0, height: 0 }}
             animate={{ opacity: 1, height: 'auto' }}
             exit={{ opacity: 0, height: 0 }}
             onSubmit={handleSubmit}
             className="space-y-2 overflow-hidden"
           >
             <Input
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               placeholder="Task title"
               className="text-sm"
               autoFocus
             />
             <Textarea
               value={description}
               onChange={(e) => setDescription(e.target.value)}
               placeholder="Add a description (optional)"
               className="text-sm resize-none"
               rows={2}
             />
             <div className="flex gap-2">
               <Button type="submit" size="sm" className="flex-1">
                 Add Task
               </Button>
               <Button type="button" size="sm" variant="ghost" onClick={handleCancel}>
                 <X className="h-4 w-4" />
               </Button>
             </div>
           </motion.form>
         ) : (
           <motion.div
             key="button"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
           >
             <Button
               variant="ghost"
               size="sm"
               className="w-full justify-start text-muted-foreground hover:text-foreground"
               onClick={() => setIsOpen(true)}
             >
               <Plus className="h-4 w-4 mr-2" />
               Add a task
             </Button>
           </motion.div>
         )}
       </AnimatePresence>
     </div>
   );
 }