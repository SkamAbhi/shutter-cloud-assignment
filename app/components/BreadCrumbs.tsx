"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  return (
    <nav
      aria-label="breadcrumb"
      className="flex-1 flex items-center text-sm text-gray-600 overflow-x-auto whitespace-nowrap scrollbar-hidden"
    >
      <ol className="flex items-center">
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;
          const isIdSegment =
            isLast && pathSegments[pathSegments.length - 1] !== "edit";
          const label = segment.charAt(0).toUpperCase() + segment.slice(1);

          return (
            <li key={href} className="flex items-center">
              {index > 0 && <span className="text-gray-500 mx-1">{`>`}</span>}
              {isLast && !isIdSegment ? (
                <span className="text-black font-semibold">{label}</span>
              ) : isIdSegment ? (
                <span className="text-gray-500 text-xs">{segment}</span>
              ) : (
                <Link href={href} className="text-gray-500">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
