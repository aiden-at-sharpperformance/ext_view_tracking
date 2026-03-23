"use client";

import { useEffect, useRef } from "react";
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
  const startTime = useRef(Date.now());

  useEffect(() => {
    if (!dashboard) return;

    track("Dashboard View", { dashboard: slug });

    const sendDuration = () => {
      const seconds = Math.round((Date.now() - startTime.current) / 1000);
      if (seconds > 0) {
        track("Time on Dashboard", {
          dashboard: slug,
          seconds: String(seconds),
          bucket:
            seconds < 30
              ? "< 30s"
              : seconds < 60
                ? "30s-1m"
                : seconds < 300
                  ? "1m-5m"
                  : seconds < 600
                    ? "5m-10m"
                    : "10m+",
        });
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        sendDuration();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", sendDuration);

    return () => {
      sendDuration();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", sendDuration);
    };
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
