import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./scrollbar.css";
import loseAndFound from "../../public/lose-and-found.png";
import Image from "next/image";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lose and found",
  description: "Lose and found",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " relative"}>
        <svg
          className="absolute inset-0 -z-10 h-full w-full stroke-gray-100/15 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
          />
        </svg>
        {children}
        <Image
          className="fixed inset-0 -z-10 h-full w-full object-cover opacity-5"
          src={loseAndFound}
          alt=""
        />
      </body>
    </html>
  );
}
