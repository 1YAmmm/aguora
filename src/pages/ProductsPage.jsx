import { useMemo, useState } from "react";
import { products } from "../data/mockData";
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

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [showFormModal, setShowFormModal] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        activeStatus === "All" ||
        p.status?.toLowerCase() === activeStatus.toLowerCase();

      return matchSearch && matchStatus;
    });
  }, [search, activeStatus]);

  const totalPages = Math.ceil(filtered.length / pageSize);

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

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

  function handleSubmitModal() {
    setShowFormModal(false);
  }

  return (
    <div className="page-container">
      {/* PRODUCT MODAL */}

      <Modal
        open={showFormModal}
        onClose={() => setShowFormModal(false)}
        title="Add Product"
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
            <label>Product Name</label>

            <input type="text" placeholder="Product Name" />
          </div>

          <div className="customer-form-group">
            <label>Category</label>

            <input type="text" placeholder="Category" />
          </div>

          <div className="customer-form-group">
            <label>Price</label>

            <input type="number" placeholder="0.00" />
          </div>

          <div className="customer-form-group">
            <label>Stock on Hand</label>

            <input type="number" placeholder="0" />
          </div>
        </div>
      </Modal>

      {/* HEADER */}

      <div className="page-header">
        <h1 className="page-title">Product List</h1>
      </div>

      {/* TABLE CARD */}

      <div className="table-card">
        {/* TOOLBAR */}

        <div className="page-toolbar">
          <div className="search-bar">
            <input
              className="search-input"
              placeholder="Search Product"
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
            Add Product
          </button>
        </div>

        {/* STATUS TABS */}

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
                    Product
                    <IconChevronDown size={13} color="#9ca3af" />
                  </div>
                </th>

                <th>Category</th>

                <th>Price</th>

                <th>Stock on Hand</th>

                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {paginated.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="product-cell">
                      <div className="product-image">
                        <img
                          src={p.image}
                          alt={p.name}
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      </div>

                      <span>{p.name}</span>
                    </div>
                  </td>

                  <td>{p.category}</td>

                  <td>
                    ₱{" "}
                    {Number(p.price).toLocaleString("en-PH", {
                      minimumFractionDigits: 2,
                    })}
                  </td>

                  <td>{p.stock || 100}</td>

                  <td>
                    <div className="status-cell">
                      <span
                        className={`status-dot ${
                          p.status === "inactive" ? "inactive" : "active"
                        }`}
                      />

                      <span className="status-text">
                        {p.status === "inactive" ? "Inactive" : "Active"}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}

              {paginated.length === 0 && (
                <tr>
                  <td colSpan={5} className="empty-state">
                    No products found
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
