"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const slides = [
    {
      name: "Axum, Ethiopia",
      image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1600&auto=format&fit=crop",
      text: "Ancient Ethiopian heritage and unforgettable culture.",
    },
    {
      name: "Pyramids of Egypt",
      image: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?q=80&w=1600&auto=format&fit=crop",
      text: "Visit one of the greatest wonders of the ancient world.",
    },
    {
      name: "Dubai, UAE",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop",
      text: "Luxury travel, shopping, skyline views, and family vacations.",
    },
    {
      name: "Paris, France",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1600&auto=format&fit=crop",
      text: "Romance, culture, food, and world-famous attractions.",
    },
    {
      name: "Istanbul, Turkey",
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1600&auto=format&fit=crop",
      text: "A beautiful connection between Europe and Asia.",
    },
    {
      name: "Zanzibar, Tanzania",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
      text: "Clear water, beaches, and peaceful island travel.",
    },
  ];

  const airlines = ["Ethiopian Airlines", "Delta", "Emirates", "Qatar Airways", "Turkish Airlines", "United Airlines"];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const active = slides[current];

  function submitRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const subject = "New Brook Travel Booking Request";

    const body = `
New booking request from Brook Travel website:

Name: ${form.get("name")}
Departure City: ${form.get("departure")}
Destination: ${form.get("destination")}
Departure Date: ${form.get("departDate")}
Return Date: ${form.get("returnDate")}
Passengers: ${form.get("passengers")}
Ages: ${form.get("ages")}
Email: ${form.get("email")}
Phone: ${form.get("phone")}
Notes: ${form.get("notes")}
`;

    window.location.href =
      "mailto:brookktravel@gmail.com?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body);
  }

  return (
    <main style={{ fontFamily: "Arial, sans-serif", background: "#07111f", color: "white" }}>
      <section
        style={{
          minHeight: "100vh",
          backgroundImage: `linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.75)), url('${active.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 1.2s ease-in-out",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: 24,
        }}
      >
        <div style={{ maxWidth: 950 }}>
          <p style={{ color: "#f4c430", letterSpacing: 3, fontWeight: 800 }}>
            INTERNATIONAL FLIGHTS • FAMILY TRAVEL • WORLDWIDE DESTINATIONS
          </p>

          <h1 style={{ fontSize: 76, margin: "20px 0", fontWeight: 900 }}>
            Brook Travel
          </h1>

          <h2 style={{ fontSize: 42, color: "#f4c430", marginBottom: 15 }}>
            {active.name}
          </h2>

          <p style={{ fontSize: 24, lineHeight: 1.6, marginBottom: 35 }}>
            {active.text}
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#booking" style={buttonStyle}>Request Booking</a>
            <a href="tel:6129781895" style={outlineButtonStyle}>Call 612-978-1895</a>
          </div>
        </div>
      </section>

      <section id="booking" style={{ padding: "70px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{ fontSize: 42, textAlign: "center", marginBottom: 15 }}>
          Request a Booking
        </h2>

        <p style={{ textAlign: "center", opacity: 0.8, fontSize: 18, marginBottom: 35 }}>
          Enter your travel details and Brook Travel will contact you with options.
        </p>

        <form onSubmit={submitRequest} style={formStyle}>
          <input name="name" required placeholder="Full Name" style={inputStyle} />
          <input name="departure" required placeholder="Departure City or Airport" style={inputStyle} />
          <input name="destination" required placeholder="Destination City or Airport" style={inputStyle} />
          <input name="departDate" required type="date" style={inputStyle} />
          <input name="returnDate" type="date" style={inputStyle} />
          <input name="passengers" required placeholder="Number of Passengers" style={inputStyle} />
          <input name="ages" placeholder="Passenger Ages, example: Adult 35, Child 7, Infant 1" style={inputStyle} />
          <input name="email" type="email" placeholder="Email Address" style={inputStyle} />
          <input name="phone" placeholder="Phone Number" style={inputStyle} />
          <textarea name="notes" placeholder="Notes, baggage, airline preference, flexible dates..." style={textareaStyle}></textarea>

          <button type="submit" style={submitButtonStyle}>
            Submit Booking Request
          </button>
        </form>
      </section>

      <section style={{ padding: "40px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: 38, marginBottom: 30 }}>
          Major Airlines We Help You Compare
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 18 }}>
          {airlines.map((airline) => (
            <div key={airline} style={airlineCardStyle}>
              {airline}
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "60px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: 38, marginBottom: 30 }}>
          Popular Destinations
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 24 }}>
          {slides.map((place) => (
            <div key={place.name} style={cardStyle}>
              <img src={place.image} alt={place.name} style={{ width: "100%", height: 220, objectFit: "cover" }} />
              <div style={{ padding: 20 }}>
                <h3 style={{ fontSize: 22 }}>{place.name}</h3>
                <p style={{ opacity: 0.8, lineHeight: 1.6 }}>{place.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <a href="tel:6129781895" style={callButtonStyle}>
        Call Now
      </a>
    </main>
  );
}

const buttonStyle = {
  background: "linear-gradient(90deg,#009a44,#f4c430,#da121a)",
  color: "black",
  padding: "16px 34px",
  borderRadius: 999,
  fontWeight: 800,
  textDecoration: "none",
};

const outlineButtonStyle = {
  color: "white",
  padding: "16px 34px",
  borderRadius: 999,
  fontWeight: 800,
  textDecoration: "none",
  border: "2px solid white",
};

const formStyle = {
  background: "white",
  color: "#111827",
  padding: 30,
  borderRadius: 24,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
  gap: 16,
  boxShadow: "0 25px 60px rgba(0,0,0,.35)",
};

const inputStyle = {
  padding: 15,
  borderRadius: 12,
  border: "1px solid #d1d5db",
  fontSize: 15,
};

const textareaStyle = {
  padding: 15,
  borderRadius: 12,
  border: "1px solid #d1d5db",
  fontSize: 15,
  minHeight: 120,
  gridColumn: "1 / -1",
};

const submitButtonStyle = {
  gridColumn: "1 / -1",
  background: "#07111f",
  color: "white",
  padding: 16,
  borderRadius: 12,
  border: "none",
  fontSize: 18,
  fontWeight: 800,
  cursor: "pointer",
};

const airlineCardStyle = {
  background: "#111827",
  border: "1px solid rgba(255,255,255,.15)",
  borderRadius: 18,
  padding: 24,
  textAlign: "center" as const,
  fontWeight: 800,
  fontSize: 18,
};

const cardStyle = {
  background: "#111827",
  borderRadius: 22,
  overflow: "hidden",
  boxShadow: "0 20px 45px rgba(0,0,0,.35)",
};

const callButtonStyle = {
  position: "fixed" as const,
  right: 24,
  bottom: 24,
  background: "#25D366",
  color: "white",
  padding: "14px 22px",
  borderRadius: 999,
  fontWeight: 800,
  textDecoration: "none",
  boxShadow: "0 10px 30px rgba(0,0,0,.35)",
};