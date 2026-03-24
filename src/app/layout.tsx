import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mystic Tarot — Online Tarot Reader",
  description: "Discover insights through the ancient wisdom of tarot. Get readings from virtual spreads or upload a photo of your own cards.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <div className="main-content">{children}</div>
      </body>
    </html>
  );
}
