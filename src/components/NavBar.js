
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to="/" end>
        Trang chủ
      </NavLink>

      <NavLink to="/tasks" end>
        Danh sách
      </NavLink>

      <NavLink to="/tasks/new" end>
        Thêm mới
      </NavLink>
    </nav>
  );
}
