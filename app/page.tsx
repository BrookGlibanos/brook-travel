export default function Home() {
  const attractions = [
    {
      name: "Axum Tower",
      image:
        "https://images.unsplash.com/photo-1578922746465-3a80a228f223?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Pyramids of Egypt",
      image:
        "https://images.unsplash.com/photo-1568322445389-f64ac2515020?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Lalibela",
      image:
        "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Zanzibar",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0b3d0b 0%, #f4c430 50%, #8b0000 100%)",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <section
        style={{
          textAlign: "center",
          padding: "80px 20px",
          background: "rgba(0,0,0,0.35)",
        }}
      >
        <div
          style={{
            fontSize: 70,
            marginBottom: 20,
          }}
        >
          ✈️
        </div>

        <h1
          style={{
            fontSize: 70,
            marginBottom: 20,
            fontWeight: "bold",
          }}
        >
          Brook Travel
        </h1>

        <p
          style={{
            fontSize: 28,
            maxWidth: 800,
            margin: "0 auto",
            lineHeight: 1.5,
          }}
        >
          Explore Africa and the World With Confidence
        </p>

        <button
          style={{
            marginTop: 40,
            background: "#f4c430",
            color: "#000",
            border: "none",
            padding: "18px 40px",
            borderRadius: 12,
            fontSize: 20,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Search Flights
        </button>
      </section>

      <section
        style={{
          padding: "60px 30px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: 42,
            marginBottom: 50,
            color: "white",
          }}
        >
          Featured Destinations
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 30,
          }}
        >
          {attractions.map((place, index) => (
            <div
              key={index}
              style={{
                background: "rgba(255,255,255,0.15)",
                borderRadius: 20,
                overflow: "hidden",
                backdropFilter: "blur(10px)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
              }}
            >
              <img
                src={place.image}
                alt={place.name}
                style={{
                  width: "100%",
                  height: 240,
                  objectFit: "cover",
                }}
              />

              <div
                style={{
                  padding: 20,
                }}
              >
                <h3
                  style={{
                    fontSize: 28,
                    marginBottom: 10,
                  }}
                >
                  {place.name}
                </h3>

                <p
                  style={{
                    opacity: 0.9,
                    lineHeight: 1.6,
                  }}
                >
                  Discover unforgettable history, culture, and adventure.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}