import { useState, useMemo } from "react";
import { orders } from "../data/mockData";
import { NavLink, useNavigate } from "react-router-dom";
import {
  IconSearch,
  IconPlus,
  IconChevronLeft,
  IconChevronRight,
  IconChevronDown,
} from "../assets/icons";
import "../styles/table-page.css";

const STATUSES = [
  "All",
  "Unpaid",
  "Partial",
  "Paid",
  "Overdue",
  "Draft",
  "Cancelled",
];
const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

export default function OrdersPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  function handleGotoAddOrdersPage() {
    navigate("/dashboard/orders/addorders");
  }
  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchStatus =
        activeStatus === "All" || o.status === activeStatus.toLowerCase();
      const matchSearch =
        o.orderNo.includes(search) ||
        o.paymentType.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [search, activeStatus]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  function handleStatusChange(s) {
    setActiveStatus(s);
    setPage(1);
  }

  function getPageNumbers() {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("...");
      for (
        let i = Math.max(2, page - 1);
        i <= Math.min(totalPages - 1, page + 1);
        i++
      )
        pages.push(i);
      if (page < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  }

  return (
    <div className="page-container">
      <div className="page-toolbar">
        <div className="search-bar">
          <IconSearch size={15} color="#9ca3af" />
          <input
            className="search-input"
            placeholder="Search Order"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <button className="btn-primary" onClick={handleGotoAddOrdersPage}>
          <IconPlus size={15} color="#fff" />
          Add Order
        </button>
      </div>

      <div className="status-tabs">
        {STATUSES.map((s) => (
          <button
            key={s}
            className={`status-tab ${activeStatus === s ? "active" : ""}`}
            onClick={() => handleStatusChange(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="table-wrap">
        <table className="main-table">
          <thead>
            <tr>
              <th>
                <div className="th-sortable">
                  Order No.
                  <IconChevronDown size={13} color="#9ca3af" />
                </div>
              </th>
              <th>Order Date</th>
              <th>Customer</th>
              <th>Payment Type</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((order) => (
              <tr key={order.id}>
                <td className="mono">{order.orderNo}</td>
                <td>{order.date}</td>
                <td>{order.customer}</td>
                <td>{order.paymentType}</td>
                <td className="mono">
                  {order.total.toLocaleString("en", {
                    minimumFractionDigits: 2,
                  })}
                </td>
                <td>
                  <span className={`badge ${order.status}`}>
                    <span className="badge-dot" />
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  style={{
                    textAlign: "center",
                    padding: "32px",
                    color: "#9ca3af",
                  }}
                >
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <div className="pagination-left">
          <select
            className="page-size-select"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
          >
            {PAGE_SIZE_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <span className="pagination-info">
            {(page - 1) * pageSize + 1} -{" "}
            {Math.min(page * pageSize, filtered.length)} of {filtered.length}
          </span>
        </div>
        <div className="pagination-right">
          <button
            className="page-btn"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            <IconChevronLeft size={14} />
          </button>
          {getPageNumbers().map((p, i) =>
            p === "..." ? (
              <span key={`ellipsis-${i}`} className="page-ellipsis">
                ...
              </span>
            ) : (
              <button
                key={p}
                className={`page-btn ${page === p ? "active" : ""}`}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ),
          )}
          <button
            className="page-btn"
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage((p) => p + 1)}
          >
            <IconChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
