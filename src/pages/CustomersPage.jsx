import { useState, useMemo } from "react";
import { customers } from "../data/mockData";
import {
  IconSearch,
  IconPlus,
  IconChevronLeft,
  IconChevronRight,
  IconChevronDown,
} from "../assets/icons";
import Modal from "../components/Modal";
import "../styles/table-page.css";

const STATUS_FILTERS = ["All", "Active", "Inactive"];
const PAGE_SIZE_OPTIONS = [10, 20, 50];

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showFormModal, setShowFormModal] = useState(false);
  const filtered = useMemo(() => {
    return customers.filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search);

      const matchStatus =
        activeStatus === "All" ||
        c.status.toLowerCase() === activeStatus.toLowerCase();

      return matchSearch && matchStatus;
    });
  }, [search, activeStatus]);

  const totalPages = Math.ceil(filtered.length / pageSize);

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  function handleSubmitModal() {
    setShowFormModal(false);
  }
  function getPageNumbers() {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (page > 3) pages.push("...");

      for (
        let i = Math.max(2, page - 1);
        i <= Math.min(totalPages - 1, page + 1);
        i++
      ) {
        pages.push(i);
      }

      if (page < totalPages - 2) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  }

  return (
    <div className="page-container">
      {/* ADD CUSTOMER MODAL */}
      <Modal
        open={showFormModal}
        onClose={() => setShowFormModal(false)}
        title="Edit Customer Information"
        size="sm"
        footer={
          <div className="customer-modal-footer">
            <button
              className="customer-cancel-btn"
              onClick={() => setShowFormModal(false)}
            >
              Cancel
            </button>

            <button className="customer-submit-btn" onClick={handleSubmitModal}>
              Submit
            </button>
          </div>
        }
      >
        <div className="customer-modal-content">
          <div className="customer-form-group">
            <label>Name</label>

            <input type="text" placeholder="Name" />
          </div>

          <div className="customer-form-group">
            <label>Address</label>

            <input type="text" placeholder="Address" />
          </div>

          <div className="customer-form-group">
            <label>Phone Number</label>

            <input type="text" placeholder="09XXXXXXXXX" />
          </div>

          <div className="customer-form-group">
            <label>E-mail Address</label>

            <input type="email" placeholder="Email" />
          </div>
        </div>
      </Modal>
      {/* HEADER */}
      <div className="page-header">
        <h1 className="page-title">Customer List</h1>
      </div>

      {/* TOOLBAR */}
      <div className="table-card">
        <div className="page-toolbar">
          <div className="search-bar">
            <input
              className="search-input"
              placeholder="Search Customer"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />

            <button className="search-btn">
              <IconSearch size={15} color="#0f172a" />
            </button>
          </div>

          <button
            className="btn-primary"
            onClick={() => setShowFormModal(true)}
          >
            <IconPlus size={15} color="#fff" />
            Add Customer
          </button>
        </div>

        {/* STATUS FILTER */}
        <div className="status-tabs">
          {STATUS_FILTERS.map((status) => (
            <button
              key={status}
              className={`status-tab ${
                activeStatus === status ? "active" : ""
              }`}
              onClick={() => {
                setActiveStatus(status);
                setPage(1);
              }}
            >
              {status}
            </button>
          ))}
        </div>

        {/* TABLE */}
        <div className="table-wrap">
          <table className="main-table">
            <thead>
              <tr>
                <th>
                  <div className="th-sortable">
                    Name
                    <IconChevronDown size={13} color="#9ca3af" />
                  </div>
                </th>

                <th>Address</th>

                <th>Phone Number</th>

                <th>Email Address</th>

                <th>Total Transaction</th>

                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {paginated.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>

                  <td>{c.address || "1066 Christie Way"}</td>

                  <td>{c.phone}</td>

                  <td>{c.email}</td>

                  <td>{c.transactions || 10}</td>

                  <td>
                    <div className="status-cell">
                      <span
                        className={`status-dot ${
                          c.status === "active" ? "active" : "inactive"
                        }`}
                      />

                      <span className="status-text">
                        {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}

              {paginated.length === 0 && (
                <tr>
                  <td colSpan={6} className="empty-state">
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
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
              {PAGE_SIZE_OPTIONS.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>

            <span className="pagination-info">
              {filtered.length === 0 ? 0 : (page - 1) * pageSize + 1} -{" "}
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
                <span key={i} className="page-ellipsis">
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
    </div>
  );
}
