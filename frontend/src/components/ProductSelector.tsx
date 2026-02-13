import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, ShoppingBag, Truck, Shield, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import productImage from "@/assets/Packaging_Updated.png";

interface SKU { id: string; size: string; price: number; originalPrice?: number; label?: string; }

const skus: SKU[] = [
  { id: "d17304a7-739b-40a1-b822-7e619fbfb6bd", size: "100g", price: 349 },
  { id: "c43be4a9-0174-4b01-aa7c-fc8cc011ab72", size: "250g", price: 549, originalPrice: 699, label: "Best Value" },
];

const trustBadges = [
  { icon: Truck, label: "Free Shipping ₹500+" },
  { icon: Shield, label: "Secure UPI Payment" },
  { icon: FlaskConical, label: "Lab Verified" },
];

const ProductSelector = () => {
  const [selectedSku, setSelectedSku] = useState<SKU>(skus[1]);
  const { addItem, totalItems, setIsOpen } = useCart();
  const { isLoggedIn, setPendingCartAction, setRedirectUrl } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      // Store pending cart action
      setPendingCartAction({ sku: selectedSku.id, action: "add" });
      // Store current page as redirect URL
      setRedirectUrl("/product");
      // Redirect to auth
      navigate("/auth");
      return;
    }

    // User is logged in, add to cart normally
    await addItem({ id: selectedSku.id, name: `Moringa Powder - ${selectedSku.size}`, size: selectedSku.size, price: selectedSku.price, originalPrice: selectedSku.originalPrice, image: productImage });
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="space-y-2">
        <label className="font-body text-sm font-medium text-foreground">Select Size</label>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {skus.map((sku) => (
            <button key={sku.id} onClick={() => setSelectedSku(sku)} className={`relative p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 text-left min-h-[44px] ${selectedSku.id === sku.id ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/50"}`}>
              {sku.label && <span className="absolute -top-2 left-2 sm:left-3 px-1.5 py-0.5 bg-gold text-[9px] sm:text-[10px] font-semibold rounded-full text-foreground whitespace-nowrap">{sku.label}</span>}
              <div className="font-display font-semibold text-foreground" style={{ fontSize: "var(--text-base)" }}>{sku.size}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-display font-bold text-primary" style={{ fontSize: "var(--text-lg)" }}>₹{sku.price}</span>
                {sku.originalPrice && <span className="font-body text-muted-foreground line-through" style={{ fontSize: "var(--text-xs)" }}>₹{sku.originalPrice}</span>}
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        {totalItems > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            <Button variant="hero" size="lg" className="w-full h-11 sm:h-12 gap-2 text-sm" onClick={handleAddToCart}><ShoppingCart className="h-4 w-4" />Add to Cart</Button>
            <Button variant="outline" size="lg" className="w-full h-11 sm:h-12 gap-2 text-sm" onClick={() => setIsOpen(true)}><ShoppingBag className="h-4 w-4" />Go to Cart</Button>
          </div>
        ) : (
          <Button variant="hero" size="lg" className="w-full h-11 sm:h-12 gap-2 text-sm" onClick={handleAddToCart}><ShoppingCart className="h-4 w-4" />Add to Cart</Button>
        )}
      </div>

    </div>
  );
};

export default ProductSelector;
