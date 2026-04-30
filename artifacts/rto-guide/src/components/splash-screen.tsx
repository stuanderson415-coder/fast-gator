import { useEffect, useState } from "react";
import { ArrowRight, BookOpen } from "lucide-react";

const SESSION_KEY = "rto-guide:splash-seen";

interface SplashScreenProps {
  onDismiss: () => void;
}

function SplashContent({ onDismiss }: SplashScreenProps) {
  const [leaving, setLeaving] = useState(false);

  const handleDismiss = () => {
    setLeaving(true);
    window.setTimeout(onDismiss, 500);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
        e.preventDefault();
        handleDismiss();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] overflow-hidden transition-opacity duration-500 ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, hsl(265, 40%, 18%) 0%, hsl(240, 8%, 10%) 55%, hsl(240, 6%, 7%) 100%)",
      }}
    >
      {/* Soft purple aura */}
      <div
        className="absolute left-1/2 top-[24%] -translate-x-1/2 w-[520px] h-[520px] rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: "hsl(265, 80%, 55%)" }}
      />

      {/* Subtle grain dots */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(hsl(0,0%,100%) 0.5px, transparent 0.5px)",
          backgroundSize: "3px 3px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full w-full max-w-[440px] mx-auto flex flex-col items-center justify-center px-8 text-center">
        <div
          className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-7"
          style={{
            animation: "splashFadeIn 600ms 100ms cubic-bezier(0.22, 1, 0.36, 1) both",
          }}
        >
          <BookOpen className="w-6 h-6 text-primary" strokeWidth={1.8} />
        </div>

        <div
          className="text-[10px] tracking-[0.4em] uppercase text-primary/80 mb-4"
          style={{
            animation: "splashFadeIn 600ms 200ms cubic-bezier(0.22, 1, 0.36, 1) both",
          }}
        >
          A practice guide for VET
        </div>

        <h1
          className="font-serif font-medium leading-[0.95] tracking-tight"
          style={{
            animation: "splashRise 700ms 350ms cubic-bezier(0.22, 1, 0.36, 1) both",
          }}
        >
          <span className="block italic font-light text-3xl text-foreground/90">
            RTO Standards
          </span>
          <span
            className="block font-bold text-5xl mt-1 bg-gradient-to-br from-[hsl(280,90%,80%)] to-[hsl(255,80%,65%)] bg-clip-text text-transparent"
            style={{ letterSpacing: "-0.02em" }}
          >
            2025
          </span>
        </h1>

        <div
          className="mt-7 mb-7 flex items-center gap-3"
          style={{
            animation: "splashFadeIn 600ms 600ms cubic-bezier(0.22, 1, 0.36, 1) both",
          }}
        >
          <span className="h-px w-10 bg-primary/40" />
          <span className="text-xs font-serif italic text-foreground/70">
            Practice. Reflect. Embed.
          </span>
          <span className="h-px w-10 bg-primary/40" />
        </div>

        <p
          className="max-w-xs text-sm text-foreground/65 leading-relaxed"
          style={{
            animation: "splashFadeIn 600ms 750ms cubic-bezier(0.22, 1, 0.36, 1) both",
          }}
        >
          Australia&rsquo;s new Standards for Registered Training Organisations,
          translated into the work you do every Monday morning.
        </p>

        <button
          onClick={handleDismiss}
          className="mt-10 group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-primary text-primary-foreground text-sm font-medium tracking-wide hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-0.5"
          style={{
            animation: "splashFadeIn 600ms 900ms cubic-bezier(0.22, 1, 0.36, 1) both",
          }}
          data-testid="button-enter-splash"
        >
          Enter the guide
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>

        <button
          onClick={handleDismiss}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] text-foreground/40 hover:text-foreground/80 transition-colors"
          style={{
            animation: "splashFadeIn 600ms 1100ms cubic-bezier(0.22, 1, 0.36, 1) both",
          }}
          data-testid="button-skip-splash"
        >
          Skip intro
        </button>
      </div>

      <style>{`
        @keyframes splashRise {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes splashFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export function SplashScreen() {
  const [show, setShow] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      if (window.location.search.includes("nosplash=1")) {
        setShow(false);
        return;
      }
      const seen = window.sessionStorage.getItem(SESSION_KEY);
      setShow(seen !== "1");
    } catch {
      setShow(false);
    }
  }, []);

  const handleDismiss = () => {
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // ignore
    }
    setShow(false);
  };

  if (!show) return null;
  return <SplashContent onDismiss={handleDismiss} />;
}
