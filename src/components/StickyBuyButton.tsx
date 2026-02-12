import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StickyBuyButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolledPast, setHasScrolledPast] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setHasScrolledPast(scrollY > 600);
      if (scrollY > 600) { setTimeout(() => setIsVisible(true), 100); } else { setIsVisible(false); }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!hasScrolledPast) return null;

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 md:hidden p-3 sm:p-4 bg-background/95 backdrop-blur-lg border-t border-border shadow-elevated transition-all duration-300 safe-area-bottom ${isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-display font-semibold text-foreground truncate" style={{ fontSize: "var(--text-base)" }}>Moringa Powder</p>
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-primary" style={{ fontSize: "var(--text-sm)" }}>₹549</span>
            <span className="font-body text-muted-foreground line-through" style={{ fontSize: "var(--text-xs)" }}>₹699</span>
            <span className="px-1.5 py-0.5 bg-gold/20 text-gold text-[9px] font-semibold rounded">250g</span>
          </div>
        </div>
        <Button variant="hero" size="default" className="gap-1.5 px-4 h-11 sm:h-12 flex-shrink-0" style={{ fontSize: "var(--text-sm)" }} onClick={() => navigate("/product")}>
          <ShoppingCart className="h-4 w-4" />Buy Now
        </Button>
      </div>
    </div>
  );
};

export default StickyBuyButton;
