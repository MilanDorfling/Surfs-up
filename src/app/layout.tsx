import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Surfs Up | Custom Surfboards",
  description: "Ride the perfect wave with a custom-built surfboard crafted just for you.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
