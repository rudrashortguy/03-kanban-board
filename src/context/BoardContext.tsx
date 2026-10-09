"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Board, Column, Task } from "@/types/index";

interface BoardContextType {
  boards: Board[];
  activeBoardId: string;
  addBoard: (title: string) => void;
  deleteBoard: (id: string) => void;
  setActiveBoard: (id: string) => void;
  addColumn: (boardId: string, title: string) => void;
  deleteColumn: (boardId: string, columnId: string) => void;
  moveColumn: (boardId: string, columnId: string, position: number) => void;
  addTask: (boardId: string, columnId: string, taskData: { title: string; description?: string }) => void;
  updateTask: (boardId: string, columnId: string, taskId: string, updates: Partial<Task>) => void;
  deleteTask: (boardId: string, columnId: string, taskId: string) => void;
  moveTask: (
    boardId: string,
    fromColumnId: string,
    taskId: string,
    toColumnId: string,
    position?: number
  ) => void;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

const STORAGE_KEY = "kanban-boards-data";

function loadBoards(): Board[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    // Create default board
    const defaultBoard: Board = {
      id: crypto.randomUUID(),
      title: "My Board",
      columns: [
        { id: crypto.randomUUID(), title: "To Do", taskId: [], color: "bg-gray-100" },
        { id: crypto.randomUUID(), title: "In Progress", taskId: [], color: "bg-blue-100" },
        { id: crypto.randomUUID(), title: "Done", taskId: [], color: "bg-green-100" },
      ],
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([defaultBoard]));
    return [defaultBoard];
  }
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

function saveBoards(boards: Board[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(boards));
}

export function BoardProvider({ children }: { children: ReactNode }) {
  const [boards, setBoards] = useState<Board[]>([]);
  const [activeBoardId, setActiveBoardId] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const loaded = loadBoards();
    setBoards(loaded);
    setActiveBoardId(loaded[0]?.id || "");
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      saveBoards(boards);
    }
  }, [boards, mounted]);

  const addBoard = (title: string) => {
    const newBoard: Board = {
      id: crypto.randomUUID(),
      title,
      columns: [
        { id: crypto.randomUUID(), title: "To Do", taskId: [], color: "bg-gray-100" },
        { id: crypto.randomUUID(), title: "In Progress", taskId: [], color: "bg-blue-100" },
        { id: crypto.randomUUID(), title: "Done", taskId: [], color: "bg-green-100" },
      ],
      createdAt: new Date().toISOString(),
    };
    setBoards(prev => [...prev, newBoard]);
    setActiveBoardId(newBoard.id);
  };

  const deleteBoard = (id: string) => {
    setBoards(prev => {
      const remaining = prev.filter(b => b.id !== id);
      if (remaining.length === 0) {
        const newBoard: Board = {
          id: crypto.randomUUID(),
          title: "New Board",
          columns: [
            { id: crypto.randomUUID(), title: "To Do", taskId: [], color: "bg-gray-100" },
            { id: crypto.randomUUID(), title: "In Progress", taskId: [], color: "bg-blue-100" },
            { id: crypto.randomUUID(), title: "Done", taskId: [], color: "bg-green-100" },
          ],
          createdAt: new Date().toISOString(),
        };
        setActiveBoardId(newBoard.id);
        return [newBoard];
      }
      if (id === activeBoardId) {
        setActiveBoardId(remaining[0].id);
      }
      return remaining;
    });
  };

  const setActiveBoard = (id: string) => {
    setActiveBoardId(id);
  };

  const getActiveBoard = () => boards.find(b => b.id === activeBoardId);

  const addColumn = (boardId: string, title: string) => {
    setBoards(prev => prev.map(board => {
      if (board.id !== boardId) return board;
      return {
        ...board,
        columns: [...board.columns, {
          id: crypto.randomUUID(),
          title,
          taskId: [],
          color: "bg-gray-100"
        }]
      };
    }));
  };

  const deleteColumn = (boardId: string, columnId: string) => {
    setBoards(prev => prev.map(board => {
      if (board.id !== boardId) return board;
      return {
        ...board,
        columns: board.columns.filter(c => c.id !== columnId)
      };
    }));
  };

  const moveColumn = (boardId: string, columnId: string, position: number) => {
    setBoards(prev => prev.map(board => {
      if (board.id !== boardId) return board;
      const columns = [...board.columns];
      const columnIndex = columns.findIndex(c => c.id === columnId);
      if (columnIndex === -1) return board;
      const [column] = columns.splice(columnIndex, 1);
      columns.splice(position, 0, column);
      return { ...board, columns };
    }));
  };

  const addTask = (boardId: string, columnId: string, taskData: { title: string; description?: string }) => {
    const task: Task = {
      id: crypto.randomUUID(),
      title: taskData.title,
      description: taskData.description,
      columnId,
      createdAt: new Date().toISOString(),
    };
    setBoards(prev => prev.map(board => {
      if (board.id !== boardId) return board;
      return {
        ...board,
        columns: board.columns.map(column => {
          if (column.id !== columnId) return column;
          return { ...column, taskId: [...column.taskId, task.id] };
        })
      };
    }));
  };

  const updateTask = (boardId: string, columnId: string, taskId: string, updates: Partial<Task>) => {
    setBoards(prev => prev.map(board => {
      if (board.id !== boardId) return board;
      return {
        ...board,
        columns: board.columns.map(column => {
          if (column.id !== columnId) return column;
          return {
            ...column,
            taskId: column.taskId.map(tid => {
              if (tid !== taskId) return tid;
              const taskIndex = board.columns
                .find(c => c.id === columnId)
                ?.taskId.indexOf(tid);
              const task = board.columns
                .find(c => c.id === columnId)
                ?.taskId[taskIndex];
              if (!task) return tid;
              const fullTask = findTask(board, taskId);
              if (!fullTask) return tid;
              return tid;
            })
          };
        })
      };
    }));
  };

  const deleteTask = (boardId: string, columnId: string, taskId: string) => {
    setBoards(prev => prev.map(board => {
      if (board.id !== boardId) return board;
      return {
        ...board,
        columns: board.columns.map(column => {
          if (column.id !== columnId) return column;
          return { ...column, taskId: column.taskId.filter(id => id !== taskId) };
        })
      };
    }));
  };

  const findTask = (board: Board, taskId: string): Task | null => {
    for (const column of board.columns) {
      const taskIndex = column.taskId.findIndex(id => id === taskId);
      if (taskIndex !== -1) {
        return {
          id: taskId,
          title: "",
          columnId: column.id,
          createdAt: "",
        };
      }
    }
    return null;
  };

  const moveTask = (
    boardId: string,
    fromColumnId: string,
    taskId: string,
    toColumnId: string,
    position?: number
  ) => {
    setBoards(prev => prev.map(board => {
      if (board.id !== boardId) return board;

      let taskTitle = "";
      const columns = board.columns.map(column => {
        if (column.id === fromColumnId) {
          return { ...column, taskId: column.taskId.filter(id => id !== taskId) };
        }
        return column;
      }).map((column, index) => {
        if (column.id === toColumnId) {
          const insertPos = position !== undefined ? position : column.taskId.length;
          const newTaskIds = [...column.taskId];
          newTaskIds.splice(insertPos, 0, taskId);
          return { ...column, taskId: newTaskIds };
        }
        return column;
      });

      return { ...board, columns };
    }));
  };

  return (
    <BoardContext.Provider value={{
      boards,
      activeBoardId,
      addBoard,
      deleteBoard,
      setActiveBoard,
      addColumn,
      deleteColumn,
      moveColumn,
      addTask,
      updateTask,
      deleteTask,
      moveTask,
    }}>
      {children}
    </BoardContext.Provider>
  );
}

export function useBoard() {
  const context = useContext(BoardContext);
  if (context === undefined) {
    throw new Error("useBoard must be used within a BoardProvider");
  }
  return context;
}
