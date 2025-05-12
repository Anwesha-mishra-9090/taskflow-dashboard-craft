
import { Column, Task } from '@/types/task';
import { TaskCard } from './TaskCard';
import { Button } from '@/components/ui/button';

interface TaskColumnProps {
  column: Column;
  onAddTask: (status: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

export function TaskColumn({ column, onAddTask, onEditTask, onDeleteTask }: TaskColumnProps) {
  return (
    <div className="flex flex-col bg-muted/50 rounded-lg p-3 min-w-[300px] min-h-[200px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-sm flex items-center">
          {column.title}
          <span className="ml-2 text-xs bg-background text-muted-foreground px-2 py-0.5 rounded-full">
            {column.tasks.length}
          </span>
        </h3>
        <Button 
          onClick={() => onAddTask(column.id)} 
          size="sm"
          variant="ghost"
          className="h-8 w-8 p-0"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
          <span className="sr-only">Add task</span>
        </Button>
      </div>
      <div className="flex-1">
        {column.tasks.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-4">
            <p className="text-sm text-muted-foreground">No tasks yet</p>
            <Button 
              onClick={() => onAddTask(column.id)} 
              size="sm"
              variant="outline"
              className="mt-2"
            >
              Add Task
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {column.tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEditTask={onEditTask}
                onDeleteTask={onDeleteTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
