
import { useParams, useNavigate } from "react-router-dom";
import WorkTimer from "../components/WorkTimer";

export default function TaskDetail({ tasks }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const taskId = Number(id);

  const task = tasks.find(
    (item) => item.id === taskId
  );

  if (!task) {
    return (
      <main>
        <p>Không tìm thấy công việc</p>

        <button
          type="button"
          onClick={() => navigate(-1)}
        >
          Quay lại
        </button>
      </main>
    );
  }

  return (
    <main>
      <h1>Chi tiết công việc</h1>

      <p>Tên công việc: {task.title}</p>
      <p>Người làm: {task.assignee}</p>
      <p>Mức ưu tiên: {task.priority}</p>
      <p>Số giờ: {task.hours}</p>
      <p>
        Trạng thái: {task.done ? "Đã xong" : "Đang làm"}
      </p>

      <WorkTimer />

      <button
        type="button"
        onClick={() => navigate(-1)}
      >
        Quay lại
      </button>
    </main>
  );
}
