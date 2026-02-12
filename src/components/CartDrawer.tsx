import { X, Plus, Minus, ShoppingBag, Truck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, subtotal, totalItems } = useCart();
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col bg-background">
        <SheetHeader className="border-b border-border pb-3">
          <SheetTitle className="flex items-center gap-2 font-display" style={{ fontSize: "var(--text-xl)" }}><ShoppingBag className="h-5 w-5" />Your Cart ({totalItems})</SheetTitle>
        </SheetHeader>
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-12">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <p className="font-body text-lg text-muted-foreground mb-2">Your cart is empty</p>
            <p className="font-body text-sm text-muted-foreground/70 text-center">Add some products to get started</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-3 space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 bg-card rounded-xl border border-border">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-contain bg-secondary rounded-lg" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1.5">
                      <div>
                        <h4 className="font-display font-semibold text-foreground text-sm leading-tight">{item.name}</h4>
                        <span className="inline-block px-1.5 py-0.5 bg-primary/10 text-primary-[10px] text-xs font-medium rounded-full mt-0.5">{item.size}</span>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-foreground transition-colors p-2.5 -mr-2.5"><X className="h-5 w-5" /></button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 bg-muted rounded-lg h-11">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 hover:bg-muted-foreground/10 rounded-l-lg transition-colors h-full flex items-center justify-center min-w-[44px]"><Minus className="h-4 w-4" /></button>
                        <span className="font-body text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 hover:bg-muted-foreground/10 rounded-r-lg transition-colors h-full flex items-center justify-center min-w-[44px]"><Plus className="h-4 w-4" /></button>
                      </div>
                      <div className="text-right">
                        <p className="font-display font-semibold text-foreground">₹{(item.price * item.quantity).toLocaleString()}</p>
                        {item.originalPrice && <p className="font-body text-xs text-muted-foreground line-through">₹{(item.originalPrice * item.quantity).toLocaleString()}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 space-y-2">
              <div className="flex justify-between font-display text-base sm:text-lg font-semibold pt-2"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
              <Link to="/checkout" onClick={() => setIsOpen(false)}>
                <Button variant="hero" size="lg" className="w-full mt-3 gap-2 h-12">Proceed to Checkout<ArrowRight className="h-5 w-5" /></Button>
              </Link>
              <button onClick={() => setIsOpen(false)} className="w-full text-center font-body text-sm text-muted-foreground hover:text-foreground transition-colors py-3">Continue Shopping</button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
