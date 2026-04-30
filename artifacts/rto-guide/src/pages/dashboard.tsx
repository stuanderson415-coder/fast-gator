import { useEffect } from "react";
import { Link } from "wouter";
import { useGetDashboardSummary } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowRight,
  BookOpen,
  Lightbulb,
  Star,
  TrendingUp,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import { StandardsReference } from "@/components/standards-reference";

export default function Dashboard() {
  useEffect(() => {
    document.title = "Dashboard | RTO Guide 2025";
  }, []);

  const { data: summary, isLoading, isError } = useGetDashboardSummary();

  if (isLoading) {
    return (
      <div className="space-y-5">
        <Skeleton className="h-20 w-full rounded-2xl" />
        <Skeleton className="h-44 w-full rounded-2xl" />
        <Skeleton className="h-32 w-full rounded-2xl" />
        <Skeleton className="h-56 w-full rounded-2xl" />
      </div>
    );
  }

  if (isError || !summary) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <h2 className="text-lg font-medium text-destructive">
          Failed to load dashboard
        </h2>
        <p className="text-sm text-muted-foreground">
          Please try refreshing.
        </p>
      </div>
    );
  }

  const overall = Math.round(summary.overallPercentComplete);

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      {/* Greeting */}
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Monday morning
        </p>
        <h1 className="text-2xl font-serif font-medium text-foreground mt-1">
          Welcome back.
        </h1>
      </div>

      {/* Hero progress card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/30 via-primary/15 to-card border border-primary/20 p-5">
        <div
          className="absolute -right-10 -top-10 w-44 h-44 rounded-full opacity-30 blur-3xl"
          style={{ background: "hsl(265, 80%, 60%)" }}
        />
        <div className="relative">
          <div className="flex items-center justify-between">
            <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/70">
              Your progress
            </div>
            <TrendingUp className="w-4 h-4 text-foreground/70" />
          </div>
          <div className="flex items-baseline gap-2 mt-3">
            <span className="text-5xl font-serif font-bold text-foreground tabular-nums">
              {overall}
            </span>
            <span className="text-2xl font-serif text-foreground/60">%</span>
            <span className="text-xs text-muted-foreground ml-2">
              of 18 standards embedded
            </span>
          </div>
          <div className="mt-4 h-1.5 rounded-full bg-foreground/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[hsl(280,90%,75%)] to-[hsl(255,80%,65%)] transition-all duration-700"
              style={{ width: `${overall}%` }}
            />
          </div>
          <div className="grid grid-cols-3 gap-3 mt-5">
            <Stat
              label="Embedded"
              value={summary.embeddedCount}
              dotClass="bg-primary"
            />
            <Stat
              label="In progress"
              value={summary.inProgressCount + summary.planningCount}
              dotClass="bg-[hsl(220,70%,65%)]"
            />
            <Stat
              label="Not started"
              value={summary.notStartedCount}
              dotClass="bg-muted-foreground/40"
            />
          </div>
        </div>
      </div>

      <StandardsReference />

      {/* Quick actions row */}
      <div className="grid grid-cols-2 gap-3">
        <QuickTile
          href="/favorites"
          icon={Star}
          label="Favorites"
          value={summary.favoriteCount}
          accent="text-[hsl(45,90%,65%)]"
        />
        <QuickTile
          href="/notes"
          icon={BookOpen}
          label="Reflections"
          value={summary.noteCount}
          accent="text-[hsl(200,70%,65%)]"
        />
      </div>

      {/* Strategy of the day */}
      {summary.featured && (
        <section>
          <SectionHeader
            icon={Sparkles}
            title="Strategy of the day"
          />
          <Link href={`/standards/${summary.featured.strategy.standardId}`}>
            <div className="rounded-2xl bg-card border border-border p-4 cursor-pointer hover:border-primary/40 transition-colors group">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-medium text-foreground leading-snug">
                    {summary.featured.strategy.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                    {summary.featured.strategy.summary}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center shrink-0 group-hover:bg-primary/25 transition-colors">
                  <Lightbulb className="w-4 h-4 text-primary" />
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border/60 flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground italic">
                  Why? {summary.featured.rationale}
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Quality areas */}
      <section>
        <SectionHeader icon={GraduationCap} title="Quality areas" />
        <div className="space-y-2.5">
          {summary.qualityAreaProgress.map((qa) => (
            <Link
              key={qa.qualityAreaId}
              href={`/quality-areas/${qa.qualityAreaId}`}
            >
              <div className="rounded-xl bg-card border border-border p-4 cursor-pointer hover:border-primary/40 transition-colors group">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-primary/80 px-1.5 py-0.5 rounded bg-primary/10">
                        {qa.qualityAreaCode}
                      </span>
                    </div>
                    <h3 className="text-sm font-medium text-foreground mt-1.5 line-clamp-1">
                      {qa.qualityAreaTitle}
                    </h3>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-lg font-serif font-medium text-foreground tabular-nums">
                      {Math.round(qa.percentComplete)}
                      <span className="text-xs text-muted-foreground">%</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 h-1 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary/80"
                    style={{ width: `${qa.percentComplete}%` }}
                  />
                </div>
                <div className="mt-2.5 flex gap-3 text-[10px] text-muted-foreground">
                  <DotStat
                    n={qa.embeddedCount}
                    label="embedded"
                    cls="bg-primary"
                  />
                  <DotStat
                    n={qa.inProgressCount}
                    label="active"
                    cls="bg-[hsl(220,70%,65%)]"
                  />
                  <DotStat
                    n={qa.planningCount}
                    label="planning"
                    cls="bg-[hsl(280,50%,65%)]"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent reflections */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <SectionHeader icon={BookOpen} title="Recent reflections" inline />
          <Link
            href="/notes"
            className="text-[11px] text-primary hover:text-primary/80 inline-flex items-center gap-0.5"
          >
            All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        {summary.recentNotes.length > 0 ? (
          <div className="space-y-2">
            {summary.recentNotes.slice(0, 3).map((note) => (
              <Link key={note.id} href={`/standards/${note.standardId}`}>
                <div className="rounded-xl bg-card border border-border p-3 cursor-pointer hover:border-primary/40 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono uppercase text-primary/80 tracking-wider">
                      Standard {note.standardCode}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(note.updatedAt).toLocaleDateString(undefined, {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>
                  <p className="text-xs text-foreground/85 line-clamp-2 leading-relaxed">
                    {note.body}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border p-5 text-center">
            <BookOpen className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">
              No reflections yet. Add notes as you implement strategies.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  dotClass,
}: {
  label: string;
  value: number;
  dotClass: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5">
        <div className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
      </div>
      <div className="text-lg font-serif font-medium text-foreground mt-0.5 tabular-nums">
        {value}
      </div>
    </div>
  );
}

function QuickTile({
  href,
  icon: Icon,
  label,
  value,
  accent,
}: {
  href: string;
  icon: typeof Star;
  label: string;
  value: number;
  accent: string;
}) {
  return (
    <Link href={href}>
      <div className="rounded-2xl bg-card border border-border p-4 cursor-pointer hover:border-primary/40 transition-colors">
        <div className="flex items-center justify-between">
          <Icon className={`w-4 h-4 ${accent}`} />
          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
        </div>
        <div className="mt-3">
          <div className="text-2xl font-serif font-medium text-foreground tabular-nums">
            {value}
          </div>
          <div className="text-[11px] text-muted-foreground mt-0.5">
            {label}
          </div>
        </div>
      </div>
    </Link>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  inline,
}: {
  icon: typeof Star;
  title: string;
  inline?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 ${inline ? "" : "mb-3"} text-foreground`}
    >
      <Icon className="w-3.5 h-3.5 text-primary" />
      <h2 className="text-xs uppercase tracking-[0.2em] font-medium text-foreground/85">
        {title}
      </h2>
    </div>
  );
}

function DotStat({
  n,
  label,
  cls,
}: {
  n: number;
  label: string;
  cls: string;
}) {
  return (
    <span className="flex items-center gap-1">
      <span className={`w-1.5 h-1.5 rounded-full ${cls}`} />
      <span className="tabular-nums">{n}</span> {label}
    </span>
  );
}
