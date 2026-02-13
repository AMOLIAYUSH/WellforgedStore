import { useEffect, useState } from "react";

interface ShieldLogoProps {
  size?: "hero" | "nav" | "footer";
  className?: string;
  animate?: boolean;
}

const ShieldLogo = ({ size = "hero", className = "", animate = true }: ShieldLogoProps) => {
  const [animationPhase, setAnimationPhase] = useState<"drawing" | "filling" | "complete">(
    animate ? "drawing" : "complete"
  );

  const sizeClasses = {
    hero: "w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48",
    nav: "w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14",
    footer: "w-10 h-10",
  };

  useEffect(() => {
    if (!animate) return;
    const fillTimer = setTimeout(() => setAnimationPhase("filling"), 1500);
    const completeTimer = setTimeout(() => setAnimationPhase("complete"), 2500);
    return () => {
      clearTimeout(fillTimer);
      clearTimeout(completeTimer);
    };
  }, [animate]);

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <svg viewBox="0 0 100 115" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path
          d="M50 5 L90 20 L90 55 C90 80 70 100 50 110 C30 100 10 80 10 55 L10 20 L50 5 Z"
          stroke="hsl(150 30% 25%)"
          strokeWidth="3"
          fill="none"
          className={animate ? "shield-outline-draw" : ""}
          style={{
            strokeDasharray: animate ? 350 : 0,
            strokeDashoffset: animate && animationPhase === "drawing" ? 350 : 0,
          }}
        />
        <path
          d="M50 8 L87 22 L87 55 C87 78 68 97 50 107 C32 97 13 78 13 55 L13 22 L50 8 Z"
          fill="hsl(45 40% 97%)"
          className={`transition-opacity duration-700 ${animationPhase === "drawing" ? "opacity-0" : "opacity-100"}`}
        />
        <path
          d="M50 12 L84 25 L84 55 C84 76 66 94 50 103 C34 94 16 76 16 55 L16 25 L50 12 Z"
          stroke="hsl(150 30% 25%)"
          strokeWidth="2"
          fill="none"
          className={animate ? "shield-inner-draw" : ""}
          style={{
            strokeDasharray: animate ? 300 : 0,
            strokeDashoffset: animate && animationPhase === "drawing" ? 300 : 0,
          }}
        />
        <path
          d="M25 35 L32 75 L42 50 L50 70 L58 50 L68 75 L75 35"
          stroke="hsl(150 30% 25%)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          className={animate ? "letter-w-draw" : ""}
          style={{
            strokeDasharray: animate ? 180 : 0,
            strokeDashoffset: animate && animationPhase === "drawing" ? 180 : 0,
          }}
        />
        <path
          d="M48 35 L48 75 M48 35 L62 35 M48 52 L58 52"
          stroke="hsl(150 30% 25%)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          className={animate ? "letter-f-draw" : ""}
          style={{
            strokeDasharray: animate ? 100 : 0,
            strokeDashoffset: animate && animationPhase === "drawing" ? 100 : 0,
          }}
        />
        {animationPhase === "filling" && (
          <defs>
            <linearGradient id="shimmerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="40%" stopColor="hsl(45 60% 90% / 0.8)" />
              <stop offset="50%" stopColor="hsl(45 80% 95%)" />
              <stop offset="60%" stopColor="hsl(45 60% 90% / 0.8)" />
              <stop offset="100%" stopColor="transparent" />
              <animate attributeName="x1" values="-100%;100%" dur="1s" repeatCount="1" />
              <animate attributeName="x2" values="0%;200%" dur="1s" repeatCount="1" />
            </linearGradient>
          </defs>
        )}
        {animationPhase === "filling" && (
          <path
            d="M50 8 L87 22 L87 55 C87 78 68 97 50 107 C32 97 13 78 13 55 L13 22 L50 8 Z"
            fill="url(#shimmerGradient)"
            className="animate-shimmer-once"
          />
        )}
      </svg>
      {size === "nav" && (
        <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/10 blur-xl transition-all duration-300 -z-10" />
      )}
    </div>
  );
};

export default ShieldLogo;
