import { Edit3, Plus, X } from "lucide-react";
import { CATEGORIES, getStatus } from "../data/products";

export default function ProductFormModal({
  editId,
  form,
  setForm,
  errors,
  onSave,
  onClose,
}) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#000",
          border: "1px solid #222",
          borderRadius: 18,
          padding: "32px 36px",
          width: 480,
          maxWidth: "95vw",
          boxShadow: "0 0 40px rgba(255,255,255,0.08)",
          animation: "modalIn 0.25s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              background: "#111",
              borderRadius: 9,
              padding: 8,
              border: "1px solid #222",
            }}
          >
            {editId ? (
              <Edit3 size={16} color="white" />
            ) : (
              <Plus size={16} color="white" />
            )}
          </div>

          <h2
            style={{
              color: "#fff",
              fontSize: 17,
              fontWeight: 600,
            }}
          >
            {editId ? "Edit Product" : "Add New Product"}
          </h2>

          <button
            onClick={onClose}
            style={{
              marginLeft: "auto",
              background: "#111",
              border: "1px solid #222",
              width: 34,
              height: 34,
              borderRadius: 8,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={16} color="#fff" />
          </button>
        </div>


        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
          }}
        >

          <div style={{ gridColumn: "1 / -1" }}>
            <label
              style={{
                display: "block",
                color: "#fff",
                fontSize: 12,
                marginBottom: 6,
              }}
            >
              Product Name *
            </label>

            <input
              value={form.name}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  name: e.target.value,
                }))
              }
              placeholder="e.g. MacBook Pro"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: 10,
                background: "#111",
                color: "#fff",
                border: "1px solid #333",
                outline: "none",
                fontSize: 14,
              }}
            />

            {errors.name && (
              <span
                style={{
                  color: "#f87171",
                  fontSize: 11,
                  marginTop: 4,
                  display: "block",
                }}
              >
                {errors.name}
              </span>
            )}
          </div>


          <div>
            <label
              style={{
                display: "block",
                color: "#fff",
                fontSize: 12,
                marginBottom: 6,
              }}
            >
              Category
            </label>

            <select
              value={form.category}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  category: e.target.value,
                }))
              }
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: 10,
                background: "#111",
                color: "#fff",
                border: "1px solid #333",
                outline: "none",
                fontSize: 14,
              }}
            >
              {CATEGORIES.map((c) => (
                <option
                  key={c}
                  value={c}
                  style={{
                    background: "#000",
                    color: "#fff",
                  }}
                >
                  {c}
                </option>
              ))}
            </select>
          </div>


          <div>
            <label
              style={{
                display: "block",
                color: "#fff",
                fontSize: 12,
                marginBottom: 6,
              }}
            >
              SKU *
            </label>

            <input
              value={form.sku}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  sku: e.target.value,
                }))
              }
              placeholder="e.g. MBP-001"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: 10,
                background: "#111",
                color: "#fff",
                border: "1px solid #333",
                outline: "none",
                fontSize: 14,
              }}
            />

            {errors.sku && (
              <span
                style={{
                  color: "#f87171",
                  fontSize: 11,
                  marginTop: 4,
                  display: "block",
                }}
              >
                {errors.sku}
              </span>
            )}
          </div>


          <div>
            <label
              style={{
                display: "block",
                color: "#fff",
                fontSize: 12,
                marginBottom: 6,
              }}
            >
              Quantity *
            </label>

            <input
              type="number"
              min="0"
              value={form.quantity}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  quantity: e.target.value,
                }))
              }
              placeholder="0"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: 10,
                background: "#111",
                color: "#fff",
                border: "1px solid #333",
                outline: "none",
                fontSize: 14,
              }}
            />

            {errors.quantity && (
              <span
                style={{
                  color: "#f87171",
                  fontSize: 11,
                  marginTop: 4,
                  display: "block",
                }}
              >
                {errors.quantity}
              </span>
            )}

            {form.quantity !== "" &&
              !isNaN(form.quantity) && (
                <span
                  style={{
                    fontSize: 11,
                    marginTop: 4,
                    display: "block",
                    color:
                      getStatus(Number(form.quantity)) ===
                      "out"
                        ? "#f87171"
                        : getStatus(
                            Number(form.quantity)
                          ) === "low"
                        ? "#fbbf24"
                        : "#4ade80",
                  }}
                >
                  →
                  {getStatus(Number(form.quantity)) ===
                  "out"
                    ? " Will be Out of Stock"
                    : getStatus(
                        Number(form.quantity)
                      ) === "low"
                    ? " Will be Low Stock"
                    : " In Stock"}
                </span>
              )}
          </div>


          <div>
            <label
              style={{
                display: "block",
                color: "#fff",
                fontSize: 12,
                marginBottom: 6,
              }}
            >
              Price (₨) *
            </label>

            <input
              type="number"
              min="1"
              value={form.price}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  price: e.target.value,
                }))
              }
              placeholder="0"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: 10,
                background: "#111",
                color: "#fff",
                border: "1px solid #333",
                outline: "none",
                fontSize: 14,
              }}
            />

            {errors.price && (
              <span
                style={{
                  color: "#f87171",
                  fontSize: 11,
                  marginTop: 4,
                  display: "block",
                }}
              >
                {errors.price}
              </span>
            )}
          </div>
        </div>


        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: 24,
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={onClose}
            style={{
              background: "#111",
              border: "1px solid #333",
              borderRadius: 10,
              color: "#fff",
              padding: "10px 22px",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            style={{
              background: "#fff",
              border: "none",
              borderRadius: 10,
              color: "#000",
              padding: "10px 22px",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            {editId ? "Save Changes" : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
}
