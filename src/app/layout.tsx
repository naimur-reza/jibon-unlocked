import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Amar Ghor | আমার ঘর", description: "ছোট ছোট স্মৃতিতে সাজানো আমার পৃথিবী" };
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) { return <html lang="bn"><body>{children}</body></html>; }
