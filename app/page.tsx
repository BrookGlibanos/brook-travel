import Link from "next/link";

export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0A1628, #1A3A6B)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "sans-serif",
      color: "white",
      textAlign: "center",
      padding: "40px",
    }}>
      <div>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✈</div>
        <h1 style={{ fontSize: 48, fontWeight: 300, marginBottom: 16 }}>
          Brook  Travel
        </h1>
        <p style={{ fontSize: 18, opacity: 0.7, marginBottom: 32 }}>
          Book International Flights With Confidence
        </p>
        <p style={{ 
          background: "rgba(201,168,76,0.2)", 
          border: "1px solid rgba(201,168,76,0.4)",
          padding: "12px 24px", 
          borderRadius: 8,
          color: "#C9A84C",
          fontSize: 14,
        }}>
          🚀 Website is live and running!
        </p>
      </div>
    </main>
  );
}