"use client";
import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [views, setViews] = useState("");
  const [url, setUrl] = useState("");

  async function submit() {
    if (!content.trim()) return alert("Content required");
    if (ttl && Number(ttl) < 1) return alert("TTL must be >= 1");
    if (views && Number(views) < 1) return alert("Views must be >= 1");

    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: content.trim(),
        ttl_seconds: ttl ? Number(ttl) : undefined,
        max_views: views ? Number(views) : undefined,
      }),
    });

    const data = await res.json();
    if (!res.ok) return alert(data.error);

    setUrl(`/p/${data.id}`);
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>📋 Pastebin Lite</h1>

        <textarea
          style={styles.textarea}
          rows="6"
          placeholder="Enter your paste..."
          value={content}
          onChange={e => setContent(e.target.value)}
        />

        <div style={styles.row}>
          <input
            style={styles.input}
            type="number"
            placeholder="TTL (seconds)"
            value={ttl}
            onChange={e => setTtl(e.target.value)}
          />

          <input
            style={styles.input}
            type="number"
            placeholder="Max Views"
            value={views}
            onChange={e => setViews(e.target.value)}
          />
        </div>

        <button style={styles.button} onClick={submit}>
          Create Paste
        </button>

        {url && (
          <p style={styles.link}>
            Link: <a href={url}>{url}</a>
          </p>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f6fb",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "#fff",
    padding: 30,
    width: 420,
    borderRadius: 12,
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  textarea: {
    width: "100%",
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ddd",
  },
  row: {
    display: "flex",
    gap: 10,
    marginTop: 15,
  },
  input: {
    flex: 1,
    padding: 8,
    borderRadius: 6,
    border: "1px solid #ddd",
  },
  button: {
    width: "100%",
    marginTop: 20,
    padding: 10,
    border: "none",
    background: "#4f46e5",
    color: "#fff",
    borderRadius: 8,
    cursor: "pointer",
  },
  link: {
    marginTop: 15,
    textAlign: "center",
  },
};