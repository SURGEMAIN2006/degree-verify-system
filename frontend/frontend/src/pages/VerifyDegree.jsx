import React, { useState } from "react";
import { Search, CheckCircle2, XCircle, User, Award, Calendar, ExternalLink } from "lucide-react";

export default function VerifyDegree() {
  const [certHash, setCertHash] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!certHash.trim()) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setResult({
        studentId: "STU-2026-891",
        studentName: "Alex Johnson",
        degreeTitle: "B.Tech in Computer Science & Engineering",
        timestamp: "August 15, 2026",
        isValid: true,
      });
    }, 1000);
  };

  return (
    <div style={{
      maxWidth: "680px",
      margin: "0 auto",
      backgroundColor: "rgba(15, 23, 42, 0.75)",
      backdropFilter: "blur(16px)",
      borderRadius: "20px",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      padding: "2.75rem",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
      textAlign: "left"
    }}>
      <h3 style={{ fontSize: "1.4rem", fontWeight: "700", marginBottom: "0.4rem", color: "#ffffff" }}>
        Verify Certificate Authenticity
      </h3>
      <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginBottom: "2rem" }}>
        Enter a cryptographic SHA-256 certificate hash to query smart contract records.
      </p>
      
      <form onSubmit={handleVerify} style={{ display: "flex", gap: "0.75rem", marginBottom: "2.25rem" }}>
        <div style={{ position: "relative", flex: 1 }}>
          <Search size={18} color="#64748b" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
          <input
            type="text"
            placeholder="Enter SHA-256 Certificate Hash..."
            value={certHash}
            onChange={(e) => setCertHash(e.target.value)}
            style={{
              width: "100%",
              padding: "0.85rem 0.85rem 0.85rem 2.75rem",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              backgroundColor: "rgba(11, 15, 25, 0.8)",
              color: "#ffffff",
              fontSize: "0.95rem",
              outline: "none"
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "0.85rem 1.75rem",
            background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "0.95rem",
            boxShadow: "0 4px 15px rgba(37, 99, 235, 0.3)"
          }}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>

      {result && (
        <div style={{
          padding: "1.75rem",
          borderRadius: "16px",
          backgroundColor: result.isValid ? "rgba(6, 78, 59, 0.25)" : "rgba(127, 29, 29, 0.25)",
          border: `1px solid ${result.isValid ? "rgba(52, 211, 153, 0.4)" : "rgba(248, 113, 113, 0.4)"}`,
          boxShadow: result.isValid ? "0 0 25px rgba(52, 211, 153, 0.1)" : "0 0 25px rgba(248, 113, 113, 0.1)"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              {result.isValid ? <CheckCircle2 color="#34d399" size={26} /> : <XCircle color="#f87171" size={26} />}
              <div>
                <h4 style={{ margin: 0, fontSize: "1.1rem", color: result.isValid ? "#34d399" : "#f87171", fontWeight: "700" }}>
                  {result.isValid ? "Authentic Record Found" : "Invalid / Tampered Certificate"}
                </h4>
                <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>On-Chain State Verified</span>
              </div>
            </div>
            <a href="#" style={{ color: "#38bdf8", display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.85rem", textDecoration: "none" }}>
              Etherscan <ExternalLink size={14} />
            </a>
          </div>

          <div style={{ display: "grid", gap: "0.85rem", fontSize: "0.95rem", color: "#e2e8f0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <User size={16} color="#94a3b8" />
              <span><strong>Student:</strong> {result.studentName} ({result.studentId})</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <Award size={16} color="#94a3b8" />
              <span><strong>Degree:</strong> {result.degreeTitle}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <Calendar size={16} color="#94a3b8" />
              <span><strong>Issued Date:</strong> {result.timestamp}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}