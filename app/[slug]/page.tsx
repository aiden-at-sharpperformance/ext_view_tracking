"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";
import { getDashboard } from "@/config/dashboards";
import { notFound } from "next/navigation";
import { use } from "react";

export default function DashboardPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const dashboard = getDashboard(slug);

  useEffect(() => {
    if (dashboard) {
      track("Dashboard View", { dashboard: slug });
    }
  }, [dashboard, slug]);

  if (!dashboard) {
    notFound();
  }

  return (
    <div className="hex-embed" style={{ width: "100%", height: "100vh" }}>
      <iframe
        src={dashboard.hexUrl}
        title={dashboard.name}
        width="100%"
        height="100%"
        style={{ border: "none", display: "block" }}
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
