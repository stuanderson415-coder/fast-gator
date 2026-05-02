interface FastigiataLogoProps {
  variant?: "mark" | "wordmark";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE_MAP = {
  sm: { tree: { w: 16, h: 26 }, title: "0.8rem", sub: "0.48rem" },
  md: { tree: { w: 20, h: 33 }, title: "1rem",   sub: "0.58rem" },
  lg: { tree: { w: 26, h: 42 }, title: "1.25rem", sub: "0.72rem" },
};

export function FastigiataLogo({
  variant = "wordmark",
  size = "md",
  className = "",
}: FastigiataLogoProps) {
  const s = SIZE_MAP[size];

  const TreeMark = () => (
    <svg
      viewBox="0 0 28 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ width: s.tree.w, height: s.tree.h, flexShrink: 0 }}
    >
      {/* Centre tree — tallest */}
      <path
        d="M14 2 C10 10 8 20 9 32 C10 37 11.5 41 14 43 C16.5 41 18 37 19 32 C20 20 18 10 14 2 Z"
        fill="white"
      />
      {/* Left tree — slightly shorter */}
      <path
        d="M6 9 C3.5 16 3 23 4 31 C4.5 35 5.5 38.5 7 40 C8.5 38.5 9.5 35 10 31 C11 23 10.5 16 8 9 C7.5 8.5 6.5 8.5 6 9 Z"
        fill="white"
        opacity="0.65"
      />
      {/* Right tree — slightly shorter */}
      <path
        d="M22 9 C19.5 16 19 23 20 31 C20.5 35 21.5 38.5 23 40 C24.5 38.5 25.5 35 26 31 C27 23 26.5 16 24 9 C23.5 8.5 22.5 8.5 22 9 Z"
        fill="white"
        opacity="0.65"
      />
      {/* Ground line */}
      <line
        x1="2" y1="43" x2="26" y2="43"
        stroke="white"
        strokeWidth="1.2"
        strokeOpacity="0.35"
        strokeLinecap="round"
      />
    </svg>
  );

  if (variant === "mark") {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <TreeMark />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <TreeMark />
      <div className="leading-none">
        <div
          className="text-white font-serif italic font-light leading-none tracking-tight"
          style={{ fontFamily: "'Fraunces', serif", fontSize: s.title }}
        >
          Fastigiata
        </div>
        <div
          className="text-white/55 font-serif font-light leading-none mt-0.5"
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: s.sub,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Systems
        </div>
      </div>
    </div>
  );
}
