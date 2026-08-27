import React, { useState } from "react";
import Navbar from "./components/Navbar";
import VerifyDegree from "./pages/VerifyDegree";
import IssueDegree from "./pages/IssueDegree";
import { ShieldCheck, FilePlus } from "lucide-react";

export default function App() {
  const [account, setAccount] = useState("");
  const [activeTab, setActiveTab] = useState("verify");

  return (
    <div style={{ minHeight: "100vh", width: "100%", paddingBottom: "4rem" }}>
      <Navbar account={account} setAccount={setAccount} />
      
      <main style={{ padding: "4rem 1.5rem 2rem 1.5rem", textAlign: "center", maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Web3 Live Badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.4rem 1rem",
          borderRadius: "9999px",
          backgroundColor: "rgba(56, 189, 248, 0.08)",
          border: "1px solid rgba(56, 189, 248, 0.25)",
          color: "#38bdf8",
          fontSize: "0.825rem",
          fontWeight: "600",
          letterSpacing: "0.05em",
          marginBottom: "1.5rem",
          textTransform: "uppercase"
        }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#38bdf8", boxShadow: "0 0 10px #38bdf8" }}></span>
          Ethereum Sepolia Network
        </div>

        {/* Gradient Hero Text */}
        <h2 style={{ 
          fontSize: "3rem", 
          fontWeight: "800", 
          letterSpacing: "-0.03em", 
          marginBottom: "1rem",
          background: "linear-gradient(135deg, #ffffff 30%, #94a3b8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          Decentralized Certificate Engine
        </h2>
        
        <p style={{ color: "#94a3b8", maxWidth: "580px", margin: "0 auto 3rem auto", fontSize: "1.05rem", lineHeight: "1.6" }}>
          Tamper-proof academic credential verification powered by smart contract automation and immutable IPFS storage.
        </p>

        {/* Glassmorphism Tab Switcher */}
        <div style={{
          display: "inline-flex",
          backgroundColor: "rgba(15, 23, 42, 0.65)",
          backdropFilter: "blur(16px)",
          padding: "0.4rem",
          borderRadius: "14px",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
          marginBottom: "3rem"
        }}>
          <button
            onClick={() => setActiveTab("verify")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.7rem 1.75rem",
              borderRadius: "10px",
              border: "none",
              backgroundColor: activeTab === "verify" ? "#2563eb" : "transparent",
              color: activeTab === "verify" ? "#ffffff" : "#94a3b8",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.95rem",
              boxShadow: activeTab === "verify" ? "0 4px 15px rgba(37, 99, 235, 0.4)" : "none"
            }}
          >
            <ShieldCheck size={18} />
            Verify Certificate
          </button>
          <button
            onClick={() => setActiveTab("issue")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.7rem 1.75rem",
              borderRadius: "10px",
              border: "none",
              backgroundColor: activeTab === "issue" ? "#2563eb" : "transparent",
              color: activeTab === "issue" ? "#ffffff" : "#94a3b8",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.95rem",
              boxShadow: activeTab === "issue" ? "0 4px 15px rgba(37, 99, 235, 0.4)" : "none"
            }}
          >
            <FilePlus size={18} />
            Issue Certificate
          </button>
        </div>

        {activeTab === "verify" ? <VerifyDegree /> : <IssueDegree />}
      </main>
    </div>
  );
}