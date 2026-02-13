import ScrollReveal from "@/components/ScrollReveal";

const WhyWeExist = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-foreground py-10 sm:py-16 md:py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="scale">
            <blockquote className="text-center">
              <p className="font-display font-semibold text-background leading-tight" style={{ fontSize: "var(--text-2xl)" }}>
                "In an industry built on secrets,<br /><span className="text-gold">we choose truth.</span>"
              </p>
            </blockquote>
          </ScrollReveal>
        </div>
      </div>
      <div className="section-padding bg-secondary">
        <div className="max-w-4xl mx-auto text-center px-1 sm:px-0">
          <ScrollReveal animation="fade-up">
            <span className="inline-block font-body text-[9px] sm:text-[10px] lg:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] lg:tracking-[0.25em] text-primary/70 mb-2 sm:mb-3 lg:mb-4">Founder's Mission</span>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={100}>
            <h2 className="font-display font-semibold text-foreground mb-4 sm:mb-6 lg:mb-8" style={{ fontSize: "var(--text-3xl)" }}>Eliminating the Trust Gap</h2>
          </ScrollReveal>
          <div className="space-y-3 sm:space-y-4 lg:space-y-6 text-left sm:text-center">
            <ScrollReveal animation="fade-up" delay={200}>
              <p className="font-body text-muted-foreground leading-relaxed" style={{ fontSize: "var(--text-sm)" }}>The supplement industry has a trust problem. Complex blends with proprietary formulas. Vague claims backed by nothing. Lab results you can never see. We were tired of it.</p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={300}>
              <p className="font-body text-foreground leading-relaxed font-medium" style={{ fontSize: "var(--text-base)" }}>WellForged was built to close the gap between what brands claim and what customers can verify.</p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={400}>
              <p className="font-body text-muted-foreground leading-relaxed" style={{ fontSize: "var(--text-sm)" }}>We believe every person has the right to know exactly what they're putting in their body. Not through marketing speak, but through verifiable data. Every batch. Every time.</p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={500}>
              <div className="pt-4 sm:pt-5 lg:pt-6 border-t border-border mt-4 sm:mt-6 lg:mt-8">
                <p className="font-display text-foreground italic" style={{ fontSize: "var(--text-lg)" }}>"We don't ask you to trust us.<br />We give you the tools to verify."</p>
                <p className="font-body text-muted-foreground mt-2 sm:mt-3 lg:mt-4 tracking-wide" style={{ fontSize: "var(--text-xs)" }}>— The WellForged Team</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWeExist;
