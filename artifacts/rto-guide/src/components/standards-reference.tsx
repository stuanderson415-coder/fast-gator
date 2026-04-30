import { useState } from "react";
import {
  BookOpen,
  Calendar,
  Users,
  Shield,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FACTS = [
  {
    icon: Calendar,
    label: "In effect",
    value: "1 July 2025",
    detail:
      "Replaces the 2015 Standards for RTOs. Old framework retired the day before.",
  },
  {
    icon: Users,
    label: "Applies to",
    value: "All registered RTOs",
    detail:
      "TAFEs, private RTOs, enterprise RTOs and dual-sector providers delivering nationally recognised training.",
  },
  {
    icon: Shield,
    label: "Regulator",
    value: "ASQA",
    detail:
      "The Australian Skills Quality Authority audits against the Standards. WA and VIC have parallel arrangements.",
  },
  {
    icon: BookOpen,
    label: "Structure",
    value: "4 Quality Areas",
    detail:
      "18 Standards rolled up into Training & Assessment, VET Workforce, Student Support, and Governance.",
  },
];

export function StandardsReference() {
  const [open, setOpen] = useState(false);

  return (
    <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-[hsl(45,40%,97%)] to-[hsl(45,30%,93%)] dark:from-[hsl(160,22%,14%)] dark:to-[hsl(160,20%,11%)]">
      <CardContent className="p-0">
        {/* Header strip */}
        <div className="flex items-stretch">
          <div
            className="w-1.5 shrink-0"
            style={{
              background:
                "linear-gradient(to bottom, hsl(155, 35%, 30%), hsl(35, 75%, 45%))",
            }}
            aria-hidden="true"
          />
          <div className="flex-1 p-6 sm:p-7">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1">
                <div className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground font-medium">
                  About this guide
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-foreground mt-2 leading-tight">
                  The <span className="italic">RTO Standards 2025</span>, made
                  practical.
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground mt-3 max-w-2xl leading-relaxed">
                  Australia&rsquo;s revised framework for vocational education
                  came into force on 1 July 2025. This guide turns each
                  Standard into concrete strategies you can try, track and
                  reflect on — without leaving the page.
                </p>
              </div>
            </div>

            {/* Quick facts row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
              {FACTS.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="rounded-md bg-background/70 backdrop-blur-sm border border-border/60 p-3"
                >
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </div>
                  <div className="font-serif text-base sm:text-lg font-medium text-foreground mt-1 leading-tight">
                    {value}
                  </div>
                </div>
              ))}
            </div>

            {/* Disclosure */}
            <div className="mt-5 flex items-center justify-between gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:text-primary -ml-2"
                onClick={() => setOpen((o) => !o)}
                data-testid="button-toggle-reference"
              >
                {open ? "Show less" : "More about the framework"}
                <ChevronDown
                  className={`w-4 h-4 ml-1 transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </Button>
              <a
                href="https://www.asqa.gov.au/standards"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-primary inline-flex items-center gap-1 transition-colors"
              >
                ASQA reference
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {open && (
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm text-muted-foreground leading-relaxed border-t border-border/60 pt-5 animate-in fade-in slide-in-from-top-1 duration-300">
                {FACTS.map(({ icon: Icon, label, detail }) => (
                  <div key={label} className="flex gap-3">
                    <Icon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <div className="text-foreground font-medium text-sm">
                        {label}
                      </div>
                      <div className="text-sm">{detail}</div>
                    </div>
                  </div>
                ))}
                <div className="md:col-span-2 text-xs italic text-muted-foreground/80 border-t border-border/40 pt-4">
                  This guide paraphrases the Standards for practical use. For
                  the legal text and audit obligations, always consult the
                  official ASQA materials.
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
