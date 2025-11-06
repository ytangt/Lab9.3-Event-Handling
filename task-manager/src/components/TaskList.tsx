import TaskFilter from "./TaskFilter";
import TaskItem from "./TaskItem";
import { useState } from "react";
import type { TaskStatus, TaskListProps, Task } from "../types";

function TaskList({ tasks, onStatusChange, onDelete }: TaskListProps) {
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
 
  const onFilterChange = (filters: {
    status?: TaskStatus;
    priority?: "low" | "medium" | "high";
  }) => {
    console.log(filters);
    
    const results = tasks.filter((task) => {
      if (filters.status && filters.priority) {
        return (
          task.status === filters.status && task.priority == filters.priority
        );
      }

      if (filters.status) {
        return task.status === filters.status;
      }

      if (filters.priority) {
        return task.priority === filters.priority;
      }

      if (!filters.status && !filters.priority) {
        return true;
      }
    });

    console.log(results);
    setFilteredTasks(results);
    return results;
  };
  

  return (
    <div className="w-[50%] h-full">
      {/* <h2 className="text-4xl mb-10">Task List</h2> */}

      <TaskFilter onFilterChange={onFilterChange}/>

      {filteredTasks.map((task) => (
        <TaskItem
          task={task}
          key={task.id}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;