"use client";

import { useEffect, useMemo, useState } from "react";

type AirportOption = {
  code: string;
  name: string;
  city: string;
  country: string;
  label: string;
};

const today = new Date().toISOString().split("T")[0];

const fallbackAirports: AirportOption[] = [
  { code: "ADD", name: "Addis Ababa Bole International Airport", city: "Addis Ababa", country: "Ethiopia", label: "ADD — Addis Ababa Bole International Airport, Addis Ababa, Ethiopia" },
  { code: "MSP", name: "Minneapolis Saint Paul International Airport", city: "Minneapolis", country: "United States", label: "MSP — Minneapolis Saint Paul International Airport, USA" },
  { code: "DFW", name: "Dallas Fort Worth International Airport", city: "Dallas", country: "United States", label: "DFW — Dallas Fort Worth International Airport, USA" },
  { code: "JFK", name: "John F. Kennedy International Airport", city: "New York", country: "United States", label: "JFK — John F. Kennedy International Airport, New York, USA" },
  { code: "ATL", name: "Hartsfield Jackson Atlanta International Airport", city: "Atlanta", country: "United States", label: "ATL — Hartsfield Jackson Atlanta International Airport, USA" },
  { code: "LOS", name: "Murtala Muhammed International Airport", city: "Lagos", country: "Nigeria", label: "LOS — Murtala Muhammed International Airport, Lagos, Nigeria" },
  { code: "ACC", name: "Kotoka International Airport", city: "Accra", country: "Ghana", label: "ACC — Kotoka International Airport, Accra, Ghana" },
  { code: "NBO", name: "Jomo Kenyatta International Airport", city: "Nairobi", country: "Kenya", label: "NBO — Jomo Kenyatta International Airport, Nairobi, Kenya" },
  { code: "DXB", name: "Dubai International Airport", city: "Dubai", country: "United Arab Emirates", label: "DXB — Dubai International Airport, Dubai, UAE" },
];

const slides = [
  {
    name: "Ethiopia",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1800&auto=format&fit=crop",
    text: "Domestic and international flight support for families, business travelers, and worldwide trips.",
  },
  {
    name: "Dallas, USA",
    image: "https://images.unsplash.com/photo-1531218150217-54595bc2b934?q=80&w=1800&auto=format&fit=crop",
    text: "Simple booking support for domestic U.S. flights and international connections.",
  },
  {
    name: "Lagos, Nigeria",
    image: "https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?q=80&w=1800&auto=format&fit=crop",
    text: "Travel support for West Africa, family visits, business trips, and events.",
  },
  {
    name: "Accra, Ghana",
    image: "https://images.unsplash.com/photo-1577971132997-c10be9372519?q=80&w=1800&auto=format&fit=crop",
    text: "Reliable ticket help for Ghana, Africa, and global destinations.",
  },
  {
    name: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1800&auto=format&fit=crop",
    text: "Worldwide connections, family vacations, and smooth travel planning.",
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [airportOptions, setAirportOptions] = useState<AirportOption[]>(fallbackAirports);
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    departure: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    passengers: "",
    ages: "",
    email: "",
    phone: "",
    notes: "",
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % slides.length), 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function loadAirports() {
      try {
        const response = await fetch("https://raw.githubusercontent.com/mwgg/Airports/master/airports.json");
        const data = await response.json();

        const loaded: AirportOption[] = Object.values(data)
          .map((airport: any) => {
            const code = airport.iata || "";
            const name = airport.name || "";
            const city = airport.city || "";
            const country = airport.country || "";
            return { code, name, city, country, label: `${code} — ${name}, ${city}, ${country}` };
          })
          .filter((airport) => airport.code && airport.name && airport.city)
          .sort((a, b) => a.code.localeCompare(b.code));

        if (loaded.length > 1000) setAirportOptions(loaded);
      } catch {
        setAirportOptions(fallbackAirports);
      }
    }

    loadAirports();
  }, []);

  const active = slides[current];

  function updateField(name: string, value: string) {
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "departureDate" && updated.returnDate && updated.returnDate <= value) {
        updated.returnDate = "";
      }
      return updated;
    });
  }

  async function submitBooking(e: React.FormEvent) {
    e.preventDefault();
    setStatus("");

    if (form.departureDate < today) {
      setStatus("Departure date cannot be before today.");
      return;
    }

    if (form.returnDate && form.returnDate <= form.departureDate) {
      setStatus("Return date must be after the departure date.");
      return;
    }

    setStatus("Sending your request...");

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setStatus("Request sent successfully. Brook Travel will contact you soon.");
        setForm({
          fullName: "",
          departure: "",
          destination: "",
          departureDate: "",
          returnDate: "",
          passengers: "",
          ages: "",
          email: "",
          phone: "",
          notes: "",
        });
      } else {
        setStatus("Email setup is not complete. Please call 612-978-1895.");
      }
    } catch {
      setStatus("Email setup is not complete. Please call 612-978-1895.");
    }
  }

  const bookingForm = (
    <form onSubmit={submitBooking} className="form-grid" style={formStyle}>
      <FieldGroup title="Full Name" text="Passenger or contact person’s full name.">
        <input required placeholder="Example: Brook Gebre" value={form.fullName} onChange={(e) => updateField("fullName", e.target.value)} style={inputStyle} />
      </FieldGroup>

      <FieldGroup title="Departure City or Airport" text="Type airport code, city, airport, or country.">
        <AirportInput label="Example: DFW, MSP, Addis, Dallas" value={form.departure} onChange={(v) => updateField("departure", v)} airportOptions={airportOptions} />
      </FieldGroup>

      <FieldGroup title="Destination City or Airport" text="Where is the traveler going?">
        <AirportInput label="Example: ADD, Lagos, Dubai, London" value={form.destination} onChange={(v) => updateField("destination", v)} airportOptions={airportOptions} />
      </FieldGroup>

      <div className="date-row" style={{ gridColumn: "1 / -1", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <FieldGroup title="Departure Date" text="Past dates are not allowed.">
          <input required type="date" min={today} value={form.departureDate} onChange={(e) => updateField("departureDate", e.target.value)} style={inputStyle} />
        </FieldGroup>

        <FieldGroup title="Return Date" text="Must be after departure date. Leave blank for one-way.">
          <input type="date" min={form.departureDate || today} value={form.returnDate} onChange={(e) => updateField("returnDate", e.target.value)} style={inputStyle} />
        </FieldGroup>
      </div>

      <FieldGroup title="Number of Travelers" text="Example: 2 adults, 1 child, 1 infant.">
        <input required placeholder="Example: 2 adults, 1 child, 1 infant" value={form.passengers} onChange={(e) => updateField("passengers", e.target.value)} style={inputStyle} />
      </FieldGroup>

      <FieldGroup title="Traveler Ages" text="Needed for child and infant pricing.">
        <input placeholder="Example: Adult 35, Child 7, Infant 1" value={form.ages} onChange={(e) => updateField("ages", e.target.value)} style={inputStyle} />
      </FieldGroup>

      <FieldGroup title="Email Address" text="For sending quote details.">
        <input type="email" placeholder="Example: customer@email.com" value={form.email} onChange={(e) => updateField("email", e.target.value)} style={inputStyle} />
      </FieldGroup>

      <FieldGroup title="Phone Number" text="Required. Best number to call or text.">
        <input required type="tel" placeholder="Example: 612-978-1895" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} style={inputStyle} />
      </FieldGroup>

      <FieldGroup title="Notes" text="Airline preference, baggage, flexible dates, layover request, or special needs." full>
        <textarea placeholder="Example: Prefer Ethiopian Airlines, 2 checked bags, flexible by 2 days..." value={form.notes} onChange={(e) => updateField("notes", e.target.value)} style={textareaStyle} />
      </FieldGroup>

      <button type="submit" style={submitBtn}>Submit Flight Request</button>
      {status && <p style={{ gridColumn: "1 / -1", fontWeight: 800, color: "#0f172a" }}>{status}</p>}
    </form>
  );

  return (
    <main style={{ background: "#f7f9fc", color: "#0f172a", fontFamily: "Arial, sans-serif" }}>
      <style>{`
        html { scroll-behavior: smooth; }

        @media (max-width: 760px) {
          .hero-title { font-size: 44px !important; }
          .date-row { grid-template-columns: 1fr !important; }
          .form-grid { grid-template-columns: 1fr !important; }
          .modal-box { max-height: 92vh !important; padding: 20px !important; }
        }
      `}</style>

      <section
        style={{
          minHeight: "88vh",
          backgroundImage: `linear-gradient(90deg, rgba(7,17,31,.78), rgba(7,17,31,.35), rgba(7,17,31,.08)), url('${active.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 1.2s ease-in-out",
          padding: "34px 24px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ maxWidth: 1050, margin: "0 auto", width: "100%" }}>
          <div style={brandPill}>BROOK TRAVEL</div>

          <h1 className="hero-title" style={{ fontSize: 64, lineHeight: 1.06, fontWeight: 900, color: "white", margin: "22px 0 16px", maxWidth: 820 }}>
            Simple flight booking support for domestic and international trips
          </h1>

          <p style={{ color: "#e8f1ff", fontSize: 22, lineHeight: 1.6, maxWidth: 720, fontWeight: 600 }}>
            {active.text}
          </p>

          <button onClick={() => setShowForm(true)} style={primaryBtnButton}>
            Request Flight Quote
          </button>
        </div>
      </section>

      <section id="booking" style={{ padding: "76px 24px", maxWidth: 1160, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <div style={sectionPill}>FLIGHT REQUEST</div>
          <h2 style={{ fontSize: 44, margin: "12px 0 8px", color: "#0f172a" }}>Get a personalized flight quote</h2>
          <p style={{ color: "#64748b", fontSize: 18 }}>
            Submit your trip details. Brook Travel will review and contact you with options.
          </p>
        </div>

        {bookingForm}
      </section>

      {showForm && (
        <div style={modalOverlay}>
          <div className="modal-box" style={modalBox}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, marginBottom: 18 }}>
              <div>
                <div style={sectionPill}>FLIGHT REQUEST</div>
                <h2 style={{ margin: "10px 0 0", fontSize: 30 }}>Request a Flight Quote</h2>
              </div>
              <button onClick={() => setShowForm(false)} style={closeBtn}>×</button>
            </div>
            {bookingForm}
          </div>
        </div>
      )}

      <a href="tel:+16129781895" style={callBtn}>Call 612-978-1895</a>
    </main>
  );
}

function FieldGroup({ title, text, full, children }: { title: string; text: string; full?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ gridColumn: full ? "1 / -1" : "auto", background: "rgba(255,255,255,.9)", border: "1px solid #dbeafe", borderRadius: 22, padding: 16, boxShadow: "0 10px 30px rgba(15,23,42,.05)" }}>
      <label style={{ display: "block", fontWeight: 900, color: "#0f172a", marginBottom: 4 }}>{title}</label>
      <p style={{ fontSize: 13, color: "#64748b", marginTop: 0, marginBottom: 10 }}>{text}</p>
      {children}
    </div>
  );
}

function AirportInput({ label, value, onChange, airportOptions }: { label: string; value: string; onChange: (v: string) => void; airportOptions: AirportOption[] }) {
  const [open, setOpen] = useState(false);

  const matches = useMemo(() => {
    if (!value || value.length < 2) return [];
    const search = value.toLowerCase();

    return airportOptions
      .filter((airport) =>
        airport.code.toLowerCase().includes(search) ||
        airport.name.toLowerCase().includes(search) ||
        airport.city.toLowerCase().includes(search) ||
        airport.country.toLowerCase().includes(search)
      )
      .slice(0, 10);
  }, [value, airportOptions]);

  return (
    <div style={{ position: "relative" }}>
      <input required placeholder={label} value={value} onChange={(e) => { onChange(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)} style={inputStyle} />
      {open && matches.length > 0 && (
        <div style={suggestionBox}>
          {matches.map((airport) => (
            <div key={`${airport.code}-${airport.name}-${airport.city}`} onClick={() => { onChange(airport.label); setOpen(false); }} style={suggestionItem}>
              <strong style={{ color: "#0b7a44" }}>{airport.code}</strong>
              <span> — {airport.name}</span>
              <div style={{ fontSize: 13, color: "#64748b", marginTop: 3 }}>{airport.city}, {airport.country}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const brandPill = { display: "inline-block", background: "rgba(255,255,255,.14)", border: "1px solid rgba(255,255,255,.24)", color: "#f7c948", borderRadius: 999, padding: "9px 16px", fontWeight: 900, letterSpacing: 2 };
const primaryBtnButton = { marginTop: 28, background: "linear-gradient(90deg,#0b7a44,#f4c430,#b42318)", color: "#0f172a", padding: "16px 34px", borderRadius: 999, fontWeight: 900, border: "none", cursor: "pointer", fontSize: 16, boxShadow: "0 16px 35px rgba(0,0,0,.22)" };
const sectionPill = { display: "inline-block", background: "#e0f2fe", color: "#075985", padding: "8px 14px", borderRadius: 999, fontWeight: 900, letterSpacing: 1 };

const formStyle = { background: "linear-gradient(135deg,#ffffff,#eef6ff)", color: "#111827", padding: 30, borderRadius: 34, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18, boxShadow: "0 30px 90px rgba(15,23,42,.12)", border: "1px solid #dbeafe" };
const inputStyle = { width: "100%", padding: 15, borderRadius: 16, border: "1px solid #cbd5e1", fontSize: 15, boxSizing: "border-box" as const, background: "white", outline: "none" };
const textareaStyle = { ...inputStyle, minHeight: 125 };
const submitBtn = { gridColumn: "1 / -1", background: "linear-gradient(90deg,#0b7a44,#f4c430,#b42318)", color: "#0f172a", border: "none", padding: 18, borderRadius: 18, fontWeight: 900, fontSize: 18, cursor: "pointer", boxShadow: "0 16px 35px rgba(15,23,42,.16)" };
const callBtn = { position: "fixed" as const, right: 24, bottom: 24, background: "#b42318", color: "white", padding: "14px 22px", borderRadius: 999, fontWeight: 900, textDecoration: "none", boxShadow: "0 10px 30px rgba(0,0,0,.25)" };
const modalOverlay = { position: "fixed" as const, inset: 0, background: "rgba(2,6,23,.72)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 18 };
const modalBox = { width: "100%", maxWidth: 1120, maxHeight: "90vh", overflowY: "auto" as const, background: "#f8fbff", borderRadius: 34, padding: 28, boxShadow: "0 40px 120px rgba(0,0,0,.45)" };
const closeBtn = { width: 44, height: 44, borderRadius: 999, border: "none", background: "#0f172a", color: "white", fontSize: 26, cursor: "pointer" };
const suggestionBox = { position: "absolute" as const, zIndex: 50, background: "white", color: "#111827", border: "1px solid #ddd", borderRadius: 16, marginTop: 6, width: "100%", maxHeight: 340, overflowY: "auto" as const, boxShadow: "0 18px 45px rgba(0,0,0,.18)" };
const suggestionItem = { padding: 14, cursor: "pointer", borderBottom: "1px solid #f1f1f1" };