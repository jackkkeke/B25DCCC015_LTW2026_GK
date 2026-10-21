
import { useState } from "react";
import FilterBar from "../components/FilterBar";
import TaskTable from "../components/TaskTable";

export default function TaskList({
  tasks,
  deleteTask,
  toggleTask
}) {
  const [query, setQuery] = useState("");
  const [priority, setPriority] = useState("Tất cả");

  const handleQueryShift = (value) => {
    setQuery(value);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesName = task.title
      .toLowerCase()
      .includes(query.trim().toLowerCase());

    const matchesPriority =
      priority === "Tất cả" ||
      task.priority === priority;

    return matchesName && matchesPriority;
  });

  return (
    <main>
      <h1>Danh sách công việc</h1>

      <FilterBar
        query={query}
        setQuery={handleQueryShift}
        priority={priority}
        setPriority={setPriority}
      />

      <p>
        Tìm thấy {filteredTasks.length} công việc
      </p>

      <TaskTable
        tasks={filteredTasks}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
      />
    </main>
  );
}
