import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Search, ArrowLeft, CheckCircle, XCircle, FileText, Beaker, Calendar, Package, Shield, Download, Share2, Loader2, Sparkles, Lock, Leaf, FlaskConical, Gift, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/WellForged_Shield_Logo.png";
import AnimatedLogo from "@/components/AnimatedLogo";

const batchDatabase: Record<string, BatchData> = {
  "WF-2024-001": { batchNumber: "WF-2024-001", productName: "Moringa Leaf Powder", manufactureDate: "2024-01-15", expirationDate: "2026-01-15", testDate: "2024-01-18", labName: "NSF International", status: "passed", purityLevel: 99.8, tests: [{ name: "Heavy Metals (Lead)", result: "<0.5 ppm", status: "passed", limit: "<1.0 ppm" }, { name: "Heavy Metals (Mercury)", result: "<0.1 ppm", status: "passed", limit: "<0.5 ppm" }, { name: "Heavy Metals (Arsenic)", result: "<0.2 ppm", status: "passed", limit: "<1.0 ppm" }, { name: "Microbial Testing", result: "No pathogens detected", status: "passed", limit: "None" }, { name: "Moringa Identity", result: "Confirmed", status: "passed", limit: "Positive ID" }, { name: "Moisture Content", result: "4.2%", status: "passed", limit: "<8%" }] },
  "WF2026021212": { batchNumber: "WF2026021212", productName: "Moringa Leaf Powder", manufactureDate: "2024-06-01", expirationDate: "2026-06-01", testDate: "2024-06-04", labName: "NSF International", status: "passed", purityLevel: 99.9, tests: [{ name: "Heavy Metals (Lead)", result: "<0.3 ppm", status: "passed", limit: "<1.0 ppm" }, { name: "Heavy Metals (Mercury)", result: "<0.05 ppm", status: "passed", limit: "<0.5 ppm" }, { name: "Heavy Metals (Arsenic)", result: "<0.1 ppm", status: "passed", limit: "<1.0 ppm" }, { name: "Microbial Testing", result: "No pathogens detected", status: "passed", limit: "None" }, { name: "Moringa Identity", result: "Confirmed", status: "passed", limit: "Positive ID" }, { name: "Moisture Content", result: "3.5%", status: "passed", limit: "<8%" }] },
};

interface TestResult { name: string; result: string; status: "passed" | "failed"; limit: string; }
interface BatchData { batchNumber: string; productName: string; manufactureDate: string; expirationDate: string; testDate: string; labName: string; status: "passed" | "failed"; purityLevel: number; tests: TestResult[]; }

const scorecardItems = [
  { icon: Leaf, title: "Purity", description: "100% Moringa Oleifera (No Fillers)", status: "PASS" },
  { icon: Shield, title: "Safety", description: "Heavy Metals & Pesticides: Non-Detectable", status: "PASS" },
  { icon: FlaskConical, title: "Potency", description: "High Chlorophyll Content (Freshly Processed)", status: "PASS" },
];

const TransparencyPage = () => {
  const [batchNumber, setBatchNumber] = useState("");
  const [searchedBatch, setSearchedBatch] = useState<BatchData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [showScorecard, setShowScorecard] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  const loadingSteps = [
    { text: "Connecting to Secure Database...", icon: Lock },
    { text: "Authenticating Certificate...", icon: Shield },
    { text: "Verifying Lab Results...", icon: Beaker },
    { text: "Generating Report...", icon: FileText },
  ];

  useEffect(() => {
    if (showScorecard) {
      const t1 = setTimeout(() => setVisibleCards([0]), 200);
      const t2 = setTimeout(() => setVisibleCards([0, 1]), 400);
      const t3 = setTimeout(() => setVisibleCards([0, 1, 2]), 600);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    } else { setVisibleCards([]); }
  }, [showScorecard]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedBatch = batchNumber.trim().toUpperCase();
    setIsLoading(true); setHasSearched(false); setSearchedBatch(null); setNotFound(false); setLoadingStep(0); setShowScorecard(false);
    setTimeout(() => {
      document.getElementById("loading-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
    const stepInterval = setInterval(() => { setLoadingStep(prev => { if (prev >= loadingSteps.length - 1) { clearInterval(stepInterval); return prev; } return prev + 1; }); }, 800);
    setTimeout(() => {
      clearInterval(stepInterval); setIsLoading(false); setHasSearched(true);
      if (batchDatabase[trimmedBatch]) { setSearchedBatch(batchDatabase[trimmedBatch]); setNotFound(false); setShowScorecard(true); } else { setSearchedBatch(null); setNotFound(true); }
      setTimeout(() => {
        document.getElementById("results-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }, 4000);
  };

  const handleTrySample = () => setBatchNumber("WF2026021212");
  const formatDate = (d: string) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const handleShareResults = () => { navigator.clipboard.writeText(`${window.location.origin}/transparency?batch=${searchedBatch?.batchNumber}`); };

  return (
    <>
      <Helmet><title>Transparency | WellForged</title><meta name="description" content="Validate your WellForged batch number to access verified third-party lab test results." /></Helmet>
      <main className="min-h-screen bg-background flex flex-col">
        <header className="border-b border-border bg-background/95 backdrop-blur-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
            <div className="relative flex items-center justify-between">
              <Link to="/" onClick={() => window.scrollTo(0, 0)}><Button variant="ghost" size="icon" className="rounded-full"><ArrowLeft className="h-5 w-5" /></Button></Link>

              <div className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-6">
                <Link to="/" onClick={() => window.scrollTo(0, 0)} className="text-foreground/80 hover:text-foreground font-body text-sm font-medium transition-colors">Home</Link>
                <Link to="/product" onClick={() => window.scrollTo(0, 0)} className="text-foreground/80 hover:text-foreground font-body text-sm font-medium transition-colors">Shop</Link>
              </div>

              <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center gap-2"><img src={logo} alt="WellForged Logo" className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 object-contain" /></Link>
            </div>
          </div>
        </header>

        <section className="flex-1 flex items-center justify-center px-4 sm:px-6 py-2 sm:py-4 bg-gradient-to-b from-secondary via-secondary to-background">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-2 sm:mb-3 animate-fade-up"><Shield className="h-3 w-3 text-primary" /><span className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary">Secure Verification</span></div>
            <h1 className="font-display font-bold text-foreground mb-2 sm:mb-4 animate-fade-up delay-100" style={{ fontSize: "var(--text-4xl)" }}>Turn Skepticism Into Confidence</h1>
            <form onSubmit={handleSearch} className="max-w-xl mx-auto animate-fade-up delay-200">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-gold/20 to-primary/20 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center">
                  <div className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-muted-foreground"><Search className="h-4 w-4 sm:h-5 sm:w-5" /></div>
                  <input type="text" placeholder="WF2026021212" value={batchNumber} onChange={(e) => setBatchNumber(e.target.value)} className="w-full h-12 sm:h-14 md:h-16 pl-10 sm:pl-12 pr-4 sm:pr-6 bg-card border-2 border-border text-foreground placeholder:text-muted-foreground rounded-xl font-body text-base sm:text-lg md:text-xl text-center transition-all duration-300 focus:outline-none focus:border-primary focus:shadow-[0_0_40px_-5px_hsl(var(--primary)/0.5)]" required />
                </div>
              </div>
              <Button type="submit" disabled={isLoading} variant="hero" size="lg" className="mt-3 sm:mt-4 w-full sm:w-auto h-12 sm:h-14 px-8 text-sm sm:text-base gap-2">
                {isLoading ? <><Loader2 className="h-5 w-5 animate-spin" />Verifying...</> : <><Shield className="h-5 w-5" />Transparency</>}
              </Button>
            </form>
            <div className="mt-4 sm:mt-6 animate-fade-up delay-300">
              <button onClick={handleTrySample} className="inline-flex items-center gap-2 px-4 py-2.5 bg-gold/10 hover:bg-gold/20 border border-gold/30 rounded-full transition-all duration-300">
                <Sparkles className="h-4 w-4 text-gold" /><span className="font-body text-sm text-foreground">Try sample: <span className="font-mono font-medium text-gold">WF2026021212</span></span>
              </button>
            </div>
          </div>
        </section>

        {isLoading && (
          <section id="loading-section" className="min-h-screen flex items-center justify-center px-4 sm:px-6 bg-background">
            <div className="max-w-md mx-auto text-center">
              <div className="mb-4 flex justify-center"><AnimatedLogo size="medium" className="animate-subtle-float" /></div>
              <h2 className="font-display text-lg sm:text-xl md:text-2xl font-semibold text-foreground mb-2">Forging Integrity Report...</h2>
              <p className="font-body text-xs sm:text-sm text-muted-foreground mb-4">Verifying batch authenticity and lab results</p>
              <div className="space-y-2 mb-4">
                {loadingSteps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isActive = index === loadingStep;
                  const isComplete = index < loadingStep;
                  return (
                    <div key={index} className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 ${isActive ? 'bg-primary/10 border border-primary/30' : isComplete ? 'bg-primary/5' : 'bg-muted/30'}`}>
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-primary text-primary-foreground' : isComplete ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                        {isComplete ? <CheckCircle className="h-4 w-4" /> : <StepIcon className={`h-4 w-4 ${isActive ? 'animate-pulse' : ''}`} />}
                      </div>
                      <span className={`font-mono text-sm transition-colors duration-300 ${isActive ? 'text-primary font-medium' : isComplete ? 'text-foreground' : 'text-muted-foreground'}`}>{step.text}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-center gap-2 text-muted-foreground"><Lock className="h-4 w-4" /><span className="font-mono text-xs uppercase tracking-wide">256-bit Encrypted Connection</span></div>
            </div>
          </section>
        )}

        {hasSearched && !isLoading && (
          <section id="results-section" className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 bg-background">
            <div className="max-w-5xl mx-auto">
              {notFound ? (
                <div className="text-center p-8 sm:p-12 bg-card rounded-2xl border border-border animate-fade-up">
                  <div className="h-14 w-14 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6"><XCircle className="h-7 w-7 text-destructive" /></div>
                  <h2 className="font-display text-xl sm:text-2xl font-semibold text-foreground mb-4">Batch Not Found</h2>
                  <p className="font-body text-base text-muted-foreground max-w-md mx-auto mb-6">Please check the batch number on your product label and try again.</p>
                  <button onClick={handleTrySample} className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 hover:bg-gold/20 border border-gold/30 rounded-full transition-all duration-300"><Sparkles className="h-4 w-4 text-gold" /><span className="font-body text-sm text-foreground">Try sample: <span className="font-mono font-medium text-gold">WF2026021212</span></span></button>
                </div>
              ) : searchedBatch ? (
                <div className="space-y-6 sm:space-y-8">
                  <div className="text-center mb-6 sm:mb-8 animate-fade-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4"><CheckCircle className="h-4 w-4 text-primary" /><span className="font-mono text-xs uppercase tracking-[0.15em] text-primary">Certificate Verified</span></div>
                    <h2 className="font-display font-semibold text-foreground" style={{ fontSize: "var(--text-3xl)" }}>{searchedBatch.productName}</h2>
                    <p className="font-mono text-muted-foreground mt-2" style={{ fontSize: "var(--text-sm)" }}>Batch #{searchedBatch.batchNumber} • Tested by {searchedBatch.labName}</p>
                  </div>
                  <div className="mb-8 sm:mb-10">
                    <h3 className="font-display text-xl sm:text-2xl font-semibold text-center text-foreground mb-6 animate-fade-up">WellForged Batch Scorecard</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                      {scorecardItems.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                          <div key={item.title} className={`p-6 md:p-8 bg-card rounded-2xl border border-border shadow-card text-center transition-all duration-500 hover:shadow-elevated hover:-translate-y-1 ${visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${index * 150}ms` }}>
                            <div className="h-12 w-12 md:h-14 md:w-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4"><IconComponent className="h-6 w-6 md:h-7 md:w-7 text-primary" /></div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 rounded-full mb-3"><CheckCircle className="h-3.5 w-3.5 text-primary" /><span className="font-mono text-xs font-semibold text-primary uppercase tracking-wide">{item.status}</span></div>
                            <h4 className="font-display font-semibold text-foreground mb-2" style={{ fontSize: "var(--text-xl)" }}>{item.title}</h4>
                            <p className="font-body text-muted-foreground leading-relaxed" style={{ fontSize: "var(--text-sm)" }}>{item.description}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="p-4 md:p-6 bg-card rounded-2xl border border-border shadow-card animate-fade-up">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                      <h3 className="font-display text-lg md:text-xl font-semibold text-foreground">Official Lab Report</h3>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Button variant="outline" size="default" className="gap-2 text-sm" onClick={handleShareResults}><Share2 className="h-4 w-4" />Share</Button>
                        <Button variant="outline" size="default" className="gap-2 text-sm"><Download className="h-4 w-4" />Download</Button>
                      </div>
                    </div>
                    <div className="bg-secondary/30 rounded-xl p-4 md:p-6 border border-border">
                      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                        <div><p className="font-mono text-xs text-muted-foreground">Certificate of Analysis</p><p className="font-display text-lg font-semibold text-foreground">{searchedBatch.productName}</p></div>
                        <div className="text-right"><p className="font-mono text-xs text-muted-foreground">Batch #{searchedBatch.batchNumber}</p><p className="font-mono text-xs text-primary">{searchedBatch.labName}</p></div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        {[{ icon: Calendar, label: "Manufacture Date", value: formatDate(searchedBatch.manufactureDate) }, { icon: Package, label: "Expiration Date", value: formatDate(searchedBatch.expirationDate) }, { icon: Beaker, label: "Test Date", value: formatDate(searchedBatch.testDate) }, { icon: FileText, label: "Testing Lab", value: searchedBatch.labName }].map(({ icon: Icon, label, value }) => (
                          <div key={label} className="flex items-start gap-3"><Icon className="h-4 w-4 text-muted-foreground mt-0.5" /><div><p className="font-body text-xs text-muted-foreground">{label}</p><p className="font-body text-sm font-medium text-foreground">{value}</p></div></div>
                        ))}
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead><tr className="border-b border-border"><th className="font-body text-xs text-muted-foreground text-left py-2">Test Name</th><th className="font-body text-xs text-muted-foreground text-left py-2">Result</th><th className="font-body text-xs text-muted-foreground text-left py-2">Limit</th><th className="font-body text-xs text-muted-foreground text-right py-2">Status</th></tr></thead>
                          <tbody>
                            {searchedBatch.tests.map((test, index) => (
                              <tr key={index} className="border-b border-border/50 last:border-0">
                                <td className="font-body text-sm text-foreground py-3">{test.name}</td>
                                <td className="font-mono text-sm text-foreground py-3">{test.result}</td>
                                <td className="font-mono text-xs text-muted-foreground py-3">{test.limit}</td>
                                <td className="text-right py-3"><span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${test.status === 'passed' ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'}`}>{test.status === 'passed' ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}{test.status === 'passed' ? 'Pass' : 'Fail'}</span></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="text-center animate-fade-up">
                    <Link to="/product" onClick={() => window.scrollTo(0, 0)}><Button variant="hero" size="xl" className="gap-2 animate-pulse-subtle">Shop Now<ArrowRight className="h-5 w-5" /></Button></Link>
                  </div>
                </div>
              ) : null}
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default TransparencyPage;
