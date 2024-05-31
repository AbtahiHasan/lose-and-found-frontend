import Navbar from "@/components/shared/Navbar";
import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <Navbar />
      <section className="min-h-[calc(100vh-64px)] mt-[64px]">
        {children}
      </section>
    </main>
  );
};

export default RootLayout;
