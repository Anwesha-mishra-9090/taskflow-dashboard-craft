
import { useState, useEffect } from 'react';
import { Task, TaskStatus, TaskPriority } from '@/types/task';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Partial<Task>) => void;
  initialTask?: Task;
  statuses: { id: TaskStatus; title: string }[];
}

export function TaskForm({ isOpen, onClose, onSave, initialTask, statuses }: TaskFormProps) {
  const [task, setTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    status: 'todo' as TaskStatus,
    priority: 'medium' as TaskPriority,
    dueDate: undefined,
  });
  
  const [date, setDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (initialTask) {
      setTask(initialTask);
      setDate(initialTask.dueDate);
    } else {
      setTask({
        title: '',
        description: '',
        status: 'todo' as TaskStatus,
        priority: 'medium' as TaskPriority,
        dueDate: undefined,
      });
      setDate(undefined);
    }
  }, [initialTask, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...task,
      dueDate: date,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{initialTask ? 'Edit Task' : 'Create New Task'}</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={task.title}
                onChange={handleInputChange}
                placeholder="Task title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={task.description || ''}
                onChange={handleInputChange}
                placeholder="Task description"
                className="resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <RadioGroup
                value={task.status}
                onValueChange={(value) => setTask(prev => ({ ...prev, status: value as TaskStatus }))}
                className="flex space-x-2"
              >
                {statuses.map((status) => (
                  <div key={status.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={status.id} id={status.id} />
                    <Label htmlFor={status.id}>{status.title}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <RadioGroup
                value={task.priority}
                onValueChange={(value) => setTask(prev => ({ ...prev, priority: value as TaskPriority }))}
                className="flex space-x-2"
              >
                {['low', 'medium', 'high'].map((priority) => (
                  <div key={priority} className="flex items-center space-x-2">
                    <RadioGroupItem value={priority} id={priority} />
                    <Label htmlFor={priority}>{priority.charAt(0).toUpperCase() + priority.slice(1)}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                  >
                    {date ? format(date, 'PPP') : 'Select a due date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 pointer-events-auto">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {date && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDate(undefined)}
                  className="text-xs"
                >
                  Clear date
                </Button>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {initialTask ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
