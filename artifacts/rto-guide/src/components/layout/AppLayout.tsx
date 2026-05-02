import { type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import {
  BookOpen,
  Home,
  LayoutList,
  Lightbulb,
  Star,
  GraduationCap,
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
    href: "/notes",
    label: "Notes",
    icon: BookOpen,
    match: (l: string) =>
      l.startsWith("/notes") || l.startsWith("/favorites"),
  },
];

export function AppLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground flex">

      {/* ── Desktop left sidebar ───────────────────────────────────────── */}
      <aside
        className="hidden md:flex flex-col fixed inset-y-0 left-0 z-20 w-56 border-r border-border/50"
        style={{ background: "hsl(240,6%,7%)" }}
      >
        {/* Sidebar logo */}
        <div className="px-5 pt-7 pb-5 border-b border-border/40">
          <Link href="/">
            <FastigiataLogo variant="wordmark" size="sm" className="cursor-pointer" />
          </Link>
        </div>

        {/* Sidebar nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const active = item.match(location);
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                    active
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  }`}
                  data-testid={`sidebar-nav-${item.label.toLowerCase()}`}
                >
                  <item.icon
                    className="w-4 h-4 shrink-0"
                    strokeWidth={active ? 2.4 : 1.8}
                  />
                  <span className="text-sm font-medium">{item.label}</span>
                  {active && (
                    <span
                      className="ml-auto w-1.5 h-1.5 rounded-full"
                      style={{ background: "hsl(28,90%,62%)" }}
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="px-5 py-4 border-t border-border/40">
          <div className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: "hsl(28,90%,60%)" }}
            />
            <p className="text-[10px] text-muted-foreground/60 tracking-wider uppercase">
              RTO Standards Companion
            </p>
          </div>
        </div>
      </aside>

      {/* ── Main column ────────────────────────────────────────────────── */}
      <div className="flex-1 md:ml-56 flex flex-col min-h-screen">

        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-background/85 backdrop-blur-xl border-b border-border/50">
          <div className="px-4 pt-4 pb-3 flex items-center justify-between gap-3 max-w-4xl mx-auto">

            {/* Logo — mobile only (desktop has sidebar); tapping goes home */}
            <Link href="/" className="flex-1 md:flex-none">
              <span className="md:hidden">
                <FastigiataLogo variant="wordmark" className="cursor-pointer" />
              </span>
              {/* Desktop: show current section label */}
              <span className="hidden md:block text-sm font-semibold text-foreground/70 tracking-wide">
                {NAV_ITEMS.find((n) => n.match(location))?.label ?? ""}
              </span>
            </Link>

            {/* Favorites star */}
            <Link href="/favorites">
              <button
                className="w-9 h-9 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors"
                aria-label="Favorites"
                data-testid="button-header-favorites"
              >
                <Star className="w-4 h-4" style={{ color: "hsl(28,90%,62%)" }} />
              </button>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-5 pt-5 pb-28 md:pb-10 overflow-x-hidden max-w-4xl mx-auto w-full">
          {children}
        </main>

        {/* ── Mobile-only bottom tab bar ──────────────────────────────── */}
        <nav
          className="md:hidden fixed bottom-0 left-0 right-0 z-30"
          aria-label="Primary"
        >
          <div className="mx-3 mb-3 rounded-2xl bg-card/90 backdrop-blur-xl border border-border shadow-2xl shadow-black/40">
            <div className="grid grid-cols-5 gap-1 p-2">
              {NAV_ITEMS.map((item) => {
                const active = item.match(location);
                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      className={`flex flex-col items-center justify-center gap-1 py-2 rounded-xl cursor-pointer transition-all ${
                        active
                          ? "bg-primary/15 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                      }`}
                      data-testid={`tab-${item.label.toLowerCase()}`}
                    >
                      <item.icon
                        className="w-[18px] h-[18px]"
                        strokeWidth={active ? 2.4 : 1.8}
                      />
                      <span className="text-[10px] font-medium leading-none">
                        {item.label}
                      </span>
                      {active && (
                        <span
                          className="w-1 h-1 rounded-full"
                          style={{ background: "hsl(28,90%,62%)" }}
                        />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
