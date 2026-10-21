
import { Link } from "react-router-dom";

export default function TaskRow({
  task,
  deleteTask,
  toggleTask
}) {
  return (
    <tr>
      <td>
        <Link
          className={task.done ? "completed" : ""}
          to={`/tasks/${task.id}`}
        >
          {task.title}
        </Link>
      </td>

      <td>{task.assignee}</td>
      <td>{task.priority}</td>
      <td>{task.hours}</td>

      <td>
        {task.done ? "Đã xong" : "Đang làm"}
      </td>

      <td>
        <button
          type="button"
          onClick={() => toggleTask(task.id)}
        >
          {task.done ? "Làm lại" : "Hoàn thành"}
        </button>

        {" "}

        <button
          type="button"
          onClick={() => deleteTask(task.id)}
        >
          Xóa
        </button>
      </td>
    </tr>
  );
}
