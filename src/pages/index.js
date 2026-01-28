import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [views, setViews] = useState("");
  const [url, setUrl] = useState("");

  async function submit() {
    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        ttl_seconds: ttl ? Number(ttl) : undefined,
        max_views: views ? Number(views) : undefined,
      }),
    });

    const data = await res.json();
    const link = `/p/${data.id}`;
    setUrl(link);
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Pastebin Lite</h1>
      <textarea rows="6" value={content} onChange={e => setContent(e.target.value)} />
      <br />
      TTL: <input value={ttl} onChange={e => setTtl(e.target.value)} />
      Views: <input value={views} onChange={e => setViews(e.target.value)} />
      <br />
      <button onClick={submit}>Create</button>

      {url && <p>Link: <a href={url}>{url}</a></p>}
    </div>
  );
}