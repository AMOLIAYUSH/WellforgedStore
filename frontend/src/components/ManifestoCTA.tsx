import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";

const ManifestoCTA = () => {
  return (
    <section className="section-padding bg-secondary relative overflow-hidden pb-24 sm:pb-16 lg:pb-20">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
      <div className="max-w-4xl mx-auto relative z-10 text-center px-1 sm:px-0">
        <ScrollReveal animation="fade-up">
          <span className="inline-block font-body text-[9px] sm:text-[10px] lg:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] lg:tracking-[0.25em] text-primary/70 mb-2 sm:mb-3 lg:mb-4">Join the Movement</span>
        </ScrollReveal>
        <ScrollReveal animation="fade-up" delay={100}>
          <h2 className="font-display font-semibold text-foreground mb-3 sm:mb-4 lg:mb-6" style={{ fontSize: "var(--text-3xl)" }}>Ready to Verify?</h2>
        </ScrollReveal>
        <ScrollReveal animation="fade-up" delay={200}>
          <p className="font-body text-muted-foreground max-w-xl sm:max-w-2xl mx-auto mb-6 sm:mb-8 lg:mb-10 leading-relaxed px-2" style={{ fontSize: "var(--text-base)" }}>Experience the difference that radical transparency makes. Explore our standards or discover our collection.</p>
        </ScrollReveal>
        <ScrollReveal animation="fade-up" delay={300}>
          <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3 lg:gap-4 justify-center">
            <Link to="/transparency" onClick={() => window.scrollTo(0, 0)} className="w-full sm:w-auto">
              <Button variant="hero" size="default" className="group w-full sm:w-auto h-11 gap-2 text-sm sm:text-base border-2 border-transparent hover:border-primary/30 transition-all duration-300">
                Verify Your Batch<ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/product" onClick={() => window.scrollTo(0, 0)} className="w-full sm:w-auto">
              <Button variant="outline" size="default" className="w-full sm:w-auto h-11 gap-2 text-sm sm:text-base border-2 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                <ShoppingBag className="h-5 w-5" />View the Collection
              </Button>
            </Link>
          </div>
        </ScrollReveal>
        <ScrollReveal animation="fade-up" delay={400}>
          <div className="mt-8 sm:mt-12 lg:mt-16 pt-6 sm:pt-8 lg:pt-10 border-t border-border">
            <p className="font-display text-foreground italic mb-1.5 sm:mb-2 lg:mb-3" style={{ fontSize: "var(--text-base)" }}>"We test so you don't have to guess."</p>
            <p className="text-primary" style={{ fontFamily: "'Dancing Script', cursive", fontSize: "var(--text-xl)" }}>— WellForged Team</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ManifestoCTA;
