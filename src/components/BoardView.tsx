"use client";

import { useBoard } from "@/context/BoardContext";
import BoardSidebar from "./BoardSidebar";
import BoardCanvas from "./BoardCanvas";

export default function BoardView() {
  const { boards, activeBoardId } = useBoard();
  const board = boards.find(b => b.id === activeBoardId);

  if (!board) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Board Selected</h2>
          <p className="text-gray-500">Create a new board to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <BoardSidebar />
      <BoardCanvas board={board} />
    </div>
  );
}
