import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { FastigiataLogo } from "@/components/fastigiata-logo";
import jigsawHero from "@/assets/jigsaw-hero.png";

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
      style={{ background: "hsl(240, 6%, 8%)" }}
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

      {/* Phone shell centring */}
      <div className="relative z-10 h-full w-full max-w-[440px] mx-auto flex flex-col">

        {/* Jigsaw hero image — top half */}
        <div
          className="relative flex-shrink-0 overflow-hidden"
          style={{
            height: "46%",
            animation: "splashFadeIn 700ms 80ms cubic-bezier(0.22,1,0.36,1) both",
          }}
        >
          <img
            src={jigsawHero}
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 30%" }}
          />
          {/* Fade image into background at bottom */}
          <div
            className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent, hsl(240, 6%, 8%))",
            }}
          />
          {/* Subtle purple tint overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "hsl(265,60%,20%,0.25)" }}
          />
        </div>

        {/* Content below image */}
        <div className="flex-1 flex flex-col px-7 pt-2 pb-8">

          {/* Title */}
          <div
            style={{
              animation: "splashRise 700ms 250ms cubic-bezier(0.22,1,0.36,1) both",
            }}
          >
            <p className="text-[10px] uppercase tracking-[0.3em] font-sans mb-2" style={{ color: "hsl(28,90%,58%)" }}>
              2025 Edition
            </p>
            <h1 className="font-sans leading-none tracking-tight">
              <span className="block font-semibold text-[1.75rem] text-foreground/90">
                RTO Standards
              </span>
              <span
                className="block font-black text-[3.25rem] leading-none bg-gradient-to-br from-[hsl(28,90%,68%)] via-[hsl(280,90%,78%)] to-[hsl(255,80%,65%)] bg-clip-text text-transparent"
                style={{ letterSpacing: "-0.03em" }}
              >
                Companion
              </span>
            </h1>
          </div>

          {/* Divider + tagline */}
          <div
            className="flex items-center gap-3 mt-4"
            style={{
              animation: "splashFadeIn 500ms 220ms cubic-bezier(0.22,1,0.36,1) both",
            }}
          >
            <span className="h-px flex-1 bg-border/60" />
            <span className="text-[9px] font-sans font-medium tracking-[0.28em] uppercase text-foreground/40">
              Practice · Reflect · Embed
            </span>
            <span className="h-px flex-1 bg-border/60" />
          </div>

          {/* Description */}
          <p
            className="mt-4 text-sm text-foreground/55 leading-relaxed"
            style={{
              animation: "splashFadeIn 500ms 300ms cubic-bezier(0.22,1,0.36,1) both",
            }}
          >
            Australia&rsquo;s new Standards for Registered Training Organisations,
            broken down into the practical strategies you use every week.
          </p>

          {/* CTA */}
          <button
            onClick={handleDismiss}
            className="mt-6 group inline-flex items-center justify-center gap-3 w-full py-3.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold tracking-wide hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25 hover:-translate-y-0.5"
            style={{
              animation: "splashFadeIn 500ms 400ms cubic-bezier(0.22,1,0.36,1) both",
            }}
            data-testid="button-enter-splash"
          >
            Enter the guide
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          {/* Fastigiata logo — lower on the page */}
          <div
            className="flex items-center justify-between mt-8"
            style={{
              animation: "splashFadeIn 500ms 520ms cubic-bezier(0.22,1,0.36,1) both",
            }}
          >
            <FastigiataLogo variant="wordmark" size="sm" />
            <button
              onClick={handleDismiss}
              className="text-[11px] text-foreground/35 hover:text-foreground/70 transition-colors"
              data-testid="button-skip-splash"
            >
              Skip
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes splashRise {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes splashFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
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
