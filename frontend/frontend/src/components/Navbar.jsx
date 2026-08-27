import React, { useState, useEffect } from "react";
import { Shield, Wallet, CheckCircle2, AlertTriangle } from "lucide-react";

export default function Navbar({ account, setAccount }) {
  const [chainId, setChainId] = useState(null);
  const SEPOLIA_CHAIN_ID = "0xaa36a7"; // 11155111 in hex

  useEffect(() => {
    if (window.ethereum) {
      // Fetch initial chain ID
      window.ethereum.request({ method: "eth_chainId" }).then(setChainId);

      // Listen for network changes
      window.ethereum.on("chainChanged", (newChainId) => {
        setChainId(newChainId);
      });
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Wallet connection error:", error);
      }
    } else {
      alert("MetaMask extension not found! Please install MetaMask.");
    }
  };

  const switchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: SEPOLIA_CHAIN_ID }],
      });
    } catch (error) {
      console.error("Failed to switch network:", error);
    }
  };

  const formatAddress = (addr) => `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;

  return (
    <nav style={{
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1.25rem 3.5rem",
      backgroundColor: "rgba(11, 15, 25, 0.8)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
      position: "sticky",
      top: 0,
      zIndex: 50
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
        <div style={{
          background: "linear-gradient(135deg, #0284c7 0%, #2563eb 100%)",
          padding: "0.55rem",
          borderRadius: "12px",
          display: "flex",
          boxShadow: "0 0 15px rgba(37, 99, 235, 0.4)"
        }}>
          <Shield size={22} color="#ffffff" />
        </div>
        <h1 style={{ fontSize: "1.25rem", fontWeight: "700", letterSpacing: "-0.02em", color: "#ffffff" }}>
          Degree<span style={{ color: "#38bdf8" }}>Verifier</span>
        </h1>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {/* Network Warning Guard */}
        {account && chainId && chainId !== SEPOLIA_CHAIN_ID && (
          <button
            onClick={switchNetwork}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "rgba(234, 179, 8, 0.15)",
              border: "1px solid rgba(234, 179, 8, 0.4)",
              color: "#fde047",
              padding: "0.55rem 1rem",
              borderRadius: "9999px",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontWeight: "600"
            }}
          >
            <AlertTriangle size={16} />
            Switch to Sepolia
          </button>
        )}

        {account ? (
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            backgroundColor: "rgba(15, 23, 42, 0.8)",
            border: "1px solid rgba(74, 222, 128, 0.3)",
            padding: "0.55rem 1.15rem",
            borderRadius: "9999px",
            fontSize: "0.875rem",
            fontFamily: "monospace",
            color: "#4ade80",
            boxShadow: "0 0 12px rgba(74, 222, 128, 0.15)"
          }}>
            <CheckCircle2 size={16} color="#4ade80" />
            <span>{formatAddress(account)}</span>
          </div>
        ) : (
          <button
            onClick={connectWallet}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
              color: "#ffffff",
              border: "none",
              padding: "0.65rem 1.35rem",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.9rem",
              boxShadow: "0 4px 15px rgba(37, 99, 235, 0.3)"
            }}
          >
            <Wallet size={18} />
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
}