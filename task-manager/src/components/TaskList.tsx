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
  // add visual feedback:
    const getTaskStyles = (task: Task) => {
    let base =
      "rounded-xl p-4 mb-3 cursor-pointer "; 

    const statusStyles =
    task.status === "completed"
      ? "bg-green-100 text-black"       
      : task.status === "in-progress"
      ? "bg-blue-100 text-black"       
      : "bg-yellow-100 text-black";      
    const priorityStyles =
    task.priority === "high"
      ? "border-l-4 border-[#DB4437]"    
      : task.priority === "medium"
      ? "border-l-4 border-[#F4B400]"    
      : "border-l-4 border-[#0F9D58]";   

    return `${base} ${statusStyles} ${priorityStyles}`;
  };

  return (
    <div className="w-[50%] h-full">
      {/* <h2 className="text-4xl mb-10">Task List</h2> */}
      <TaskFilter onFilterChange={onFilterChange}/>
      {filteredTasks.map((task) => (
        <div key={task.id} className={getTaskStyles(task)}>
          <TaskItem
            task={task}
            key={task.id}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
}

export default TaskList;