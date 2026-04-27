import { useState } from "react";
import { Database, X, Check } from "lucide-react";

export default function SqlModal({ query, action, onClose }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(query);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "rgba(15,20,40,0.96)",
          border: "1px solid rgba(99,179,237,0.3)",
          borderRadius: 16, padding: "28px 32px",
          maxWidth: 560, width: "90%",
          boxShadow: "0 0 60px rgba(99,179,237,0.15)",
          animation: "modalIn 0.25s ease",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
          <Database size={18} color="#63b3ed" />
          <span style={{ color: "#63b3ed", fontWeight: 600, fontSize: 15, fontFamily: "monospace" }}>
            SQL Preview
          </span>
          <span style={{
            marginLeft: "auto", fontSize: 12, color: "#94a3b8",
            background: "rgba(99,179,237,0.1)", padding: "3px 10px",
            borderRadius: 20, border: "1px solid rgba(99,179,237,0.2)",
          }}>
            {action}
          </span>
          <button onClick={onClose} className="action-btn" style={{ marginLeft: 8 }}>
            <X size={16} color="#64748b" />
          </button>
        </div>

        {/* Query */}
        <pre style={{
          background: "rgba(0,0,0,0.5)", borderRadius: 10, padding: "16px 20px",
          color: "#7dd3fc", fontFamily: "'Fira Code', 'Cascadia Code', monospace",
          fontSize: 13, lineHeight: 1.7, overflowX: "auto", margin: 0,
          border: "1px solid rgba(99,179,237,0.15)",
        }}>
          {query}
        </pre>

        {/* Footer */}
        <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#475569", fontSize: 12 }}>
            * Sirf visualization — actual execution nahi hogi
          </span>
          <button
            onClick={copy}
            style={{
              background: copied ? "rgba(34,197,94,0.2)" : "rgba(99,179,237,0.1)",
              border: `1px solid ${copied ? "rgba(34,197,94,0.4)" : "rgba(99,179,237,0.3)"}`,
              borderRadius: 8, color: copied ? "#4ade80" : "#63b3ed",
              padding: "6px 16px", cursor: "pointer", fontSize: 13,
              display: "flex", gap: 6, alignItems: "center", fontFamily: "inherit",
            }}
          >
            {copied ? <><Check size={13} /> Copied!</> : "Copy SQL"}
          </button>
        </div>
      </div>
    </div>
  );
}
