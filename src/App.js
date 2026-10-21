
import { useEffect, useState } from 'react';
import './App.css';
import { PRIORITIES } from './data';

const STORAGE_KEY = 'giuaky_tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('Tất cả');
  const [newTask, setNewTask] = useState({
    title: '',
    assignee: '',
    priority: 'Trung bình',
    hours: '',
  });
  const [errors, setErrors] = useState({});
  const [seconds, setSeconds] = useState(0);

  const path = window.location.pathname;
  const detailMatch = path.match(/^\/tasks\/(\d+)\/?$/);
  const taskId = detailMatch ? Number(detailMatch[1]) : null;
  const isLoginPage = path === '/login';

  useEffect(() => {
    async function loadTasks() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved !== null) {
          setTasks(JSON.parse(saved));
        } else {
          const response = await fetch('/data/tasks.json');

          if (!response.ok) {
            throw new Error('Không thể tải dữ liệu công việc');
          }

          const data = await response.json();
          setTasks(data);
        }
      } catch (error) {
        console.error(error);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks, loading]);

  useEffect(() => {
    if (!detailMatch) return;

    setSeconds(0);
    const timer = setInterval(() => {
      setSeconds((value) => value + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [path]);

  const completedCount = tasks.filter((task) => task.done).length;
  const pendingCount = tasks.length - completedCount;
  const totalHours = tasks.reduce(
    (total, task) => total + Number(task.hours),
    0
  );

  const visibleTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.assignee.toLowerCase().includes(search.toLowerCase());

    const matchesPriority =
      priorityFilter === 'Tất cả' ||
      task.priority === priorityFilter;

    return matchesSearch && matchesPriority;
  });

  function toggleTask(id) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function deleteTask(id) {
    if (window.confirm('Bạn có chắc muốn xóa công việc này?')) {
      setTasks((current) => current.filter((task) => task.id !== id));
    }
  }

  function handleInputChange(event) {
    const { name, value } = event.target;

    setNewTask((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: '',
    }));
  }

  function handleAddTask(event) {
    event.preventDefault();

    const nextErrors = {};
    const hours = Number(newTask.hours);

    if (!newTask.title.trim()) {
      nextErrors.title = 'Vui lòng nhập tên công việc.';
    }

    if (!newTask.assignee.trim()) {
      nextErrors.assignee = 'Vui lòng nhập người phụ trách.';
    }

    if (
      newTask.hours.trim() === '' ||
      !Number.isInteger(hours) ||
      hours < 1 ||
      hours > 40
    ) {
      nextErrors.hours = 'Số giờ phải là số nguyên từ 1 đến 40.';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    const task = {
      id: tasks.reduce((max, item) => Math.max(max, item.id), 0) + 1,
      title: newTask.title.trim(),
      assignee: newTask.assignee.trim(),
      priority: newTask.priority,
      hours,
      done: false,
    };

    setTasks((current) => [...current, task]);

    setNewTask({
      title: '',
      assignee: '',
      priority: 'Trung bình',
      hours: '',
    });
  }

  if (loading) {
    return <div className="container">Đang tải dữ liệu...</div>;
  }

  if (isLoginPage) {
    return (
      <main className="container">
        <nav className="navbar">
          <a href="/">Trang chủ</a>
          <a href="/login" className="active">Đăng nhập</a>
        </nav>
        <h1>Đăng nhập</h1>
        <p>Trang đăng nhập theo đường dẫn /login.</p>
      </main>
    );
  }

  if (detailMatch) {
    const task = tasks.find((item) => item.id === taskId);

    if (!task) {
      return (
        <main className="container">
          <nav className="navbar">
            <a href="/">Trang chủ</a>
          </nav>
          <h1>Không tìm thấy công việc</h1>
          <p>Công việc có mã {taskId} không tồn tại.</p>
        </main>
      );
    }

    return (
      <main className="container">
        <nav className="navbar">
          <a href="/">Trang chủ</a>
        </nav>

        <h1>Chi tiết công việc</h1>
        <p><strong>Mã công việc:</strong> {task.id}</p>
        <p><strong>Tên:</strong> {task.title}</p>
        <p><strong>Người phụ trách:</strong> {task.assignee}</p>
        <p><strong>Ưu tiên:</strong> {task.priority}</p>
        <p><strong>Số giờ:</strong> {task.hours}</p>
        <p>
          <strong>Trạng thái:</strong>{' '}
          {task.done ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
        </p>
        <p>Thời gian trên trang: {seconds} giây</p>
      </main>
    );
  }

  return (
    <main className="container">
      <nav className="navbar">
        <a href="/" className="active">Trang chủ</a>
        <a href="/login">Đăng nhập</a>
      </nav>

      <h1>Quản lý Công việc nhóm</h1>

      <section className="stats">
        <div className="stat-card">
          <h3>Tổng công việc</h3>
          <p>{tasks.length}</p>
        </div>
        <div className="stat-card">
          <h3>Chưa hoàn thành</h3>
          <p>{pendingCount}</p>
        </div>
        <div className="stat-card">
          <h3>Đã hoàn thành</h3>
          <p>{completedCount}</p>
        </div>
      </section>

      <p>Tổng số giờ dự kiến: <strong>{totalHours}</strong> giờ</p>

      <h2>Thêm công việc</h2>

      <form onSubmit={handleAddTask} noValidate>
        <div className="form-group">
          <label htmlFor="title">Tên công việc *</label>
          <input
            id="title"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
            placeholder="Nhập tên công việc"
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="assignee">Người phụ trách *</label>
          <input
            id="assignee"
            name="assignee"
            value={newTask.assignee}
            onChange={handleInputChange}
            placeholder="Nhập tên người phụ trách"
          />
          {errors.assignee && <p className="error">{errors.assignee}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="priority">Mức độ ưu tiên</label>
          <select
            id="priority"
            name="priority"
            value={newTask.priority}
            onChange={handleInputChange}
          >
            {PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="hours">Số giờ (1–40) *</label>
          <input
            id="hours"
            name="hours"
            type="number"
            value={newTask.hours}
            onChange={handleInputChange}
            placeholder="Ví dụ: 5"
          />
          {errors.hours && <p className="error">{errors.hours}</p>}
        </div>

        <button type="submit">Thêm công việc</button>
      </form>

      <h2>Danh sách công việc</h2>

      <div className="filter-bar">
        <div>
          <label htmlFor="search">Tìm kiếm</label>
          <input
            id="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Nhập tên công việc hoặc người phụ trách"
          />
          {search && visibleTasks.length === 0 && (
            <p>Không có dữ liệu</p>
          )}
        </div>

        <div>
          <label htmlFor="filter">Lọc mức độ ưu tiên</label>
          <select
            id="filter"
            value={priorityFilter}
            onChange={(event) => setPriorityFilter(event.target.value)}
          >
            <option value="Tất cả">Tất cả</option>
            {PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p>Số công việc phù hợp: {visibleTasks.length}</p>

      <table>
        <thead>
          <tr>
            <th>Mã</th>
            <th>Tên công việc</th>
            <th>Người phụ trách</th>
            <th>Ưu tiên</th>
            <th>Số giờ</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {visibleTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td className={task.done ? 'completed' : ''}>
                <a href={`/tasks/${task.id}`}>{task.title}</a>
              </td>
              <td>{task.assignee}</td>
              <td>{task.priority}</td>
              <td>{task.hours}</td>
              <td>{task.done ? 'Đã hoàn thành' : 'Chưa hoàn thành'}</td>
              <td>
                <button onClick={() => toggleTask(task.id)}>
                  {task.done ? 'Làm lại' : 'Hoàn thành'}
                </button>
                <button onClick={() => deleteTask(task.id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}

          {visibleTasks.length === 0 && (
            <tr>
              <td colSpan="7">Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}

export default App;
