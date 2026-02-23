# Smart Todo Assignment

A modern, responsive Todo application built with Next.js App Router, Tailwind CSS, and TanStack Query. 

## Features Built
1. **Dynamic Data Fetching**: Fetches from JSONPlaceholder using TanStack Query.
2. **Robust Pagination**: Full Next/Previous support reading the header `x-total-count` to prevent empty page navigation.
3. **Toggle Status**: Instant, optimistic UI updates when marking a task as complete.
4. **Add New Todo**: Local state optimistic additions seamlessly inserting at the top of the current list.

## Tech Stack
* **Framework**: React 19 & Next.js 16 (App Router)
* **Styling**: TailwindCSS 4
* **State & Data**: TanStack React Query v5
* **Icons**: Lucide React
* **Language**: TypeScript

## Getting Started

First, ensure you have Node.js and Git installed on your machine.

1. **Clone the Repository and Navigate**
   ```bash
   git clone https://github.com/nitesh2920/smart_todo.git
   cd smart_todo
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```

4. **Open the Application**
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

