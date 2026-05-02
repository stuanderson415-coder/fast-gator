interface FastigiataLogoProps {
  variant?: "mark" | "wordmark";
  className?: string;
}

export function FastigiataLogo({
  variant = "wordmark",
  className = "",
}: FastigiataLogoProps) {
  const TreeMark = () => (
    <svg
      viewBox="0 0 28 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="flex-shrink-0"
      style={{ width: variant === "mark" ? 20 : 22, height: variant === "mark" ? 32 : 35 }}
    >
      {/* Three fastigiate tree silhouettes — narrow upright columns */}
      {/* Centre tree — tallest */}
      <path
        d="M14 2 C10 10 8 20 9 32 C10 37 11.5 41 14 43 C16.5 41 18 37 19 32 C20 20 18 10 14 2 Z"
        fill="white"
        opacity="1"
      />
      {/* Left tree — slightly shorter, offset */}
      <path
        d="M6 9 C3.5 16 3 23 4 31 C4.5 35 5.5 38.5 7 40 C8.5 38.5 9.5 35 10 31 C11 23 10.5 16 8 9 C7.5 8.5 6.5 8.5 6 9 Z"
        fill="white"
        opacity="0.65"
      />
      {/* Right tree — slightly shorter, offset */}
      <path
        d="M22 9 C19.5 16 19 23 20 31 C20.5 35 21.5 38.5 23 40 C24.5 38.5 25.5 35 26 31 C27 23 26.5 16 24 9 C23.5 8.5 22.5 8.5 22 9 Z"
        fill="white"
        opacity="0.65"
      />
      {/* Ground line */}
      <line x1="2" y1="43" x2="26" y2="43" stroke="white" strokeWidth="1.2" strokeOpacity="0.35" strokeLinecap="round" />
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
          style={{ fontFamily: "'Fraunces', serif", fontSize: "inherit" }}
        >
          Fastigiata
        </div>
        <div
          className="text-white/60 font-serif font-light leading-none tracking-widest uppercase mt-0.5"
          style={{ fontFamily: "'Fraunces', serif", fontSize: "0.6em", letterSpacing: "0.18em" }}
        >
          Systems
        </div>
      </div>
    </div>
  );
}
