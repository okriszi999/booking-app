"use client";

import {
  NavigationMenuList,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import clsx from "clsx";
import Link from "next/link";

const baseUrl = "/admin";

const routes = [
  {
    name: "Dashboard",
    path: baseUrl,
  },
  {
    name: "Contractors",
    path: `${baseUrl}/contractors`,
  },
];

export default function AdminNavigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="p-4 gap-2">
        {routes.map((route) => (
          <NavigationMenuItem key={route.path}>
            <Link href={route.path} passHref legacyBehavior>
              <NavigationMenuLink
                className={clsx(navigationMenuTriggerStyle())}
              >
                {route.name}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
