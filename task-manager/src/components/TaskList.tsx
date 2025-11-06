import TaskFilter from "./TaskFilter";
import TaskItem from "./TaskItem";
import { useState, useEffect } from "react";
import type { TaskStatus, TaskListProps, Task } from "../types";

function TaskList({ tasks, onStatusChange, onDelete }: TaskListProps) {
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
 
  // 
  useEffect(()=> {
    setFilteredTasks(tasks);
  },[tasks]);
  
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

    setFilteredTasks(results);
    return results;
  };
  // add visual feedback:
    const getTaskStyles = (task: Task) => {
    let base =
      "rounded-xl p-4 mb-3 cursor-pointer transition-all duration-200 active:scale-95 "; 

    const statusStyles =
    task.status === "completed"
      ? "bg-green-200 text-black"       
      : task.status === "in-progress"
      ? "bg-blue-200 text-black"       
      : "bg-yellow-200 text-black";      
    const priorityStyles =
    task.priority === "high"
      ? "border-l-8 border-[#DB4437] hover:border-8"    
      : task.priority === "medium"
      ? "border-l-8 border-[#F4B400] hover:border-8"    
      : "border-l-8 border-[#0F9D58] hover:border-8";   

    return `${base} ${statusStyles} ${priorityStyles}`;
  };

  return (
    <div className="w-[50%] h-full ">
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