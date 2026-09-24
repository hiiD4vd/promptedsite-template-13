import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PROMPTEDSITE | Franchise",
  description: "Open a PromptedSite location in your city. $12,000 a year and up, at a 31% margin.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <script type="module" src="/js/model-viewer.js"></script>
      </head>
      <body className="page__body antialiased">
        {children}
      </body>
    </html>
  );
}
