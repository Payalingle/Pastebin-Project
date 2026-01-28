export default function PastePage({ paste }) {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>📄 Your Paste</h2>
        <pre style={styles.pre}>{paste.content}</pre>
        <p style={styles.meta}>Remaining Views: {paste.max_views}</p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#eef2ff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "#fff",
    padding: 30,
    width: 600,
    borderRadius: 12,
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },
  pre: {
    background: "#f8fafc",
    padding: 15,
    borderRadius: 8,
    whiteSpace: "pre-wrap",
  },
  meta: {
    marginTop: 10,
    color: "#555",
  },
};