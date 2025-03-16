"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart,
  Users,
  UserCircle,
  User,
  Home,
  Users2,
  Building,
  Building2,
  FileText,
  DollarSign,
  Banknote,
  Landmark,
  BarChart2,
  Calendar,
  MapPin,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "../contexts/SidebarContext";

interface NavItem {
  href: string;
  icon: React.ElementType;
  label: string;
  hasSubMenu?: boolean;
}

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  active?: boolean;
  hasSubMenu?: boolean;
  expanded?: boolean;
  onClick?: () => void;
}

const NavItem = ({
  href,
  icon: Icon,
  label,
  active,
  hasSubMenu,
  expanded,
  onClick,
}: NavItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center py-2 px-4 text-sm rounded-lg transition-colors",
        active ? "text-red-500 bg-red-50" : "text-gray-700 hover:bg-gray-100"
      )}
      onClick={onClick}
      aria-label={label}
    >
      <Icon className="h-5 w-5 mr-3" />
      <span className="flex-1">{label}</span>
      {hasSubMenu && (
        <svg
          className={cn(
            "ml-auto h-4 w-4 transition-transform",
            expanded ? "transform rotate-90" : ""
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      )}
    </Link>
  );
};

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen, toggleSidebar, closeSidebar } = useSidebar();

  const navItems: NavItem[] = [
    { href: "/dashboard", icon: BarChart, label: "Stats" },
    { href: "/dashboard/admin", icon: UserCircle, label: "Admin" },
    { href: "/dashboard/agent", icon: User, label: "Agent" },
    { href: "/dashboard/owner", icon: Home, label: "Owner" },
    { href: "/dashboard/team", icon: Users2, label: "Team" },
    {
      href: "/dashboard/developer",
      icon: Building,
      label: "Developer",
      hasSubMenu: true,
    },
    {
      href: "/dashboard/projects",
      icon: Building2,
      label: "Project",
      hasSubMenu: true,
    },
    { href: "/dashboard/property", icon: Landmark, label: "Property" },
    { href: "/dashboard/listing", icon: FileText, label: "Listing" },
    { href: "/dashboard/leads", icon: Users, label: "Leads" },
    { href: "/dashboard/customer", icon: Users, label: "Customer" },
    { href: "/dashboard/analytics", icon: BarChart2, label: "Analytics" },
    { href: "/dashboard/sales", icon: DollarSign, label: "Sales" },
    { href: "/dashboard/income", icon: Banknote, label: "Income Generated" },
    { href: "/dashboard/site-visit", icon: MapPin, label: "Site Visit" },
    { href: "/dashboard/booking", icon: Calendar, label: "Booking" },
  ];

  const isItemActive = (itemHref: string): boolean => {
    if (itemHref === "/dashboard") {
      return pathname === "/dashboard";
    }

    return pathname.startsWith(itemHref);
  };

  return (
    <>
      <div
        className={cn(
          "fixed top-0 left-0 h-screen bg-white border-r transition-transform duration-300 ease-in-out z-20",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
          "w-64"
        )}
      >
        <div className="flex items-center p-4 border-b">
          <div className="w-10 h-10 bg-red-500 text-white rounded-lg flex items-center justify-center mr-3">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Housing Mantra</h2>
            <p className="text-xs text-gray-500">Super Admin</p>
          </div>
          <button
            className="lg:hidden ml-auto text-gray-500"
            onClick={toggleSidebar}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-3 overflow-y-auto h-[calc(100vh-100px)]">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                active={isItemActive(item.href)}
                hasSubMenu={item.hasSubMenu}
                onClick={closeSidebar}
              />
            ))}
          </nav>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 lg:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
}
