
export default function Home({ tasks }) {
  const totalTasks = tasks.length;

  const completedTasks = tasks.reduce(
    (total, task) =>
      task.done ? total + 1 : total,
    0
  );

  const remainingHours = tasks.reduce(
    (total, task) =>
      task.done ? total : total + task.hours,
    0
  );

  return (
    <main>
      <h1>Công việc nhóm</h1>

      <p>
        Tổng số công việc: {totalTasks}
      </p>

      <p>
        Số công việc đã xong: {completedTasks}
      </p>

      <p>
        Tổng số giờ còn lại: {remainingHours}
      </p>
    </main>
  );
}
