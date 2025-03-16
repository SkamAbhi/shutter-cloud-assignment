"use client";

import Link from "next/link";
import { Menu, PanelLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { useSidebar } from "../contexts/SidebarContext";
import Breadcrumbs from "./BreadCrumbs";

const Header = () => {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <header
      className={cn(
        "bg-white border-b py-3 px-4 sticky top-0 z-10",
        "lg:ml-64  "
      )}
    >
      <div className="max-w-[1200px]  flex items-center justify-between">
        <button
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={toggleSidebar}
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        >
          <Menu size={20} className="text-gray-600" />
        </button>

        <Link
          href="/dashboard"
          className="hidden lg:flex items-center hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 p-2 rounded-md"
        >
          <PanelLeft size={20} className="text-gray-600" />
        </Link>

        <Breadcrumbs />
      </div>
    </header>
  );
};

export default Header;
