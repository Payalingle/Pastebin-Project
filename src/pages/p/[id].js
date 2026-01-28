import React from "react";

export default function PastePage({ paste, error }) {
  if (error) {
    return <h2 style={{ padding: 40 }}>{error}</h2>;
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Paste</h1>
      <pre
        style={{
          background: "#f4f4f4",
          padding: 20,
          borderRadius: 6,
          whiteSpace: "pre-wrap",
        }}
      >
        {paste.content}
      </pre>

      {paste.expiresAt && (
        <p>Expires at: {new Date(paste.expiresAt).toLocaleString()}</p>
      )}

      {paste.maxViews && <p>Remaining views: {paste.remainingViews}</p>}
    </div>
  );
}

export async function getServerSideProps({ params, req }) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    `http://${req.headers.host}`;

  const res = await fetch(`${baseUrl}/api/pastes/${params.id}`);
  const data = await res.json();

  if (!res.ok) {
    return { props: { error: data.error || "Not found" } };
  }

  return { props: { paste: data } };
}