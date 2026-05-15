import {
  IconSales,
  IconCost,
  IconNetSales,
  IconCart,
  IconTrendUp,
  IconBox,
} from "../assets/icons";
import { topSellingProducts, lowStockProducts } from "../data/mockData";
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import DonutChart from "../components/DonutChart";
import "../styles/dashboard.css";
import "../styles/topbar.css";
const STAT_CARDS = [
  {
    label: "Total Sales",
    value: "250,000.00",
    icon: IconSales,
    trend: "+12.5%",
    up: true,
  },
  {
    label: "Total Cost",
    value: "50,000.00",
    icon: IconCost,
    trend: "+3.2%",
    up: true,
  },
  {
    label: "Total Net Sales",
    value: "200,000.00",
    icon: IconNetSales,
    trend: "+9.8%",
    up: true,
  },
  {
    label: "Number of Orders",
    value: "893",
    icon: IconCart,
    trend: "+5.1%",
    up: true,
  },
];

const PAYMENT_COLORS = [
  "#22c55e",
  "#22c55e",
  "#22c55e",
  "#f59e0b",
  "#3b82f6",
  "#ef4444",
];

export default function DashboardPage() {
  return (
    <div className="dashboard">
      <div className="stats-grid">
        {STAT_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div className="stat-card" key={card.label}>
              <div className="stat-card-info">
                <span className="stat-card-label">{card.label}</span>
                <span className="stat-card-value">{card.value}</span>
              </div>
              <div className="stat-card-icon-wrap">
                <Icon size={22} color="#fff" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="dashboard-main">
        <div className="dashboard-left">
          <div className="chart-card">
            <div className="chart-card-header">
              <span className="chart-card-title">Daily Sales</span>
            </div>
            <div className="chart-wrap" style={{ height: 200 }}>
              <LineChart />
            </div>
          </div>
          <div className="chart-card">
            <div className="chart-card-header">
              <span className="chart-card-title">Top Categories</span>
            </div>
            <div className="chart-wrap" style={{ height: 200 }}>
              <BarChart />
            </div>
          </div>
          <div className="table-card">
            <div className="table-card-header">
              <span className="table-card-title">Top Selling Product</span>
              <select className="table-rows-select">
                <option>5</option>
                <option>10</option>
                <option>20</option>
              </select>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity Sold</th>
                  <th>Price</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {topSellingProducts.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div className="product-name-cell">
                        <div className="product-icon-sm">
                          <IconBox size={13} color="#6b7280" />
                        </div>
                        {p.name}
                      </div>
                    </td>
                    <td>{p.qtySold.toLocaleString()}</td>
                    <td>&#8369; {p.price.toFixed(2)}</td>
                    <td>
                      &#8369;{" "}
                      {p.total.toLocaleString("en", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dashboard-right">
          <div className="chart-card">
            <div className="chart-card-header">
              <span className="chart-card-title">Payments</span>
            </div>
            <div className="payments-bar">
              <div className="payments-bar-inner">
                {[55, 8, 22, 15].map((w, i) => (
                  <div
                    key={i}
                    style={{
                      flex: w,
                      background: ["#22c55e", "#f59e0b", "#3b82f6", "#ef4444"][
                        i
                      ],
                      height: "100%",
                    }}
                  />
                ))}
              </div>
              <div className="payments-legend">
                {["Paid", "Partial", "Unpaid", "Overdue"].map((label, i) => (
                  <span key={label} className="payments-legend-item">
                    <span
                      className="payments-legend-dot"
                      style={{
                        background: [
                          "#22c55e",
                          "#f59e0b",
                          "#3b82f6",
                          "#ef4444",
                        ][i],
                      }}
                    />
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <div className="chart-card-header" style={{ marginTop: 20 }}>
              <span className="chart-card-title">Payment Type</span>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <DonutChart />
            </div>
          </div>
          <div className="table-card">
            <div className="table-card-header">
              <span className="table-card-title">Low Stock Product</span>
              <select className="table-rows-select">
                <option>5</option>
                <option>10</option>
              </select>
            </div>
            <table className="data-table">
              <tbody>
                {lowStockProducts.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div className="product-name-cell">
                        <div className="product-icon-sm">
                          <IconBox size={13} color="#6b7280" />
                        </div>
                        {p.name}
                      </div>
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        color:
                          p.stock <= 5
                            ? "var(--color-danger)"
                            : "var(--color-warning)",
                        fontWeight: 600,
                      }}
                    >
                      {p.stock}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
