# Kanban Board

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A production-ready Kanban board application built with Next.js 14, TypeScript, and Tailwind CSS. Visualize and manage your tasks with drag-and-drop functionality.

## Features

- 📋 **Multiple Boards**: Create and switch between different project boards
- 🎯 **Drag & Drop**: Easily move tasks between columns
- 🏷️ **Task Management**: Create, edit, and delete tasks
- 📊 **Multi-Column**: Organize tasks with customizable columns
- 💾 **Local Storage**: All data persists in browser localStorage
- 📱 **Responsive Design**: Works on desktop and tablets
- 🎨 **Clean UI**: Modern, intuitive interface with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API with localStorage persistence
- **Drag & Drop**: HTML5 Drag and Drop API

## Getting Started

### Prerequisites

- Node.js 18.18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rudrashortguy/03-kanban-board.git
cd 03-kanban-board
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Create a Board**: Click "New Board" in the sidebar
2. **Add Columns**: Click "Add Column" to create new columns
3. **Add Tasks**: Click "+ Add Task" in any column
4. **Move Tasks**: Drag tasks between columns
5. **Delete**: Hover over items to reveal delete buttons

## Project Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── BoardCanvas.tsx
│   ├── BoardSidebar.tsx
│   ├── BoardView.tsx
│   └── Column.tsx
├── context/
│   └── BoardContext.tsx
└── types/
    └── index.ts
```

## Roadmap

- [ ] Task descriptions and priorities
- [ ] Labels and assignees
- [ ] Due dates and reminders
- [ ] Search and filtering
- [ ] Column templates
- [ ] Team collaboration
- [ ] Analytics and reporting

## License

MIT License
