import PlausibleProvider from "next-plausible";

export const metadata = {
  title: "Dashboard Viewer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://static.hex.site/embed/embedStyles.css"
        />
        <PlausibleProvider
          domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || ""}
          customDomain={process.env.NEXT_PUBLIC_PLAUSIBLE_CUSTOM_DOMAIN}
          selfHosted={!!process.env.NEXT_PUBLIC_PLAUSIBLE_CUSTOM_DOMAIN}
        />
      </head>
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
