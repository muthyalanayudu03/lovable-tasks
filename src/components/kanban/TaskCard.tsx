 import { useState } from 'react';
 import { useSortable } from '@dnd-kit/sortable';
 import { CSS } from '@dnd-kit/utilities';
 import { motion } from 'framer-motion';
 import { GripVertical, Pencil, Trash2, X, Check } from 'lucide-react';
 import { Task } from '@/types/task';
 import { Card, CardContent } from '@/components/ui/card';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Textarea } from '@/components/ui/textarea';
 
 interface TaskCardProps {
   task: Task;
   onUpdate: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
   onDelete: (id: string) => void;
 }
 
 export function TaskCard({ task, onUpdate, onDelete }: TaskCardProps) {
   const [isEditing, setIsEditing] = useState(false);
   const [editTitle, setEditTitle] = useState(task.title);
   const [editDescription, setEditDescription] = useState(task.description || '');
 
   const {
     attributes,
     listeners,
     setNodeRef,
     transform,
     transition,
     isDragging,
   } = useSortable({ id: task.id });
 
   const style = {
     transform: CSS.Transform.toString(transform),
     transition,
   };
 
   const handleSave = () => {
     if (editTitle.trim()) {
       onUpdate(task.id, {
         title: editTitle.trim(),
         description: editDescription.trim() || undefined,
       });
       setIsEditing(false);
     }
   };
 
   const handleCancel = () => {
     setEditTitle(task.title);
     setEditDescription(task.description || '');
     setIsEditing(false);
   };
 
  if (isEditing) {
    return (
      <div className="glass-card rounded-lg animate-scale-in">
        <div className="p-3 space-y-2">
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Task title"
            className="text-sm font-medium bg-background/50"
            autoFocus
          />
          <Textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Add a description..."
            className="text-sm resize-none bg-background/50"
            rows={2}
          />
          <div className="flex gap-2 justify-end">
            <Button size="sm" variant="ghost" onClick={handleCancel}>
              <X className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Check className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
 
  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={isDragging ? 'z-50' : ''}
    >
      <div
        className={`
          glass-card rounded-lg group cursor-grab active:cursor-grabbing
          transition-all duration-200
          ${isDragging ? 'shadow-drag scale-[1.02] rotate-1' : 'hover:shadow-lg'}
        `}
      >
        <div className="p-3">
          <div className="flex items-start gap-2">
            <div
              {...attributes}
              {...listeners}
              className="mt-0.5 opacity-40 hover:opacity-100 transition-opacity cursor-grab"
            >
              <GripVertical className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground leading-tight">
                {task.title}
              </h4>
              {task.description && (
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {task.description}
                </p>
              )}
            </div>
            <div className="flex gap-1">
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-accent/50"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="h-3.5 w-3.5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                onClick={() => onDelete(task.id)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}