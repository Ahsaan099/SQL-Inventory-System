import { getStatus } from "../data/products";

export default function StatusBadge({ qty }) {
  const s = getStatus(qty);
  const styles = {
    out: { bg: "rgba(220,38,38,0.15)", color: "#f87171", border: "rgba(220,38,38,0.3)", text: "Out of Stock" },
    low: { bg: "rgba(217,119,6,0.15)", color: "#fbbf24", border: "rgba(217,119,6,0.3)", text: "Low Stock" },
    ok:  { bg: "rgba(34,197,94,0.1)",  color: "#4ade80", border: "rgba(34,197,94,0.25)", text: "In Stock" },
  }[s];

  return (
    <span style={{
      background: styles.bg, color: styles.color,
      border: `1px solid ${styles.border}`,
      borderRadius: 20, padding: "3px 10px",
      fontSize: 11, fontWeight: 600, letterSpacing: "0.04em",
      display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap",
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: styles.color, display: "inline-block" }} />
      {styles.text}
    </span>
  );
}
