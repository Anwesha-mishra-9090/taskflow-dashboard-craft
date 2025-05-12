
import { Task, Column } from '../types/task';

// Generate a random ID
const generateId = () => Math.random().toString(36).substring(2, 11);

// Mock tasks data
export const mockTasks: Task[] = [
  {
    id: generateId(),
    title: 'Design new landing page',
    description: 'Create wireframes and mockups for the new marketing landing page',
    status: 'todo',
    priority: 'high',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 5)),
    createdAt: new Date(),
  },
  {
    id: generateId(),
    title: 'Fix navigation bug',
    description: 'There is an issue with the dropdown menu on mobile devices',
    status: 'todo',
    priority: 'medium',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 2)),
    createdAt: new Date(),
  },
  {
    id: generateId(),
    title: 'Update dependencies',
    description: 'Update all packages to the latest versions',
    status: 'in-progress',
    priority: 'low',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
  },
  {
    id: generateId(),
    title: 'Create API documentation',
    description: 'Document all API endpoints and parameters',
    status: 'in-progress',
    priority: 'high',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 3)),
    createdAt: new Date(new Date().setDate(new Date().getDate() - 2)),
  },
  {
    id: generateId(),
    title: 'Review pull requests',
    description: 'Go through open PRs and provide feedback',
    status: 'done',
    priority: 'medium',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 3)),
  },
  {
    id: generateId(),
    title: 'Setup testing environment',
    description: 'Configure Jest and React Testing Library',
    status: 'done',
    priority: 'high',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 5)),
  },
];

// Column definitions
export const mockColumns: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: mockTasks.filter(task => task.status === 'todo'),
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    tasks: mockTasks.filter(task => task.status === 'in-progress'),
  },
  {
    id: 'done',
    title: 'Done',
    tasks: mockTasks.filter(task => task.status === 'done'),
  },
];
