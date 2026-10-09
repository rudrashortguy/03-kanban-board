"use client";

import dynamic from "next/dynamic";

const BoardView = dynamic(() => import("@/components/BoardView"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden">
      <BoardView />
    </div>
  );
}
