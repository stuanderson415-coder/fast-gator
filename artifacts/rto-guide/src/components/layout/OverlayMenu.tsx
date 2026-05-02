import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import {
  BookOpen,
  GraduationCap,
  Home,
  LayoutList,
  Lightbulb,
  Star,
  X,
} from "lucide-react";
import { FastigiataLogo } from "@/components/fastigiata-logo";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home, match: (l: string) => l === "/" },
  {
    href: "/standards",
    label: "Standards",
    icon: LayoutList,
    match: (l: string) =>
      l.startsWith("/standards") || l.startsWith("/quality-areas"),
  },
  {
    href: "/training",
    label: "Training",
    icon: GraduationCap,
    match: (l: string) => l.startsWith("/training"),
  },
  {
    href: "/strategies",
    label: "Strategies",
    icon: Lightbulb,
    match: (l: string) => l.startsWith("/strategies"),
  },
  {
    href: "/favorites",
    label: "Favorites",
    icon: Star,
    match: (l: string) => l.startsWith("/favorites"),
  },
  {
    href: "/notes",
    label: "Notes",
    icon: BookOpen,
    match: (l: string) => l.startsWith("/notes"),
  },
];

interface OverlayMenuProps {
  open: boolean;
  onClose: () => void;
}

export function OverlayMenu({ open, onClose }: OverlayMenuProps) {
  const [location] = useLocation();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Scrim */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(2px)" }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={`fixed top-0 left-0 bottom-0 z-50 flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          width: "min(78vw, calc(440px * 0.82))",
          maxWidth: 340,
          background:
            "linear-gradient(160deg, hsl(268, 68%, 28%) 0%, hsl(262, 62%, 22%) 60%, hsl(255, 58%, 18%) 100%)",
          boxShadow: open ? "8px 0 40px rgba(0,0,0,0.6)" : "none",
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Subtle grain */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(hsl(0,0%,100%) 0.5px, transparent 0.5px)",
            backgroundSize: "3px 3px",
          }}
        />

        {/* Header */}
        <div className="relative flex items-center justify-between px-5 pt-12 pb-7 border-b border-white/10">
          <FastigiataLogo variant="wordmark" className="text-lg" />
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center hover:bg-black/50 transition-colors"
            aria-label="Close menu"
            data-testid="button-close-overlay"
          >
            <X className="w-4 h-4 text-white/80" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="relative flex-1 overflow-y-auto px-4 py-5 space-y-2">
          {NAV_ITEMS.map((item) => {
            const active = item.match(location);
            return (
              <Link key={item.href} href={item.href} onClick={onClose}>
                <div
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl cursor-pointer transition-all ${
                    active
                      ? "bg-white text-black shadow-lg shadow-black/30"
                      : "bg-black/35 text-white/90 hover:bg-black/50 shadow-md shadow-black/20"
                  }`}
                  data-testid={`overlay-nav-${item.label.toLowerCase()}`}
                >
                  <item.icon
                    className={`w-[18px] h-[18px] shrink-0 ${active ? "text-black" : "text-white/80"}`}
                    strokeWidth={active ? 2.2 : 1.8}
                  />
                  <span
                    className={`text-sm font-medium ${active ? "text-black" : "text-white/90"}`}
                  >
                    {item.label}
                  </span>
                  {active && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-black/40" />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="relative px-5 pb-8 pt-4 border-t border-white/10">
          <p className="text-[10px] text-white/30 tracking-wider uppercase">
            RTO Standards 2025 · Practice Guide
          </p>
        </div>
      </div>
    </>
  );
}
