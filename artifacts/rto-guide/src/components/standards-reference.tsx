import { useState } from "react";
import {
  BookOpen,
  Calendar,
  Users,
  Shield,
  ChevronDown,
  ExternalLink,
} from "lucide-react";

const FACTS = [
  {
    icon: Calendar,
    label: "In effect",
    value: "1 Jul 2025",
    detail:
      "Replaces the 2015 Standards for RTOs. Old framework retired the day before.",
  },
  {
    icon: Users,
    label: "Applies to",
    value: "All RTOs",
    detail:
      "TAFEs, private and enterprise RTOs delivering nationally recognised training.",
  },
  {
    icon: Shield,
    label: "Regulator",
    value: "ASQA",
    detail:
      "Australian Skills Quality Authority audits against the Standards.",
  },
  {
    icon: BookOpen,
    label: "Structure",
    value: "4 areas · 18",
    detail:
      "18 Standards across Training & Assessment, VET Workforce, Student Support, Governance.",
  },
];

export function StandardsReference() {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl bg-card border border-border overflow-hidden">
      <div className="p-5">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-primary/80 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          About this guide
        </div>
        <h2 className="font-serif text-lg font-medium text-foreground mt-2 leading-snug">
          The <span className="italic text-primary">RTO Standards 2025</span>,
          made practical.
        </h2>
        <p className="text-[13px] text-muted-foreground mt-2 leading-relaxed">
          Australia&rsquo;s revised framework came into force on 1 July 2025.
          Each Standard is broken down into concrete strategies you can try,
          track and reflect on.
        </p>

        {/* 2x2 facts */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {FACTS.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="rounded-xl bg-muted/40 border border-border/60 p-3"
            >
              <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-muted-foreground font-medium">
                <Icon className="w-3 h-3" />
                {label}
              </div>
              <div className="font-serif text-sm font-medium text-foreground mt-1">
                {value}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="text-[12px] text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1 font-medium"
            data-testid="button-toggle-reference"
          >
            {open ? "Show less" : "More about the framework"}
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>
          <a
            href="https://www.asqa.gov.au/standards"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-muted-foreground hover:text-primary inline-flex items-center gap-1 transition-colors"
          >
            ASQA
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {open && (
          <div className="mt-4 space-y-3 border-t border-border pt-4 animate-in fade-in slide-in-from-top-1 duration-300">
            {FACTS.map(({ icon: Icon, label, detail }) => (
              <div key={label} className="flex gap-3">
                <Icon className="w-3.5 h-3.5 text-primary mt-1 shrink-0" />
                <div>
                  <div className="text-foreground font-medium text-[12px]">
                    {label}
                  </div>
                  <div className="text-[12px] text-muted-foreground leading-relaxed">
                    {detail}
                  </div>
                </div>
              </div>
            ))}
            <p className="text-[10px] italic text-muted-foreground/80 border-t border-border/40 pt-3">
              This guide paraphrases the Standards for practical use. For the
              legal text, always consult ASQA materials.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
