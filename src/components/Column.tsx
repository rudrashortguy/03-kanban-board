"use client";

import { useState, useRef } from "react";
import { Column as ColumnType, Task } from "@/types/index";

interface ColumnProps {
  column: ColumnType;
  boardId: string;
}

export default function Column({ column }: ColumnProps) {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [draggedTask, setDraggedTask] = useState<string | null>(null);
  const columnRef = useRef<HTMLDivElement>(null);

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      const newTask: Task = {
        id: crypto.randomUUID(),
        title: taskTitle.trim(),
        columnId: column.id,
        createdAt: new Date().toISOString(),
      };
      setTasks(prev => [...prev, newTask]);
      setTaskTitle("");
      setIsAddingTask(false);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedTask(null);
  };

  return (
    <div
      className="w-72 bg-gray-50 rounded-xl flex flex-col max-h-full"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      ref={columnRef}
    >
      <div className="p-4 flex items-center justify-between">
        <h3 className="font-semibold text-gray-700">{column.title}</h3>
        <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            draggable
            onDragStart={() => handleDragStart(task.id)}
            className="bg-white p-3 rounded-lg shadow-sm cursor-move hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <p className="text-sm text-gray-900">{task.title}</p>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="text-gray-400 hover:text-red-500 ml-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ))}

        {isAddingTask ? (
          <div className="bg-white p-3 rounded-lg">
            <textarea
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Task title..."
              className="w-full text-sm resize-none mb-2"
              rows={3}
              autoFocus
            />
            <div className="flex space-x-2">
              <button
                onClick={handleAddTask}
                className="flex-1 px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
              >
                Add
              </button>
              <button
                onClick={() => setIsAddingTask(false)}
                className="flex-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAddingTask(true)}
            className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            + Add Task
          </button>
        )}
      </div>
    </div>
  );
}
