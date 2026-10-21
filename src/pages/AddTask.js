
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PRIORITIES } from "../data";

export default function AddTask({ tasks, addTask }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const [priority, setPriority] = useState("Trung bình");
  const [hours, setHours] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !title.trim() ||
      !assignee.trim() ||
      hours === ""
    ) {
      setMessage("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const numberOfHours = Number(hours);

    if (
      !Number.isInteger(numberOfHours) ||
      numberOfHours < 1 ||
      numberOfHours > 40
    ) {
      setMessage("Số giờ phải từ 1 đến 40");
      return;
    }

    const maxId = tasks.reduce(
      (max, task) => Math.max(max, task.id),
      0
    );

    const newTask = {
      id: maxId + 1,
      title: title.trim(),
      assignee: assignee.trim(),
      priority,
      hours: numberOfHours,
      done: false
    };

    addTask(newTask);
    navigate("/tasks", { replace: true });
  };

  return (
    <main>
      <h1>Thêm công việc mới</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Tên công việc</label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="assignee">Người làm</label>
          <input
            id="assignee"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">Mức ưu tiên</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            {PRIORITIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="hours">Số giờ ước tính</label>
          <input
            id="hours"
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
        </div>

        <button type="submit">Thêm</button>

        {message && <p>{message}</p>}
      </form>
    </main>
  );
}
