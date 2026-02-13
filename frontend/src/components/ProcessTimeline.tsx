import { useEffect, useRef, useState } from "react";
import { MapPin, FlaskConical, FileSearch } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const steps = [
  { number: "01", title: "Sourcing", subtitle: "Single-Origin Selection", description: "We partner with carefully vetted farms in regions known for optimal growing conditions. Every ingredient is traceable to its exact origin.", icon: MapPin },
  { number: "02", title: "Forging", subtitle: "Independent NABL Testing", description: "Every batch undergoes rigorous third-party laboratory testing. We verify purity, potency, and safety before any product reaches you.", icon: FlaskConical },
  { number: "03", title: "Transparency", subtitle: "Real-Time Batch Reporting", description: "Scan your product's batch code to access complete lab results instantly. No hidden data. No gatekeeping. Full disclosure.", icon: FileSearch },
];

const ProcessTimeline = () => {
  const [lineProgress, setLineProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const duration = 2000;
          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setLineProgress(eased * 100);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      });
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] hidden sm:block">
        <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`, backgroundSize: "40px 40px" }} />
      </div>
      <div className="max-w-5xl mx-auto relative z-10">
        <ScrollReveal animation="fade-up" className="text-center mb-8 sm:mb-12 lg:mb-16 xl:mb-24">
          <span className="inline-block font-body text-[9px] sm:text-[10px] lg:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] lg:tracking-[0.25em] text-primary/70 mb-2 sm:mb-3 lg:mb-4">Our Process</span>
          <h2 className="font-display font-semibold text-foreground" style={{ fontSize: "var(--text-3xl)" }}>From Source to Certainty</h2>
        </ScrollReveal>
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <div className="absolute inset-0 bg-border" />
            <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary via-primary to-gold transition-all duration-100" style={{ height: `${lineProgress}%` }} />
          </div>
          <div className="md:hidden absolute left-4 sm:left-5 lg:left-6 top-0 bottom-0 w-px">
            <div className="absolute inset-0 bg-border" />
            <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary via-primary to-gold transition-all duration-100" style={{ height: `${lineProgress}%` }} />
          </div>
          <div className="space-y-8 sm:space-y-12 lg:space-y-16 xl:space-y-24">
            {steps.map((step, index) => (
              <ScrollReveal key={step.number} animation="fade-up" delay={index * 150}>
                <div className={`relative flex items-start gap-4 sm:gap-6 lg:gap-12 xl:gap-16 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`flex-1 pl-10 sm:pl-14 md:pl-0 ${index % 2 === 0 ? "md:text-right md:pr-12 lg:pr-16" : "md:text-left md:pl-12 lg:pl-16"}`}>
                    <span className="font-display font-bold text-primary/15 block mb-0.5 sm:mb-1 lg:mb-2" style={{ fontSize: "var(--text-5xl)" }}>{step.number}</span>
                    <h3 className="font-display font-semibold text-foreground mb-0.5 sm:mb-1 lg:mb-2" style={{ fontSize: "var(--text-2xl)" }}>{step.title}</h3>
                    <p className="font-body uppercase tracking-widest text-gold mb-2 sm:mb-3 lg:mb-4" style={{ fontSize: "var(--text-xs)" }}>{step.subtitle}</p>
                    <p className="font-body text-muted-foreground leading-relaxed max-w-md" style={{ fontSize: "var(--text-sm)" }}>{step.description}</p>
                  </div>
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 xl:h-14 xl:w-14 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-lg">
                      <step.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 text-primary" />
                    </div>
                  </div>
                  <div className="hidden md:block flex-1" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
