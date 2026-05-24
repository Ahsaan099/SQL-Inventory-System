export default function StatCard({ icon: Icon, label, value, color, sub }) {
  return (
    <div style={{
      background: "black",
      border: `1px solid ${color}33`,
      borderRadius: 14, padding: "18px 22px",
      backdropFilter: "blur(12px)",
      position: "relative", overflow: "hidden",
      flex: 1, minWidth: 140,
    }}>
      <div style={{
        position: "absolute", top: -20, right: -20,
        width: 80, height: 80, borderRadius: "50%",
        background: `${color}18`,
      }} />
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <div style={{ background: `${color}22`, borderRadius: 8, padding: 8 }}>
          <Icon size={16} color={color} />
        </div>
        <span style={{ color: "#64748b", fontSize: 12, letterSpacing: "0.05em", textTransform: "uppercase" }}>
          {label}
        </span>
      </div>
      <div style={{ color: "#f1f5f9", fontSize: 26, fontWeight: 700, fontFamily: "monospace" }}>
        {value}
      </div>
      {sub && <div style={{ color: "#475569", fontSize: 12, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}
