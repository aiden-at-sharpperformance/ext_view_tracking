"use client";

import { useEffect } from "react";
import { usePlausible } from "next-plausible";
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
  const plausible = usePlausible();

  useEffect(() => {
    if (dashboard) {
      plausible("Dashboard View", { props: { dashboard: slug } });
    }
  }, [dashboard, slug, plausible]);

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
