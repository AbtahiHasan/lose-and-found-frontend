"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { NavLink } from "next-js-active-route";
import logo from "../../../public/logo.svg";
import { MdLogout } from "react-icons/md";
import man from "../../../public/male.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { logout } from "@/lib/actions/auth.action";
const navigation = [
  { name: "Home", href: "/", exact: true },
  { name: "About Us", href: "/about", exact: false },
  { name: "Recent Posts", href: "/recent-posts", exact: false },
  { name: "Submit Lost Item", href: "/submit-the-lost-item", exact: false },
  { name: "Submit Found Item", href: "/submit-the-found-item", exact: false },
  { name: "My Lost Items", href: "/my-lost-items", exact: false },
  { name: "My Profile", href: "/profile", exact: false },
];

const Navbar = ({ user }: { user: any }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [blur, setBlur] = useState(0);

  console.log({ user });
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxBlur = 10;
      const blurValue = Math.min(scrollY / 100, maxBlur);
      setBlur(blurValue);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleLogout = () => {
    logout().then(() => {
      window.location.reload();
    });
  };
  return (
    <div className="">
      <header className="fixed inset-x-0 top-0 z-50">
        <nav
          className={`flex items-center justify-between p-3 lg:px-8  ${
            blur > 0 ? `bg-[#020817] border-b` : "backdrop-blur-sm"
          }`}
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image
                width={32}
                height={32}
                className="h-8 w-auto"
                src={logo}
                alt="Logo"
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex ">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                href={item.href}
                exact={item.exact}
                activeClassName="bg-indigo-500 "
                className="text-sm font-semibold leading-6 text-white px-3 py-2 rounded-md"
              >
                {item.name}
              </NavLink>
            ))}
          </div>
          <div className="hidden lg:flex gap-2 lg:flex-1 lg:justify-end">
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="rounded-md border-indigo-500 border px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Login <span aria-hidden="true">→</span>
                </Link>
                <Link
                  href="/sign-up"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="no">
                          <Image
                            className="rounded-full"
                            src={man}
                            alt="Profile"
                            width={32}
                            height={32}
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{user?.username}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <MdLogout
                    onClick={handleLogout}
                    className="cursor-pointer text-2xl text-red-600"
                  />
                </div>
              </>
            )}
          </div>
        </nav>
        <Dialog
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed bg-[#020817] inset-y-0 right-0 z-50 w-full overflow-y-auto  px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <Image
                  height={42}
                  width={42}
                  className="h-8 w-auto"
                  src={logo}
                  alt=""
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      href={item.href}
                      exact={item.exact}
                      activeClassName="bg-indigo-500 "
                      // className="text-sm font-semibold leading-6 text-white px-3 py-2 rounded-md"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white/90 hover:text-white"
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </div>
  );
};

export default Navbar;
