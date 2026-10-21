
import { PRIORITIES } from "../data";

export default function FilterBar({
  query,
  setQuery,
  priority,
  setPriority
}) {
  return (
    <div className="filter-bar">
      <div>
        <label htmlFor="query">Tìm kiếm</label>

        <input
          id="query"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nhập tên công việc"
        />
      </div>

      <div>
        <label htmlFor="priority">Mức ưu tiên</label>

        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Tất cả">Tất cả</option>

          {PRIORITIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
