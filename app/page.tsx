export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #04142d, #1a2f6b)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        padding: 20,
      }}
    >
      <div>
        <div
          style={{
            fontSize: 60,
            marginBottom: 20,
          }}
        >
          ✈️
        </div>

        <h1
          style={{
            fontSize: 64,
            marginBottom: 10,
            fontWeight: "bold",
          }}
        >
          Brook Travel
        </h1>

        <p
          style={{
            fontSize: 24,
            opacity: 0.85,
            marginBottom: 40,
          }}
        >
          Book International Flights With Confidence
        </p>

        <button
          style={{
            background: "#f5b942",
            color: "#000",
            border: "none",
            padding: "16px 36px",
            borderRadius: 10,
            fontSize: 18,
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Search Flights
        </button>
      </div>
    </main>
  );
}