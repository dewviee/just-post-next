import ToastContainerWrapper from "@/components/ToastContainerWrapper";
import "@/styles/globals.css";
import type { Metadata } from "next";

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
      <link rel="icon" href="./favicon.ico" sizes="any" />
      <body>
        <ToastContainerWrapper />
        {children}
      </body>
    </html>
  );
}
