import { useEffect, useState } from "react";
import { Link } from "wouter";
import trainingHero from "@/assets/training-hero.png";
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Clock,
  GraduationCap,
  Play,
  Lock,
  Award,
  ChevronRight,
  PlayCircle,
  FileText,
  HelpCircle,
} from "lucide-react";

type ModuleStatus = "completed" | "in-progress" | "locked";
type LessonKind = "video" | "reading" | "quiz" | "reflection";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  kind: LessonKind;
  status: "done" | "current" | "todo";
}

interface Module {
  id: string;
  number: number;
  title: string;
  description: string;
  duration: string;
  lessons: number;
  status: ModuleStatus;
  progress: number;
}

const COURSE = {
  code: "RTO-2025-101",
  title: "Implementing the new Standards in your training practice",
  description:
    "A practical onboarding course for trainers and assessors moving from the 2015 to the 2025 RTO Standards.",
  totalDuration: "3h 40m",
  modulesCompleted: 1,
  totalModules: 4,
};

const MODULES: Module[] = [
  {
    id: "m1",
    number: 1,
    title: "What changed in 2025",
    description:
      "A 30-minute orientation on the four Quality Areas and what's new vs. 2015.",
    duration: "30 min",
    lessons: 5,
    status: "completed",
    progress: 100,
  },
  {
    id: "m2",
    number: 2,
    title: "Designing assessment for the new Standards",
    description:
      "Validity, sufficiency, currency and authenticity — applied to your unit of competency.",
    duration: "55 min",
    lessons: 7,
    status: "in-progress",
    progress: 40,
  },
  {
    id: "m3",
    number: 3,
    title: "Trainer & assessor competency evidence",
    description:
      "Mapping your industry currency, PD and credentials against Standard 6.",
    duration: "45 min",
    lessons: 6,
    status: "locked",
    progress: 0,
  },
  {
    id: "m4",
    number: 4,
    title: "Building a learner-support system that scales",
    description:
      "From enrolment information to reasonable adjustments — what auditors look for.",
    duration: "1 h 30 min",
    lessons: 9,
    status: "locked",
    progress: 0,
  },
];

const CURRENT_LESSONS: Lesson[] = [
  {
    id: "l1",
    title: "Welcome and learning outcomes",
    duration: "3 min",
    kind: "video",
    status: "done",
  },
  {
    id: "l2",
    title: "Reading: principles of assessment",
    duration: "8 min",
    kind: "reading",
    status: "done",
  },
  {
    id: "l3",
    title: "Walkthrough: an evidence-rich rubric",
    duration: "12 min",
    kind: "video",
    status: "current",
  },
  {
    id: "l4",
    title: "Knowledge check",
    duration: "5 min",
    kind: "quiz",
    status: "todo",
  },
  {
    id: "l5",
    title: "Reflect: where will you start tomorrow?",
    duration: "10 min",
    kind: "reflection",
    status: "todo",
  },
];

const KIND_META: Record<
  LessonKind,
  { icon: typeof Play; label: string }
> = {
  video: { icon: PlayCircle, label: "Video" },
  reading: { icon: FileText, label: "Reading" },
  quiz: { icon: HelpCircle, label: "Quiz" },
  reflection: { icon: GraduationCap, label: "Reflection" },
};

export default function TrainingPage() {
  useEffect(() => {
    document.title = "Training | RTO Standards Companion";
  }, []);

  const overallPercent = Math.round(
    (COURSE.modulesCompleted / COURSE.totalModules) * 100,
  );

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Training course
        </p>
        <h1 className="text-2xl font-serif font-medium text-foreground mt-1 leading-tight">
          {COURSE.title}
        </h1>
      </div>

      {/* Course hero */}
      <div className="relative overflow-hidden rounded-2xl bg-card border border-primary/20">
        {/* Hero image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <img
            src={trainingHero}
            alt="Trainer working with adult learners around a workbench"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent 40%, hsl(240,6%,12%) 100%)",
            }}
          />
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="text-[10px] tracking-[0.25em] uppercase text-primary-foreground font-medium px-2 py-1 rounded-md bg-primary/90 backdrop-blur-sm font-mono">
              {COURSE.code}
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-foreground/90 font-medium px-2 py-1 rounded-md bg-black/40 backdrop-blur-sm flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {COURSE.totalDuration}
            </span>
          </div>
        </div>

        <div
          className="absolute -right-12 -bottom-12 w-40 h-40 rounded-full opacity-25 blur-3xl pointer-events-none"
          style={{ background: "hsl(280, 80%, 60%)" }}
        />
        <div className="relative p-5 -mt-2">
          <p className="text-sm text-foreground/80 leading-relaxed">
            {COURSE.description}
          </p>

          <div className="mt-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-muted-foreground">
                {COURSE.modulesCompleted} of {COURSE.totalModules} modules
                complete
              </span>
              <span className="text-sm font-serif font-medium text-foreground tabular-nums">
                {overallPercent}%
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-foreground/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[hsl(280,90%,75%)] to-[hsl(255,80%,65%)]"
                style={{ width: `${overallPercent}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            className="mt-5 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            data-testid="button-resume-training"
          >
            <Play className="w-4 h-4 fill-current" />
            Resume Module 2 · Lesson 3
          </button>
        </div>
      </div>

      {/* Continue lesson card */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Play className="w-3.5 h-3.5 text-primary" />
          <h2 className="text-xs uppercase tracking-[0.2em] font-medium text-foreground/85">
            Continue where you left off
          </h2>
        </div>
        <div className="rounded-2xl bg-card border border-border overflow-hidden">
          <div
            className="aspect-video w-full relative flex items-center justify-center"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, hsl(265, 50%, 28%) 0%, hsl(240, 8%, 12%) 70%)",
            }}
          >
            <button
              type="button"
              className="w-14 h-14 rounded-full bg-primary/95 text-primary-foreground flex items-center justify-center shadow-2xl shadow-primary/40 hover:scale-105 transition-transform"
              data-testid="button-play-lesson"
              aria-label="Play lesson"
            >
              <Play className="w-5 h-5 ml-0.5 fill-current" />
            </button>
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-foreground/85">
              <span className="font-mono">04:12 / 12:30</span>
              <span className="px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm">
                Module 2 · Lesson 3
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-foreground/10">
              <div
                className="h-full bg-primary"
                style={{ width: "33%" }}
              />
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-sm font-medium text-foreground leading-snug">
              Walkthrough: an evidence-rich rubric
            </h3>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
              Sarah from Holmesglen demonstrates how she rebuilt a Cert IV
              Workplace Health & Safety rubric to satisfy the new sufficiency
              and currency requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Module 2 lessons */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-primary" />
            <h2 className="text-xs uppercase tracking-[0.2em] font-medium text-foreground/85">
              Module 2 lessons
            </h2>
          </div>
          <span className="text-[11px] text-muted-foreground tabular-nums">
            {CURRENT_LESSONS.filter((l) => l.status === "done").length}/
            {CURRENT_LESSONS.length}
          </span>
        </div>
        <div className="rounded-2xl bg-card border border-border overflow-hidden">
          {CURRENT_LESSONS.map((lesson, i) => {
            const Icon = KIND_META[lesson.kind].icon;
            const isLast = i === CURRENT_LESSONS.length - 1;
            const StatusIcon =
              lesson.status === "done"
                ? CheckCircle2
                : lesson.status === "current"
                  ? PlayCircle
                  : Circle;
            const statusColor =
              lesson.status === "done"
                ? "text-primary"
                : lesson.status === "current"
                  ? "text-primary"
                  : "text-muted-foreground/50";
            return (
              <button
                type="button"
                key={lesson.id}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-muted/30 transition-colors ${
                  !isLast ? "border-b border-border/60" : ""
                } ${lesson.status === "current" ? "bg-primary/5" : ""}`}
                data-testid={`lesson-${lesson.id}`}
              >
                <StatusIcon
                  className={`w-5 h-5 shrink-0 ${statusColor}`}
                  strokeWidth={2}
                />
                <div className="flex-1 min-w-0">
                  <div
                    className={`text-sm leading-snug ${
                      lesson.status === "done"
                        ? "text-muted-foreground line-through"
                        : "text-foreground"
                    } ${lesson.status === "current" ? "font-medium" : ""}`}
                  >
                    {lesson.title}
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-muted-foreground">
                    <Icon className="w-3 h-3" />
                    <span>{KIND_META[lesson.kind].label}</span>
                    <span>·</span>
                    <span>{lesson.duration}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
              </button>
            );
          })}
        </div>
      </section>

      {/* All modules */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <GraduationCap className="w-3.5 h-3.5 text-primary" />
          <h2 className="text-xs uppercase tracking-[0.2em] font-medium text-foreground/85">
            All modules
          </h2>
        </div>
        <div className="space-y-2.5">
          {MODULES.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </section>

      {/* Certificate */}
      <section>
        <div className="rounded-2xl bg-card border border-dashed border-border p-5 text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <Award className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-sm font-medium text-foreground">
            Certificate of completion
          </h3>
          <p className="text-xs text-muted-foreground mt-1.5 max-w-xs mx-auto leading-relaxed">
            Finish all four modules to unlock your PD-recognised certificate
            (worth 4 hours of professional development).
          </p>
          <Link href="/standards">
            <button
              type="button"
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 font-medium"
              data-testid="link-browse-standards"
            >
              Browse the Standards
              <ArrowRight className="w-3 h-3" />
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function ModuleCard({ module }: { module: Module }) {
  const [expanded, setExpanded] = useState(false);

  const StatusBadge = () => {
    if (module.status === "completed") {
      return (
        <span className="text-[10px] uppercase tracking-wider text-primary inline-flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" /> Complete
        </span>
      );
    }
    if (module.status === "in-progress") {
      return (
        <span className="text-[10px] uppercase tracking-wider text-foreground/80 inline-flex items-center gap-1">
          <PlayCircle className="w-3 h-3" /> In progress
        </span>
      );
    }
    return (
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground/70 inline-flex items-center gap-1">
        <Lock className="w-3 h-3" /> Locked
      </span>
    );
  };

  return (
    <div
      className={`rounded-xl bg-card border transition-colors ${
        module.status === "in-progress"
          ? "border-primary/40"
          : "border-border"
      } ${module.status === "locked" ? "opacity-60" : ""}`}
    >
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="w-full p-4 text-left"
        data-testid={`module-${module.id}`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-serif font-medium ${
              module.status === "completed"
                ? "bg-primary/15 text-primary"
                : module.status === "in-progress"
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
            }`}
          >
            {module.status === "completed" ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              module.number
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-medium text-foreground line-clamp-1">
                {module.title}
              </h3>
            </div>
            <div className="flex items-center gap-2 mt-1 text-[11px] text-muted-foreground">
              <StatusBadge />
              <span>·</span>
              <span>{module.lessons} lessons</span>
              <span>·</span>
              <span>{module.duration}</span>
            </div>
            {module.status === "in-progress" && (
              <div className="mt-3 h-1 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${module.progress}%` }}
                />
              </div>
            )}
          </div>
          <ChevronRight
            className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${
              expanded ? "rotate-90" : ""
            }`}
          />
        </div>
      </button>
      {expanded && (
        <div className="px-4 pb-4 pl-[60px] -mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
          <p className="text-xs text-muted-foreground leading-relaxed">
            {module.description}
          </p>
        </div>
      )}
    </div>
  );
}
