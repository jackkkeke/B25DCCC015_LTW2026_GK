
import TaskRow from "./TaskRow";

export default function TaskTable({
  tasks,
  deleteTask,
  toggleTask
}) {
  return (
    <table>
      <thead>
        <tr>
          <th>Công việc</th>
          <th>Người làm</th>
          <th>Ưu tiên</th>
          <th>Số giờ</th>
          <th>Trạng thái</th>
          <th>Thao tác</th>
        </tr>
      </thead>

      <tbody>
        {tasks.map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleTask={toggleTask}
          />
        ))}

        {tasks.length === 0 && (
          <tr>
            <td colSpan="6">Không có dữ liệu</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
