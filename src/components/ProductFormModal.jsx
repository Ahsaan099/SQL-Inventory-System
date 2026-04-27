import { Edit3, Plus, X } from "lucide-react";
import { CATEGORIES, getStatus } from "../data/products";

export default function ProductFormModal({ editId, form, setForm, errors, onSave, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 500,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "rgba(10,16,32,0.97)",
          border: "1px solid rgba(99,179,237,0.25)",
          borderRadius: 18, padding: "32px 36px",
          width: 480, maxWidth: "95vw",
          boxShadow: "0 0 80px rgba(124,58,237,0.15)",
          animation: "modalIn 0.25s ease",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <div style={{ background: "linear-gradient(135deg,#1e40af,#7c3aed)", borderRadius: 9, padding: 8 }}>
            {editId ? <Edit3 size={16} color="white" /> : <Plus size={16} color="white" />}
          </div>
          <h2 style={{ color: "#f1f5f9", fontSize: 17, fontWeight: 600 }}>
            {editId ? "Edit Product" : "Add New Product"}
          </h2>
          <button onClick={onClose} className="action-btn" style={{ marginLeft: "auto" }}>
            <X size={16} color="#64748b" />
          </button>
        </div>

        {/* Fields */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {/* Name */}
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ display: "block", color: "#64748b", fontSize: 12, marginBottom: 6 }}>
              Product Name *
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. MacBook Pro"
              className={`form-input${errors.name ? " err" : ""}`}
            />
            {errors.name && <span style={{ color: "#f87171", fontSize: 11, marginTop: 4, display: "block" }}>{errors.name}</span>}
          </div>

          {/* Category */}
          <div>
            <label style={{ display: "block", color: "#64748b", fontSize: 12, marginBottom: 6 }}>Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className="form-input"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c} style={{ background: "#0a1628" }}>{c}</option>
              ))}
            </select>
          </div>

          {/* SKU */}
          <div>
            <label style={{ display: "block", color: "#64748b", fontSize: 12, marginBottom: 6 }}>SKU *</label>
            <input
              value={form.sku}
              onChange={(e) => setForm((f) => ({ ...f, sku: e.target.value }))}
              placeholder="e.g. MBP-001"
              className={`form-input${errors.sku ? " err" : ""}`}
            />
            {errors.sku && <span style={{ color: "#f87171", fontSize: 11, marginTop: 4, display: "block" }}>{errors.sku}</span>}
          </div>

          {/* Quantity */}
          <div>
            <label style={{ display: "block", color: "#64748b", fontSize: 12, marginBottom: 6 }}>Quantity *</label>
            <input
              type="number" min="0"
              value={form.quantity}
              onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))}
              placeholder="0"
              className={`form-input${errors.quantity ? " err" : ""}`}
            />
            {errors.quantity && <span style={{ color: "#f87171", fontSize: 11, marginTop: 4, display: "block" }}>{errors.quantity}</span>}
            {form.quantity !== "" && !isNaN(form.quantity) && (
              <span style={{
                fontSize: 11, marginTop: 4, display: "block",
                color: getStatus(Number(form.quantity)) === "out" ? "#f87171"
                     : getStatus(Number(form.quantity)) === "low" ? "#fbbf24" : "#4ade80",
              }}>
                → {getStatus(Number(form.quantity)) === "out" ? "Will be Out of Stock"
                   : getStatus(Number(form.quantity)) === "low" ? "Will be Low Stock" : "In Stock"}
              </span>
            )}
          </div>

          {/* Price */}
          <div>
            <label style={{ display: "block", color: "#64748b", fontSize: 12, marginBottom: 6 }}>Price (₨) *</label>
            <input
              type="number" min="1"
              value={form.price}
              onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
              placeholder="0"
              className={`form-input${errors.price ? " err" : ""}`}
            />
            {errors.price && <span style={{ color: "#f87171", fontSize: 11, marginTop: 4, display: "block" }}>{errors.price}</span>}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 10, marginTop: 24, justifyContent: "flex-end" }}>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 10, color: "#64748b", padding: "10px 22px",
              cursor: "pointer", fontSize: 14, fontFamily: "inherit",
            }}
          >
            Cancel
          </button>
          <button onClick={onSave} className="save-btn">
            {editId ? "Save Changes" : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
}
