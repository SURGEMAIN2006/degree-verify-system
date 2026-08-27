import React, { useState } from "react";
import { CheckCircle2, UploadCloud, FileText, Trash2 } from "lucide-react";

export default function IssueDegree() {
  const [formData, setFormData] = useState({ studentId: "", studentName: "", degreeTitle: "" });
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState("");

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
      } else {
        alert("Please drop a valid PDF file.");
      }
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.studentId || !formData.studentName || !formData.degreeTitle || !file) {
      alert("Please fill out all fields and attach the PDF document.");
      return;
    }

    setStatus("Uploading PDF to IPFS & executing smart contract...");
    setTimeout(() => {
      setStatus("Degree successfully minted on-chain!");
    }, 1500);
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
        Issue New Degree Certificate
      </h3>
      <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginBottom: "2rem" }}>
        Authorized Portal: Upload certificate PDF to pin on IPFS and issue on Ethereum smart contract.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div>
          <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.85rem", color: "#cbd5e1", fontWeight: "600" }}>Student ID / Roll Number</label>
          <input
            type="text"
            placeholder="e.g. STU-2026-891"
            value={formData.studentId}
            onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
            style={{ width: "100%", padding: "0.85rem", borderRadius: "10px", border: "1px solid rgba(255, 255, 255, 0.1)", backgroundColor: "rgba(11, 15, 25, 0.8)", color: "#ffffff", outline: "none" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.85rem", color: "#cbd5e1", fontWeight: "600" }}>Student Full Name</label>
          <input
            type="text"
            placeholder="e.g. Alex Johnson"
            value={formData.studentName}
            onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
            style={{ width: "100%", padding: "0.85rem", borderRadius: "10px", border: "1px solid rgba(255, 255, 255, 0.1)", backgroundColor: "rgba(11, 15, 25, 0.8)", color: "#ffffff", outline: "none" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.85rem", color: "#cbd5e1", fontWeight: "600" }}>Degree Program Title</label>
          <input
            type="text"
            placeholder="e.g. B.Tech in Computer Science"
            value={formData.degreeTitle}
            onChange={(e) => setFormData({ ...formData, degreeTitle: e.target.value })}
            style={{ width: "100%", padding: "0.85rem", borderRadius: "10px", border: "1px solid rgba(255, 255, 255, 0.1)", backgroundColor: "rgba(11, 15, 25, 0.8)", color: "#ffffff", outline: "none" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.85rem", color: "#cbd5e1", fontWeight: "600" }}>Degree Certificate (PDF)</label>
          
          {!file ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              style={{
                border: `2px dashed ${isDragging ? "#38bdf8" : "rgba(255, 255, 255, 0.15)"}`,
                borderRadius: "12px",
                padding: "2rem 1.5rem",
                textAlign: "center",
                backgroundColor: isDragging ? "rgba(56, 189, 248, 0.05)" : "rgba(11, 15, 25, 0.5)",
                transition: "all 0.2s ease",
                cursor: "pointer",
                position: "relative"
              }}
            >
              <UploadCloud size={36} color={isDragging ? "#38bdf8" : "#64748b"} style={{ marginBottom: "0.5rem" }} />
              <p style={{ color: "#e2e8f0", fontSize: "0.95rem", margin: "0 0 0.25rem 0", fontWeight: "500" }}>
                Drag and drop your certificate PDF here
              </p>
              <span style={{ color: "#64748b", fontSize: "0.8rem" }}>or click to browse files</span>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" }}
              />
            </div>
          ) : (
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "1rem 1.25rem",
              borderRadius: "12px",
              backgroundColor: "rgba(30, 41, 59, 0.8)",
              border: "1px solid rgba(56, 189, 248, 0.3)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                <div style={{ backgroundColor: "rgba(56, 189, 248, 0.1)", padding: "0.5rem", borderRadius: "8px", display: "flex" }}>
                  <FileText size={22} color="#38bdf8" />
                </div>
                <div>
                  <h5 style={{ margin: 0, fontSize: "0.95rem", color: "#f8fafc", fontWeight: "600" }}>{file.name}</h5>
                  <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>{formatFileSize(file.size)}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFile(null)}
                style={{ backgroundColor: "transparent", border: "none", color: "#f87171", cursor: "pointer", padding: "0.3rem" }}
              >
                <Trash2 size={18} />
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          style={{
            marginTop: "0.75rem",
            padding: "0.95rem",
            background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "700",
            fontSize: "1rem",
            boxShadow: "0 4px 15px rgba(5, 150, 105, 0.3)"
          }}
        >
          Publish Certificate On-Chain
        </button>
      </form>

      {status && (
        <div style={{ marginTop: "1.5rem", display: "flex", alignItems: "center", gap: "0.6rem", color: "#38bdf8", fontSize: "0.95rem" }}>
          <CheckCircle2 size={18} />
          <span>{status}</span>
        </div>
      )}
    </div>
  );
}