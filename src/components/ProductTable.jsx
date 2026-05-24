import { Edit3, Trash2, Database } from "lucide-react";
import { Package } from "lucide-react";
import { getStatus } from "../data/products";
import StatusBadge from "./StatusBadge";

function rowBg(p) {
  const s = getStatus(p.quantity);

  if (s === "out") return "rgba(220,38,38,0.12)";
  if (s === "low") return "rgba(217,119,6,0.12)";

  return "#111111";
}

function rowBorder(p) {
  const s = getStatus(p.quantity);

  if (s === "out") return "#dc2626";
  if (s === "low") return "#d97706";

  return "#222";
}

export default function ProductTable({
  filtered,
  animNew,
  onEdit,
  onDelete,
  onQtyChange,
  onSqlPreview,
}) {
  const headers = [
    "SKU",
    "Product",
    "Category",
    "Quantity",
    "Price",
    "Status",
    "Actions",
  ];

  return (
    <div
      style={{
        overflowX: "auto",
        background: "#000",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#000",
        }}
      >
        {/* HEADER */}

        <thead>
          <tr
            style={{
              borderBottom: "1px solid #222",
              background: "#0a0a0a",
            }}
          >
            {headers.map((h) => (
              <th
                key={h}
                style={{
                  padding: "14px 20px",
                  textAlign: "left",
                  color: "#888",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        {/* BODY */}

        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                style={{
                  padding: "48px",
                  textAlign: "center",
                  color: "#888",
                  background: "#000",
                }}
              >
                <Package
                  size={32}
                  color="#666"
                  style={{
                    margin: "0 auto 12px",
                    display: "block",
                  }}
                />

                No products found
              </td>
            </tr>
          ) : (
            filtered.map((p, idx) => (
              <tr
                key={p.id}
                className={`product-row${
                  p.id === animNew ? " new-row" : ""
                }`}
                style={{
                  background: rowBg(p),
                  borderLeft: `3px solid ${rowBorder(p)}`,
                  borderBottom: "1px solid #1a1a1a",
                  animation: `fadeSlideIn 0.3s ease ${
                    Math.min(idx, 8) * 0.04
                  }s both`,
                }}
              >
                {/* SKU */}

                <td
                  style={{
                    padding: "14px 20px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: 12,
                      color: "#bbb",
                      background: "#1a1a1a",
                      padding: "3px 8px",
                      borderRadius: 5,
                    }}
                  >
                    {p.sku}
                  </span>
                </td>

                {/* NAME */}

                <td
                  style={{
                    padding: "14px 20px",
                    color: "#fff",
                    fontWeight: 500,
                  }}
                >
                  {p.name}
                </td>

                {/* CATEGORY */}

                <td
                  style={{
                    padding: "14px 20px",
                  }}
                >
                  <span
                    style={{
                      color: "#fff",
                      background: "#222",
                      padding: "4px 10px",
                      borderRadius: 6,
                      fontSize: 12,
                    }}
                  >
                    {p.category}
                  </span>
                </td>

                {/* QUANTITY */}

                <td
                  style={{
                    padding: "10px 20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <button
                      className="qty-btn"
                      disabled={p.quantity === 0}
                      onClick={() => onQtyChange(p.id, -1)}
                      style={{
                        background: "#1a1a1a",
                        border: "1px solid #333",
                        color: "#fff",
                        width: 28,
                        height: 28,
                        borderRadius: 6,
                        cursor: "pointer",
                      }}
                    >
                      −
                    </button>

                    <span
                      key={p.quantity}
                      style={{
                        fontFamily: "monospace",
                        fontWeight: 700,
                        fontSize: 16,
                        minWidth: 32,
                        textAlign: "center",
                        display: "inline-block",
                        color:
                          getStatus(p.quantity) === "out"
                            ? "#f87171"
                            : getStatus(p.quantity) === "low"
                            ? "#fbbf24"
                            : "#4ade80",
                        animation: "qtyPop 0.2s ease",
                      }}
                    >
                      {p.quantity}
                    </span>

                    <button
                      className="qty-btn"
                      onClick={() => onQtyChange(p.id, +1)}
                      style={{
                        background: "#1a1a1a",
                        border: "1px solid #333",
                        color: "#fff",
                        width: 28,
                        height: 28,
                        borderRadius: 6,
                        cursor: "pointer",
                      }}
                    >
                      +
                    </button>
                  </div>
                </td>

                {/* PRICE */}

                <td
                  style={{
                    padding: "14px 20px",
                    color: "#d4d4d4",
                    fontFamily: "monospace",
                  }}
                >
                  ₨{p.price.toLocaleString()}
                </td>

                {/* STATUS */}

                <td
                  style={{
                    padding: "14px 20px",
                  }}
                >
                  <StatusBadge qty={p.quantity} />
                </td>

                {/* ACTIONS */}

                <td
                  style={{
                    padding: "14px 20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 4,
                    }}
                  >
                    <button
                      className="action-btn"
                      onClick={() => onEdit(p)}
                      title="Edit"
                      style={{
                        background: "#111",
                        border: "1px solid #222",
                        width: 34,
                        height: 34,
                        borderRadius: 8,
                        cursor: "pointer",
                      }}
                    >
                      <Edit3 size={15} color="#60a5fa" />
                    </button>

                    <button
                      className="action-btn"
                      onClick={() => onDelete(p.id)}
                      title="Delete"
                      style={{
                        background: "#111",
                        border: "1px solid #222",
                        width: 34,
                        height: 34,
                        borderRadius: 8,
                        cursor: "pointer",
                      }}
                    >
                      <Trash2 size={15} color="#f87171" />
                    </button>

                    <button
                      className="action-btn"
                      onClick={() => onSqlPreview(p)}
                      title="View SQL"
                      style={{
                        background: "#111",
                        border: "1px solid #222",
                        width: 34,
                        height: 34,
                        borderRadius: 8,
                        cursor: "pointer",
                      }}
                    >
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
