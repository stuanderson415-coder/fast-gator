import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const SESSION_KEY = "rto-guide:splash-seen";

interface CypressProps {
  className?: string;
  delay?: number;
}

function Cypress({ className = "", delay = 0 }: CypressProps) {
  return (
    <svg
      viewBox="0 0 60 360"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`cypress-grad-${delay}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="hsl(155, 40%, 22%)" />
          <stop offset="0.6" stopColor="hsl(155, 35%, 28%)" />
          <stop offset="1" stopColor="hsl(155, 30%, 18%)" />
        </linearGradient>
      </defs>
      <g
        style={{
          transformOrigin: "30px 360px",
          animation: `cypressGrow 1400ms ${delay}ms cubic-bezier(0.22, 1, 0.36, 1) both`,
        }}
      >
        <path
          d="M30 10 C 14 80, 8 160, 12 250 C 14 300, 18 340, 30 358 C 42 340, 46 300, 48 250 C 52 160, 46 80, 30 10 Z"
          fill={`url(#cypress-grad-${delay})`}
        />
        <path
          d="M30 30 C 22 100, 20 180, 24 260 M30 50 C 38 120, 40 200, 36 280"
          stroke="hsl(155, 50%, 35%)"
          strokeOpacity="0.35"
          strokeWidth="0.6"
          fill="none"
        />
      </g>
    </svg>
  );
}

interface SplashScreenProps {
  onDismiss: () => void;
}

function SplashContent({ onDismiss }: SplashScreenProps) {
  const [leaving, setLeaving] = useState(false);

  const handleDismiss = () => {
    setLeaving(true);
    window.setTimeout(onDismiss, 700);
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
      className={`fixed inset-0 z-[100] overflow-hidden transition-opacity duration-700 ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
      style={{
        background:
          "radial-gradient(ellipse at top, hsl(45, 38%, 96%) 0%, hsl(45, 30%, 92%) 60%, hsl(45, 25%, 88%) 100%)",
      }}
    >
      {/* Sun / horizon glow */}
      <div
        className="absolute left-1/2 top-[18%] -translate-x-1/2 w-[480px] h-[480px] rounded-full opacity-40 blur-3xl pointer-events-none"
        style={{ background: "hsl(35, 70%, 70%)" }}
      />

      {/* Faint horizon line */}
      <div
        className="absolute left-0 right-0"
        style={{
          top: "calc(100% - 80px)",
          height: "1px",
          background:
            "linear-gradient(to right, transparent, hsl(155, 25%, 30%, 0.25), transparent)",
        }}
      />

      {/* Cypress alley — tall, narrow, fastigiate forms */}
      <div className="absolute inset-0 flex items-end justify-between px-[3vw] pointer-events-none">
        <Cypress className="h-[78vh] w-[5vw] min-w-[36px] max-w-[64px]" delay={0} />
        <Cypress className="h-[64vh] w-[4vw] min-w-[28px] max-w-[52px] opacity-80" delay={120} />
        <Cypress className="h-[88vh] w-[5.5vw] min-w-[40px] max-w-[72px]" delay={60} />
        <div className="w-[36vw]" />
        <Cypress className="h-[88vh] w-[5.5vw] min-w-[40px] max-w-[72px]" delay={60} />
        <Cypress className="h-[64vh] w-[4vw] min-w-[28px] max-w-[52px] opacity-80" delay={120} />
        <Cypress className="h-[78vh] w-[5vw] min-w-[36px] max-w-[64px]" delay={0} />
      </div>

      {/* Centre content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <div
          className="text-[10px] tracking-[0.6em] uppercase text-[hsl(155,30%,28%)]/70 mb-6"
          style={{
            animation: "splashFadeIn 800ms 200ms cubic-bezier(0.22, 1, 0.36, 1) both",
          }}
        >
          A practice guide for vocational educators
        </div>

        <h1
          className="font-serif font-medium text-[hsl(155,40%,18%)] leading-[0.95] text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight"
          style={{
            animation: "splashRise 900ms 400ms cubic-bezier(0.22, 1, 0.36, 1) both",
          }}
        >
          <span className="block italic font-light">RTO Standards</span>
          <span
            className="block font-bold"
            style={{
              fontFeatureSettings: '"ss01", "lnum"',
              letterSpacing: "-0.02em",
            }}
          >
            2025
          </span>
        </h1>

        <div
          className="mt-10 mb-10 flex items-center gap-3"
          style={{
            animation: "splashFadeIn 800ms 700ms cubic-bezier(0.22, 1, 0.36, 1) both",
          }}
        >
          <span className="h-px w-12 bg-[hsl(155,30%,28%)]/40" />
          <span className="text-sm font-serif italic text-[hsl(155,30%,28%)]/80">
            Practice. Reflect. Embed.
          </span>
          <span className="h-px w-12 bg-[hsl(155,30%,28%)]/40" />
        </div>

        <p
          className="max-w-md text-base text-[hsl(155,25%,25%)]/80 leading-relaxed font-sans"
          style={{
            animation: "splashFadeIn 800ms 900ms cubic-bezier(0.22, 1, 0.36, 1) both",
          }}
        >
          Translating Australia&rsquo;s new Standards for Registered Training
          Organisations into the work you do every Monday morning.
        </p>

        <button
          onClick={handleDismiss}
          className="mt-12 group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[hsl(155,40%,22%)] text-white text-sm font-medium tracking-wide hover:bg-[hsl(155,45%,18%)] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          style={{
            animation: "splashFadeIn 800ms 1100ms cubic-bezier(0.22, 1, 0.36, 1) both",
          }}
          data-testid="button-enter-splash"
        >
          Enter the guide
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>

        <button
          onClick={handleDismiss}
          className="absolute bottom-6 right-6 text-xs text-[hsl(155,25%,25%)]/50 hover:text-[hsl(155,25%,25%)] transition-colors"
          style={{
            animation: "splashFadeIn 800ms 1300ms cubic-bezier(0.22, 1, 0.36, 1) both",
          }}
          data-testid="button-skip-splash"
        >
          Skip intro
        </button>
      </div>

      <style>{`
        @keyframes cypressGrow {
          from { transform: scaleY(0); opacity: 0; }
          60% { opacity: 1; }
          to { transform: scaleY(1); opacity: 1; }
        }
        @keyframes splashRise {
          from { opacity: 0; transform: translateY(24px); }
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
