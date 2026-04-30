import { type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { BookOpen, CheckCircle, Home, LayoutList, Lightbulb, Star, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/standards", label: "Standards", icon: LayoutList },
  { href: "/strategies", label: "Strategies", icon: Lightbulb },
  { href: "/favorites", label: "Favorites", icon: Star },
  { href: "/notes", label: "Notes", icon: BookOpen },
];

export function AppLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 border-b bg-card z-10 sticky top-0">
        <div className="flex items-center gap-2 text-primary">
          <BookOpen className="w-6 h-6" />
          <span className="font-serif font-bold text-lg">RTO Guide</span>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SheetHeader className="p-6 text-left border-b">
              <SheetTitle className="flex items-center gap-2 text-primary font-serif">
                <BookOpen className="w-6 h-6" />
                RTO Guide 2025
              </SheetTitle>
            </SheetHeader>
            <nav className="p-4 space-y-1">
              {NAV_ITEMS.map((item) => {
                const active = location === item.href || (item.href !== "/" && location.startsWith(item.href));
                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors cursor-pointer ${
                        active
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </div>
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r bg-card h-screen sticky top-0 shrink-0">
        <div className="p-6 border-b">
          <Link href="/">
            <div className="flex items-center gap-2 text-primary cursor-pointer hover:opacity-80 transition-opacity">
              <BookOpen className="w-6 h-6" />
              <span className="font-serif font-bold text-lg">RTO Guide 2025</span>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const active = location === item.href || (item.href !== "/" && location.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors cursor-pointer ${
                    active
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t text-xs text-muted-foreground">
          <p>Practice Guide for VET</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 p-4 md:p-8 lg:p-12 max-w-6xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
