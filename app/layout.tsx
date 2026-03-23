import { Analytics } from "@vercel/analytics/next";

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
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
