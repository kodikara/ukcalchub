export default function Home() {
  return (
    <main style={{
      padding: "40px",
      fontFamily: "Arial",
      background: "#0b0f1a",
      color: "white",
      minHeight: "100vh"
    }}>
      <h1 style={{ fontSize: "40px", marginBottom: "20px" }}>
        UK Calculator Hub
      </h1>

      <p style={{ marginBottom: "30px", color: "#9ca3af" }}>
        Simple, fast and modern UK financial calculators
      </p>

      <div style={{
        background: "#111827",
        padding: "20px",
        borderRadius: "12px",
        maxWidth: "400px"
      }}>
        <label>Monthly Rent (£)</label>
        <input
          type="number"
          style={{ width: "100%", padding: "10px", marginTop: "5px" }}
        />

        <label style={{ marginTop: "10px", display: "block" }}>Bills (£)</label>
        <input
          type="number"
          style={{ width: "100%", padding: "10px", marginTop: "5px" }}
        />

        <button style={{
          marginTop: "15px",
          padding: "10px",
          width: "100%",
          background: "#3b82f6",
          border: "none",
          color: "white",
          borderRadius: "8px"
        }}>
          Calculate
        </button>
      </div>
    </main>
  );
}