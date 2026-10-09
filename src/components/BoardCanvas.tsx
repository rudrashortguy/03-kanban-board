"use client";

import { useState } from "react";
import { Board } from "@/types/index";
import Column from "./Column";

interface BoardCanvasProps {
  board: Board;
}

export default function BoardCanvas({ board }: BoardCanvasProps) {
  const [showAddColumn, setShowAddColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");

  const handleAddColumn = () => {
    if (newColumnTitle.trim()) {
      // Add column logic would go here - using direct state management for now
      setNewColumnTitle("");
      setShowAddColumn(false);
    }
  };

  return (
    <div className="flex-1 overflow-x-auto bg-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{board.title}</h1>
      </div>

      <div className="flex space-x-4">
        {board.columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            boardId={board.id}
          />
        ))}

        {showAddColumn ? (
          <div className="w-72">
            <div className="bg-white rounded-xl p-4">
              <input
                type="text"
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
                placeholder="Column title"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3"
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && handleAddColumn()}
              />
              <div className="flex space-x-2">
                <button
                  onClick={handleAddColumn}
                  className="flex-1 px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowAddColumn(false)}
                  className="flex-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAddColumn(true)}
            className="w-72 flex items-center justify-center space-x-2 p-4 bg-white rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-500 hover:text-blue-500 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-sm font-medium">Add Column</span>
          </button>
        )}
      </div>
    </div>
  );
}
