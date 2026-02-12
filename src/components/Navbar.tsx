import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowLeft, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import newLogo from "@/assets/Transparent_logo.png";
import homeLogo from "@/assets/Transparent_logo_WF.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { totalItems, setIsOpen: setCartOpen } = useCart();
  const isSubPage = location.pathname !== "/" && location.pathname !== "";
  const isHomePage = location.pathname === "/" || location.pathname === "";
  const currentLogo = isHomePage ? homeLogo : newLogo;

  const allLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/product" },
    { name: "Transparency", href: "/transparency" },
  ];

  const navLinks = allLinks.filter(link => {
    if (location.pathname === "/" && link.href === "/") return false;
    if (location.pathname === "/product" && link.href === "/product") return false;
    if (location.pathname === "/transparency" && link.href === "/transparency") return false;
    return true;
  });

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 sm:h-14 lg:h-16">
          <div className="flex items-center gap-1.5 sm:gap-3">
            {isSubPage && (
              <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                <Button variant="ghost" size="sm" className="gap-1 transition-all duration-300 hover:-translate-x-1 px-1.5 sm:px-2">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
            )}
            <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center gap-2 group">
              <img src={currentLogo} alt="WellForged" className={`object-contain ${isHomePage ? 'h-auto w-32 sm:w-40 lg:w-48' : 'h-8 sm:h-9 lg:h-10 w-auto'}`} />
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-6 lg:gap-10">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.href} onClick={() => window.scrollTo(0, 0)} className="relative text-foreground/80 hover:text-foreground font-body text-sm lg:text-base tracking-wide transition-all duration-300 group">
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => setCartOpen(true)} className="relative p-2 hover:bg-muted rounded-full transition-colors" aria-label="Open cart">
              <ShoppingCart className="h-5 w-5 text-foreground" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-5 w-5 bg-destructive text-destructive-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>
          </div>
          <div className="flex md:hidden items-center gap-2">
            <button onClick={() => setCartOpen(true)} className="relative p-2 hover:bg-muted rounded-full transition-colors" aria-label="Open cart">
              <ShoppingCart className="h-5 w-5 text-foreground" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-5 w-5 bg-destructive text-destructive-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>
            <button className="p-2 transition-transform duration-300 hover:scale-110" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="py-3 sm:py-4 border-t border-border">
            <div className="flex flex-col items-center gap-2 sm:gap-3 text-center">
              {isSubPage && (
                <Link to="/" className="flex items-center justify-center gap-2 text-foreground/80 hover:text-foreground font-body text-base py-2 transition-all duration-300" onClick={() => { setIsOpen(false); window.scrollTo(0, 0); }}>
                  <ArrowLeft className="h-4 w-4" /> Back to Home
                </Link>
              )}
              {navLinks.map((link, index) => (
                <Link key={link.name} to={link.href} className="text-foreground/80 hover:text-foreground font-body text-base py-2 transition-all duration-300" onClick={() => { setIsOpen(false); window.scrollTo(0, 0); }} style={{ transitionDelay: `${index * 50}ms` }}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
