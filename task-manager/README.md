## Task Manager Components

This project contains reusable React + TypeScript components for a Task Management application.

## Components Overview

### 1. TaskList

**Description:**  
Renders a list of tasks and manages filtering and visual styles. Uses the TaskItem and TaskFilter components.

**Usage Example:**

```tsx
<TaskList
  tasks={tasks}
  onStatusChange={(id, status) => console.log(id, status)}
  onDelete={(id) => console.log("Deleted task", id)}
/>
```

### TaskItem

**Description:** 
Displays a single task card with title, description, status, priority, due date, and allows changing the task status via a dropdown.

**Usage Example:**
```tsx
<TaskItem
  task={task}
  onStatusChange={(id, status) => console.log(id, status)}
/>
```

### TaskItem

**Description:** 
Provides dropdowns to filter tasks by status and priority. Calls onFilterChange when the user changes a filter option.

**Usage Example:**
```tsx
<TaskFilter
  onFilterChange={(filters) => console.log("Filters applied:", filters)}
/>
```