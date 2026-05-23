"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Zap, Award, Users, Settings } from "lucide-react";
import clsx from "clsx";

const navItems = [
  { href: "/dashboard", label: "Accueil", icon: Home },
  { href: "/trips", label: "Trajets", icon: Zap },
  { href: "/missions", label: "Missions", icon: Award },
  { href: "/referral", label: "Parrainage", icon: Users },
  { href: "/profile", label: "Profil", icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-bee-card border-t border-bee-yellow shadow-lg">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              "flex flex-col items-center justify-center py-3 px-4 flex-1 transition-colors",
              pathname.startsWith(href)
                ? "text-bee-yellow border-t-2 border-bee-yellow"
                : "text-bee-text"
            )}
          >
            <Icon size={24} />
            <span className="text-xs mt-1">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
