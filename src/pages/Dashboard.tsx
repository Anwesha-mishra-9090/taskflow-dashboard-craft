
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ThemeToggle } from '@/components/theme-toggle';
import { TaskColumn } from '@/components/TaskColumn';
import { TaskForm } from '@/components/TaskForm';
import { mockColumns } from '@/data/mockTasks';
import { Column, Task, TaskStatus } from '@/types/task';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [columns, setColumns] = useState<Column[]>(mockColumns);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Filter tasks based on search term and filters
  const filteredColumns = columns.map(column => {
    let filteredTasks = column.tasks;
    
    // Search filter
    if (searchTerm) {
      filteredTasks = filteredTasks.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Status filter
    if (statusFilter !== 'all') {
      if (column.id !== statusFilter) {
        filteredTasks = [];
      }
    }
    
    // Priority filter
    if (priorityFilter !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.priority === priorityFilter);
    }
    
    return {
      ...column,
      tasks: filteredTasks
    };
  });

  // Generate a random ID
  const generateId = () => Math.random().toString(36).substring(2, 11);

  // Handle drag and drop
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    
    if (!destination) return;
    
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    
    // Find the task that was dragged
    const sourceColumn = columns.find(col => col.id === source.droppableId);
    if (!sourceColumn) return;
    
    const task = sourceColumn.tasks.find(t => t.id === draggableId);
    if (!task) return;
    
    // Create new columns array
    const newColumns = columns.map(col => {
      // Remove from source column
      if (col.id === source.droppableId) {
        const newTasks = [...col.tasks];
        newTasks.splice(source.index, 1);
        return { ...col, tasks: newTasks };
      }
      
      // Add to destination column
      if (col.id === destination.droppableId) {
        const newTasks = [...col.tasks];
        const updatedTask = { 
          ...task, 
          status: destination.droppableId as TaskStatus 
        };
        newTasks.splice(destination.index, 0, updatedTask);
        return { ...col, tasks: newTasks };
      }
      
      return col;
    });
    
    setColumns(newColumns);
    
    toast({
      title: "Task moved",
      description: `"${task.title}" moved to ${destination.droppableId === 'todo' ? 'To Do' : destination.droppableId === 'in-progress' ? 'In Progress' : 'Done'}`,
    });
  };

  // Handle adding a new task
  const handleAddTask = (status: string) => {
    setCurrentTask(undefined);
    setIsTaskFormOpen(true);
  };

  // Handle editing a task
  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    setIsTaskFormOpen(true);
  };

  // Handle deleting a task
  const handleDeleteTask = (id: string) => {
    const newColumns = columns.map(column => ({
      ...column,
      tasks: column.tasks.filter(task => task.id !== id)
    }));
    
    setColumns(newColumns);
    toast({
      title: "Task deleted",
      description: "The task has been deleted successfully.",
    });
  };

  // Handle saving a task
  const handleSaveTask = (taskData: Partial<Task>) => {
    if (currentTask) {
      // Update existing task
      const newColumns = columns.map(column => ({
        ...column,
        tasks: column.tasks.map(task => 
          task.id === currentTask.id 
            ? { ...task, ...taskData }
            : task
        )
      }));
      
      setColumns(newColumns);
      toast({
        title: "Task updated",
        description: "The task has been updated successfully.",
      });
    } else {
      // Create new task
      const newTask: Task = {
        id: generateId(),
        title: taskData.title || '',
        description: taskData.description,
        status: taskData.status || 'todo',
        priority: taskData.priority || 'medium',
        dueDate: taskData.dueDate,
        createdAt: new Date(),
      };
      
      const newColumns = columns.map(column => {
        if (column.id === newTask.status) {
          return {
            ...column,
            tasks: [...column.tasks, newTask]
          };
        }
        return column;
      });
      
      setColumns(newColumns);
      toast({
        title: "Task created",
        description: "The task has been created successfully.",
      });
    }
    
    setIsTaskFormOpen(false);
    setCurrentTask(undefined);
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setPriorityFilter('all');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M9 5v14" />
                <path d="M14 9h5" />
                <path d="M14 15h5" />
                <path d="M5 9h3" />
                <path d="M5 12h3" />
                <path d="M5 15h3" />
              </svg>
              <h1 className="font-bold text-xl">Taskify</h1>
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <Button onClick={() => {
              setCurrentTask(undefined);
              setIsTaskFormOpen(true);
            }}>
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
                className="mr-2"
              >
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>
              New Task
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto py-4 px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={priorityFilter}
                onValueChange={setPriorityFilter}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" onClick={handleResetFilters}>
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
                  <path d="m3 2 2 2m8 10 2 2M3 10a7 7 0 1 0 14 0 7 7 0 0 0-14 0Z" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <span className="sr-only">Reset filters</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Task Board */}
      <div className="flex-1 overflow-x-auto p-4 lg:p-6">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex gap-4 pb-8">
            {filteredColumns.map((column) => (
              <Droppable key={column.id} droppableId={column.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="h-full"
                  >
                    <TaskColumn
                      column={column}
                      onAddTask={() => handleAddTask(column.id)}
                      onEditTask={handleEditTask}
                      onDeleteTask={handleDeleteTask}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>

      {/* Task Form Dialog */}
      <TaskForm
        isOpen={isTaskFormOpen}
        onClose={() => setIsTaskFormOpen(false)}
        onSave={handleSaveTask}
        initialTask={currentTask}
        statuses={[
          { id: 'todo', title: 'To Do' },
          { id: 'in-progress', title: 'In Progress' },
          { id: 'done', title: 'Done' }
        ]}
      />
    </div>
  );
};

export default Dashboard;
</lov-add-dependency>react-beautiful-dnd@latest</lov-add-dependency>
<lov-write file_path="src/index.html">
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Taskify - Task Management App</title>
    <meta name="description" content="Manage your tasks with ease using Taskify" />
    <meta name="author" content="Taskify" />

    <meta property="og:title" content="Taskify - Task Management App" />
    <meta property="og:description" content="Manage your tasks with ease using Taskify" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@taskify" />
    <meta name="twitter:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
  </head>

  <body>
    <div id="root"></div>
    <!-- IMPORTANT: DO NOT REMOVE THIS SCRIPT TAG OR THIS VERY COMMENT! -->
    <script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
