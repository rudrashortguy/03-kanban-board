"use client";

import { useBoard } from "@/context/BoardContext";
import { useState } from "react";

export default function BoardSidebar() {
  const { boards, activeBoardId, setActiveBoard, addBoard, deleteBoard } = useBoard();
  const [showAddBoard, setShowAddBoard] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState("");

  const handleAddBoard = () => {
    if (newBoardTitle.trim()) {
      addBoard(newBoardTitle.trim());
      setNewBoardTitle("");
      setShowAddBoard(false);
    }
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-700">Boards</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {boards.map((board) => (
          <div
            key={board.id}
            className={`flex items-center justify-between group p-3 rounded-lg mb-1 cursor-pointer ${
              board.id === activeBoardId ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50"
            }`}
            onClick={() => setActiveBoard(board.id)}
          >
            <span className="truncate">{board.title}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteBoard(board.id);
              }}
              className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200">
        {showAddBoard ? (
          <div className="space-y-2">
            <input
              type="text"
              value={newBoardTitle}
              onChange={(e) => setNewBoardTitle(e.target.value)}
              placeholder="Board name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleAddBoard()}
            />
            <div className="flex space-x-2">
              <button
                onClick={handleAddBoard}
                className="flex-1 px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
              >
                Add
              </button>
              <button
                onClick={() => setShowAddBoard(false)}
                className="flex-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAddBoard(true)}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-sm font-medium">New Board</span>
          </button>
        )}
      </div>
    </aside>
  );
}
