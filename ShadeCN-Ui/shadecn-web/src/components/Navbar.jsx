"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ModeToggle } from "./ThemeBtn";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu visibility

  return (
    <nav className="p-4 bg-background/50 sticky top-0 backdrop-blur border-b shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo - Waqas Blog's */}
        <div className="text-2xl font-extrabold tracking-wide">
          <Link href="/">
            <span className="cursor-pointer  transition duration-300 ease-in-out">
              Waqas Blog's
            </span>
          </Link>
        </div>

        {/* Mobile menu button (Hamburger icon) */}
        <div className="md:hidden flex justify-center items-center">
            <Sheet>
  <SheetTrigger>
    
          <div
            onClick={() => setIsOpen(!isOpen)}
            className=" focus:outline-none focus:ring-2 focus:ring-gray-600 rounded-md"
            aria-label="Toggle navigation"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                // Close icon (X) when menu is open
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              ) : (
                // Hamburger icon when menu is closed
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              )}
            </svg>
          </div>
  </SheetTrigger>
  <SheetContent className={"text-center"}>
    <SheetHeader>
      <SheetTitle className={"font-bold my-4"}>Waqas Blog's</SheetTitle>
      <SheetDescription>
       <div className="flex flex-col gap-6">
          <Link
            href="/"
            className=" transition duration-300 ease-in-out"
          >
            Home
          </Link>
          <Link
            href="/about"
            className=" transition duration-300 ease-in-out"
          >
            About
          </Link>
          <Link
            href="/blog"
            className=" transition duration-300 ease-in-out"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className=" transition duration-300 ease-in-out"
          >
            Contact
          </Link>

          <div className="space-x-2 flex items-center justify-center">
            <Button className="text-[12px]" variant="outline">Login</Button>
            <Button className="text-[12px]" variant="outline">Sign Up</Button>
            <ModeToggle/>
          </div>
        </div>
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
        </div>


        {/* Desktop navigation links */}
        <div className="hidden md:flex items-center space-x-6 text-lg">
          <Link
            href="/"
            className=" transition duration-300 ease-in-out"
          >
            Home
          </Link>
          <Link
            href="/about"
            className=" transition duration-300 ease-in-out"
          >
            About
          </Link>
          <Link
            href="/blog"
            className=" transition duration-300 ease-in-out"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className=" transition duration-300 ease-in-out"
          >
            Contact
          </Link>

          <div className="space-x-2 flex items-center">
            <Button variant="outline">Login</Button>
            <Button variant="outline">Sign Up</Button>
            <ModeToggle/>
          </div>
        </div>
      </div>

      {/* Mobile navigation links (conditionally rendered) */}
      {/* {isOpen && (
        <div className="md:hidden bg-gray-700 py-2 mt-2 rounded-md shadow-lg">
          <div className="flex flex-col space-y-1">
            <Link href="/" onClick={() => setIsOpen(false)} className="block py-2 px-4 text-lg hover:bg-gray-600 transition duration-300 ease-in-out">
              Home
            </Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="block py-2 px-4 text-lg hover:bg-gray-600 transition duration-300 ease-in-out">
              About
            </Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="block py-2 px-4 text-lg hover:bg-gray-600 transition duration-300 ease-in-out">
              Contact
            </Link>
          </div>
        </div>
      )} */}
    </nav>
  );
};

export default Navbar;
