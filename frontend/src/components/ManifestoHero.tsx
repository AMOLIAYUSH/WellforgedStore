import { useEffect, useState } from "react";
import AnimatedLogo from "@/components/AnimatedLogo";

const ManifestoHero = () => {
  const [visibleWords, setVisibleWords] = useState(0);
  const words = ["Wellness,", "Forged", "with", "Integrity."];

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleWords((prev) => {
        if (prev >= words.length) { clearInterval(timer); return prev; }
        return prev + 1;
      });
    }, 200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-14 sm:pt-16 lg:pt-20">
      <div className="absolute inset-0 animate-gradient-shift">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/3" />
        <div className="absolute inset-0 bg-gradient-to-tl from-secondary/50 via-transparent to-primary/5 animate-gradient-reverse" />
      </div>
      <div className="hidden sm:block absolute top-20 left-10 w-48 md:w-64 h-48 md:h-64 rounded-full bg-primary/5 blur-3xl animate-float" />
      <div className="hidden sm:block absolute bottom-20 right-10 w-64 md:w-96 h-64 md:h-96 rounded-full bg-gold/5 blur-3xl animate-float delay-300" />
      <div className="hidden md:block absolute top-1/4 right-1/4 w-px h-32 bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
      <div className="hidden md:block absolute bottom-1/3 left-1/3 w-32 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-6 sm:mb-8 lg:mb-10">
          <AnimatedLogo size="hero" className="animate-subtle-float" />
        </div>
        <div className="animate-hero-fade-up mb-4 sm:mb-6 lg:mb-8">
          <span className="inline-block font-body text-xs sm:text-sm lg:text-base font-semibold uppercase tracking-[0.1em] sm:tracking-[0.15em] text-primary-foreground bg-gold px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-md shadow-soft">
            The No-Nonsense Supplement Brand
          </span>
        </div>
        <h1 className="font-display font-semibold text-foreground leading-[1.15] sm:leading-[1.12] mb-4 sm:mb-6 lg:mb-8" style={{ fontSize: "var(--text-4xl)", textWrap: "balance", wordBreak: "keep-all", overflowWrap: "normal" } as React.CSSProperties}>
          {words.map((word, index) => (
            <span key={index} className={`inline-block transition-all duration-500 mr-[0.2em] last:mr-0 ${index < visibleWords ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: `${index * 150}ms` }}>
              {word}
            </span>
          ))}
        </h1>
        <div className="animate-hero-fade-up-delay-3">
          <p className="font-body text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-lg sm:max-w-xl lg:max-w-2xl mx-auto leading-relaxed px-1">
            Most brands ask for your trust.{" "}
            <span className="text-foreground font-medium">We provide the proof.</span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            Welcome to the new standard of radical transparency.
          </p>
        </div>
        <div className="animate-hero-fade-up-delay-5 mt-8 sm:mt-12 lg:mt-16">
          <div className="flex flex-col items-center gap-1.5 text-muted-foreground/60">
            <span className="text-[9px] sm:text-[10px] lg:text-xs uppercase tracking-widest">Discover</span>
            <div className="w-px h-6 sm:h-8 lg:h-12 bg-gradient-to-b from-primary/30 to-transparent animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManifestoHero;
