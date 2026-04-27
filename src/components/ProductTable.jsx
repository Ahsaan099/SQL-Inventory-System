import { Edit3, Trash2, Database } from "lucide-react";
import { Package } from "lucide-react";
import { getStatus } from "../data/products";
import StatusBadge from "./StatusBadge";

function rowBg(p) {
  const s = getStatus(p.quantity);
  if (s === "out") return "rgba(220,38,38,0.08)";
  if (s === "low") return "rgba(217,119,6,0.08)";
  return "transparent";
}
function rowBorder(p) {
  const s = getStatus(p.quantity);
  if (s === "out") return "rgba(220,38,38,0.25)";
  if (s === "low") return "rgba(217,119,6,0.25)";
  return "transparent";
}

export default function ProductTable({ filtered, animNew, onEdit, onDelete, onQtyChange, onSqlPreview }) {
  const headers = ["SKU", "Product", "Category", "Quantity", "Price", "Status", "Actions"];

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            {headers.map((h) => (
              <th key={h} style={{
                padding: "14px 20px", textAlign: "left",
                color: "#475569", fontSize: 11, fontWeight: 600,
                letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap",
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={7} style={{ padding: "48px", textAlign: "center", color: "#334155" }}>
                <Package size={32} color="#334155" style={{ margin: "0 auto 12px", display: "block" }} />
                No products found
              </td>
            </tr>
          ) : (
            filtered.map((p, idx) => (
              <tr
                key={p.id}
                className={`product-row${p.id === animNew ? " new-row" : ""}`}
                style={{
                  background: rowBg(p),
                  borderLeft: `3px solid ${rowBorder(p)}`,
                  animation: `fadeSlideIn 0.3s ease ${Math.min(idx, 8) * 0.04}s both`,
                }}
              >
                {/* SKU */}
                <td style={{ padding: "14px 20px" }}>
                  <span style={{
                    fontFamily: "monospace", fontSize: 12, color: "#64748b",
                    background: "rgba(255,255,255,0.04)", padding: "3px 8px", borderRadius: 5,
                  }}>
                    {p.sku}
                  </span>
                </td>

                {/* Name */}
                <td style={{ padding: "14px 20px", color: "#e2e8f0", fontWeight: 500 }}>
                  {p.name}
                </td>

                {/* Category */}
                <td style={{ padding: "14px 20px" }}>
                  <span style={{
                    color: "#7dd3fc", background: "rgba(99,179,237,0.08)",
                    padding: "3px 10px", borderRadius: 6, fontSize: 12,
                  }}>
                    {p.category}
                  </span>
                </td>

                {/* Quantity — inline +/- counter */}
                <td style={{ padding: "10px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button
                      className="qty-btn"
                      disabled={p.quantity === 0}
                      onClick={() => onQtyChange(p.id, -1)}
                    >
                      −
                    </button>
                    <span
                      key={p.quantity}
                      style={{
                        fontFamily: "monospace", fontWeight: 700, fontSize: 16,
                        minWidth: 32, textAlign: "center", display: "inline-block",
                        color: getStatus(p.quantity) === "out" ? "#f87171"
                             : getStatus(p.quantity) === "low" ? "#fbbf24" : "#a3e635",
                        animation: "qtyPop 0.2s ease",
                      }}
                    >
                      {p.quantity}
                    </span>
                    <button className="qty-btn" onClick={() => onQtyChange(p.id, +1)}>+</button>
                  </div>
                </td>

                {/* Price */}
                <td style={{ padding: "14px 20px", color: "#94a3b8", fontFamily: "monospace" }}>
                  ₨{p.price.toLocaleString()}
                </td>

                {/* Status */}
                <td style={{ padding: "14px 20px" }}>
                  <StatusBadge qty={p.quantity} />
                </td>

                {/* Actions */}
                <td style={{ padding: "14px 20px" }}>
                  <div style={{ display: "flex", gap: 4 }}>
                    <button className="action-btn" onClick={() => onEdit(p)} title="Edit">
                      <Edit3 size={15} color="#63b3ed" />
                    </button>
                    <button className="action-btn" onClick={() => onDelete(p.id)} title="Delete">
                      <Trash2 size={15} color="#f87171" />
                    </button>
                    <button className="action-btn" onClick={() => onSqlPreview(p)} title="View SQL">
                      <Database size={15} color="#a78bfa" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
