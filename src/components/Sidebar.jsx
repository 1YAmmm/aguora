import { NavLink, useNavigate } from "react-router-dom";
import {
  LogoIcon,
  IconDashboard,
  IconOrders,
  IconCustomers,
  IconProduct,
  IconReports,
  IconLogout,
  IconChevronRight,
  IconMenu,
} from "../assets/icons";
import "../styles/sidebar.css";
import aguora from "../assets/images/aguora.png";
const NAV_ITEMS = [
  { label: "Dashboard", path: "/dashboard", icon: IconDashboard },
  { label: "Order List", path: "/dashboard/orders", icon: IconOrders },
  { label: "Customer List", path: "/dashboard/customers", icon: IconCustomers },
  {
    label: "Product",
    path: "/dashboard/products",
    icon: IconProduct,
    children: [{ label: "Product List", path: "/dashboard/products" }],
  },
  {
    label: "Reports",
    path: "/dashboard/reports",
    icon: IconReports,
    children: [{ label: "Sales Report", path: "/dashboard/reports" }],
  },
];

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();

  function handleLogout() {
    navigate("/login");
  }
  function handleGotoProfile() {
    navigate("/dashboard/profile");
  }
  return (
    <>
      {open && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <img
              src={aguora}
              alt=""
              style={{ width: "80px", height: "auto" }}
            />
          </div>
          <button
            className="sidebar-toggle-btn"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <IconMenu />
          </button>
        </div>
        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <SidebarItem key={item.path} item={item} />
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-user" onClick={handleGotoProfile}>
            <div className="sidebar-avatar">JS</div>
            <div className="sidebar-user-info ">
              <span className="sidebar-user-name">John Santos</span>
              <span className="sidebar-user-role">Admin</span>
            </div>
          </div>
          <button
            className="sidebar-logout"
            onClick={handleLogout}
            title="Logout"
          >
            <IconLogout size={17} />
          </button>
        </div>
      </aside>
    </>
  );
}

function SidebarItem({ item }) {
  const Icon = item.icon;
  if (!item.children) {
    return (
      <NavLink
        to={item.path}
        end={item.path === "/dashboard"}
        className={({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`}
      >
        <span className="sidebar-item-icon">
          <Icon size={17} />
        </span>
        <span className="sidebar-item-label">{item.label}</span>
      </NavLink>
    );
  }
  return (
    <NavLink
      to={item.path}
      className={({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`}
    >
      <span className="sidebar-item-icon">
        <Icon size={17} />
      </span>
      <span className="sidebar-item-label">{item.label}</span>
      <IconChevronRight size={14} color="currentColor" />
    </NavLink>
  );
}
