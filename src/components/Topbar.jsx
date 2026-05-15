import { useLocation } from "react-router-dom";
import { IconMenu } from "../assets/icons";
import "../styles/topbar.css";

const PAGE_TITLES = {
  "/dashboard": "Dashboard",
  "/dashboard/orders": "Order List",
  "/dashboard/orders/addorders": "Add Orders",
  "/dashboard/customers": "Customer List",
  "/dashboard/products": "Product",
  "/dashboard/reports": "Reports",
  "/dashboard/profile": "Admin Profile",
};

export default function Topbar({ onMenuClick }) {
  const location = useLocation();
  const title = PAGE_TITLES[location.pathname] || "Dashboard";

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="topbar-menu-btn"
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <IconMenu size={20} />
        </button>
        <h1 className="topbar-title">{title}</h1>
      </div>
    </header>
  );
}
