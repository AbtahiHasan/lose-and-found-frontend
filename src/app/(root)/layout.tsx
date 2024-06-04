import Navbar from "@/components/shared/Navbar";
import { getUser } from "@/lib/actions/auth.action";
import { ReactNode } from "react";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getUser();
  return (
    <main>
      <Navbar user={user} />
      <section className="min-h-[calc(100vh-64px)] mt-[64px]">
        {children}
      </section>
    </main>
  );
};

export default RootLayout;
