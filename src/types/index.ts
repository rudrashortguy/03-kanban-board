export interface Task {
  id: string;
  title: string;
  description?: string;
  columnId: string;
  createdAt: string;
}

export interface Column {
  id: string;
  title: string;
  taskId: string[];
  color: string;
}

export interface Board {
  id: string;
  title: string;
  columns: Column[];
  createdAt: string;
}
