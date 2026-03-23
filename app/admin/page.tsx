import { dashboards } from "@/config/dashboards";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminLogin } from "./login";

async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_auth")?.value === "true";
}

export default async function AdminPage() {
  const authed = await isAuthenticated();

  if (!authed) {
    return <AdminLogin />;
  }

  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const plausibleHost =
    process.env.NEXT_PUBLIC_PLAUSIBLE_CUSTOM_DOMAIN || "plausible.io";

  return (
    <div
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "2rem",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: "0.25rem" }}>Dashboard Admin</h1>
      <p style={{ color: "#666", marginTop: 0 }}>
        {dashboards.length} dashboard{dashboards.length !== 1 && "s"} configured
      </p>

      {plausibleDomain && (
        <p style={{ marginBottom: "2rem" }}>
          <a
            href={`https://${plausibleHost}/${plausibleDomain}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#0070f3" }}
          >
            View analytics in Plausible &rarr;
          </a>
        </p>
      )}

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
        }}
      >
        <thead>
          <tr style={{ borderBottom: "2px solid #eee" }}>
            <th style={{ padding: "0.5rem 0" }}>Name</th>
            <th style={{ padding: "0.5rem 0" }}>Slug</th>
            <th style={{ padding: "0.5rem 0" }}>Link</th>
          </tr>
        </thead>
        <tbody>
          {dashboards.map((d) => (
            <tr key={d.slug} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "0.75rem 0" }}>{d.name}</td>
              <td style={{ padding: "0.75rem 0", color: "#666" }}>
                /{d.slug}
              </td>
              <td style={{ padding: "0.75rem 0" }}>
                <a href={`/${d.slug}`} style={{ color: "#0070f3" }}>
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
