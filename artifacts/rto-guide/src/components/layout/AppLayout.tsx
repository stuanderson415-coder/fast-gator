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

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home, match: (l: string) => l === "/" },
  {
    href: "/standards",
    label: "Standards",
    icon: LayoutList,
    match: (l: string) => l.startsWith("/standards") || l.startsWith("/quality-areas"),
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
    match: (l: string) => l.startsWith("/notes") || l.startsWith("/favorites"),
  },
];

export function AppLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground flex items-stretch justify-center">
      {/* Phone shell */}
      <div className="w-full max-w-[440px] flex flex-col min-h-screen relative bg-background border-x border-border/40">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-background/85 backdrop-blur-xl border-b border-border/50">
          <div className="px-5 pt-5 pb-3 flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-primary" />
                </div>
                <div className="leading-none">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    RTO Guide
                  </div>
                  <div className="text-sm font-medium text-foreground mt-0.5">
                    Standards 2025
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/favorites">
              <button
                className="w-9 h-9 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors"
                aria-label="Favorites"
                data-testid="button-header-favorites"
              >
                <Star className="w-4 h-4 text-foreground/80" />
              </button>
            </Link>
          </div>
        </header>

        {/* Scroll area */}
        <main className="flex-1 px-5 pt-5 pb-28 overflow-x-hidden">
          {children}
        </main>

        {/* Bottom tab bar */}
        <nav
          className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-30"
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
