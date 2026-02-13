import { useState } from "react";
import { MapPin, FlaskConical, Eye } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const pillars = [
  { icon: MapPin, title: "Provenance", description: "We source exclusively from single-origin regions known for peak potency. No blends. No compromises.", number: "01" },
  { icon: FlaskConical, title: "The Double-Verify", description: "Every batch is tested twice. Once by the producer, and once independently by a third-party NABL lab. We police our own supply chain.", number: "02" },
  { icon: Eye, title: "Radical Disclosure", description: "Real-time access to the exact lab data of the product in your hand. Scan. Verify. Decide.", number: "03" },
];

const IntegrityPillars = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 hidden md:block">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent" />
      </div>
      <div className="max-w-6xl mx-auto relative z-10 px-1 sm:px-0">
        <ScrollReveal animation="fade-up" className="text-center mb-8 sm:mb-12 lg:mb-16 xl:mb-20">
          <span className="inline-block font-body text-[9px] sm:text-[10px] lg:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] lg:tracking-[0.25em] text-primary/70 mb-2 sm:mb-3 lg:mb-4">Our Foundation</span>
          <h2 className="font-display font-semibold text-foreground" style={{ fontSize: "var(--text-3xl)" }}>The Integrity Pillars</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 xl:gap-8">
          {pillars.map((pillar, index) => (
            <ScrollReveal key={pillar.title} animation="fade-up" delay={index * 150} className={index === 2 ? "sm:col-span-2 md:col-span-1 sm:max-w-md sm:mx-auto md:max-w-none" : ""}>
              <div className="glass-card p-4 sm:p-6 lg:p-8 xl:p-10 h-full cursor-pointer relative transition-all duration-500 ease-out"
                onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}
                style={{ transform: hoveredIndex === index ? "translateY(-12px) rotateX(5deg) rotateY(-2deg)" : "translateY(0) rotateX(0) rotateY(0)", transformStyle: "preserve-3d", perspective: "1000px" }}>
                <span className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary/10 absolute top-2 sm:top-3 lg:top-4 right-3 sm:right-4 lg:right-6">{pillar.number}</span>
                <div className={`h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 lg:mb-6 transition-all duration-300 ${hoveredIndex === index ? "bg-primary/20 scale-110" : ""}`}>
                  <pillar.icon className={`h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-primary transition-transform duration-300 ${hoveredIndex === index ? "scale-110" : ""}`} />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2 sm:mb-3 lg:mb-4" style={{ fontSize: "var(--text-xl)" }}>{pillar.title}</h3>
                <p className="font-body text-muted-foreground leading-relaxed" style={{ fontSize: "var(--text-sm)" }}>{pillar.description}</p>
                <div className={`absolute bottom-0 left-0 h-0.5 sm:h-1 bg-gradient-to-r from-primary to-primary/50 rounded-b-xl sm:rounded-b-2xl transition-all duration-500 ${hoveredIndex === index ? "w-full" : "w-0"}`} />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntegrityPillars;
