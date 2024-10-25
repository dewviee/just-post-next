import type { Metadata } from "next";
import "@/styles/globals.css";
import ToastContainerWrapper from "@/components/ToastContainerWrapper";

export const metadata: Metadata = {
  title: "Just Post",
  description: "A Posting Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastContainerWrapper />
        {children}
      </body>
    </html>
  );
}
