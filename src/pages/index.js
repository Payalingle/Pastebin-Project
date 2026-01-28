"use client";

import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [views, setViews] = useState("");
  const [url, setUrl] = useState("");

  async function submit() {
    // ✅ FRONTEND VALIDATION
    if (!content.trim()) {
      alert("Content is required");
      return;
    }

    if (ttl && Number(ttl) < 1) {
      alert("TTL must be >= 1");
      return;
    }

    if (views && Number(views) < 1) {
      alert("Views must be >= 1");
      return;
    }

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

    if (!res.ok) {
      alert(data.error);
      return;
    }

    setUrl(`/p/${data.id}`);
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Pastebin Lite</h1>

      <textarea
        rows="6"
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Enter paste content"
      />

      <br />

      TTL:
      <input
        type="number"
        min="1"
        value={ttl}
        onChange={e => setTtl(e.target.value)}
      />

      Views:
      <input
        type="number"
        min="1"
        value={views}
        onChange={e => setViews(e.target.value)}
      />

      <br />
      <button onClick={submit}>Create</button>

      {url && <p>Link: <a href={url}>{url}</a></p>}
    </div>
  );
}
