import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, CreditCard, Smartphone, Building2, Truck, Shield, CheckCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CheckoutPage = () => {
  const { items, subtotal } = useCart();
  const shipping = subtotal >= 500 ? 0 : 49;
  const total = subtotal + shipping;
  const [formData, setFormData] = useState({ name: "", phone: "", address: "", pincode: "", city: "" });
  const [selectedPayment, setSelectedPayment] = useState<string>("upi");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { const { name, value } = e.target; setFormData((prev) => ({ ...prev, [name]: value })); };
  const paymentMethods = [
    { id: "upi", name: "UPI", icon: Smartphone, description: "GPay, PhonePe, Paytm", popular: true },
    { id: "card", name: "Credit/Debit Card", icon: CreditCard, description: "Visa, Mastercard, RuPay", popular: false },
    { id: "netbanking", name: "Net Banking", icon: Building2, description: "All major banks", popular: false },
  ];

  return (
    <>
      <Helmet><title>Checkout | WellForged</title></Helmet>
      <Navbar />
      <main className="min-h-screen bg-background pt-16 sm:pt-20 pb-8 sm:pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 sm:mb-8">
            <Link to="/product" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"><ArrowLeft className="h-4 w-4" /><span className="font-body text-sm">Back to Product</span></Link>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground">Checkout</h1>
          </div>
          {items.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-body text-lg text-muted-foreground mb-4">Your cart is empty</p>
              <Link to="/product"><Button variant="hero">Continue Shopping</Button></Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
              <div className="lg:col-span-3 space-y-6">
                <div className="bg-card rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-border">
                  <div className="flex items-center gap-2 mb-4"><MapPin className="h-5 w-5 text-primary" /><h2 className="font-display text-lg sm:text-xl font-semibold text-foreground">Shipping Details</h2></div>
                  <div className="space-y-4">
                    <div><label className="font-body text-sm font-medium text-foreground mb-1.5 block">Full Name *</label><Input name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your full name" /></div>
                    <div><label className="font-body text-sm font-medium text-foreground mb-1.5 block">Phone Number *</label><Input name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="+91 98765 43210" /></div>
                    <div><label className="font-body text-sm font-medium text-foreground mb-1.5 block">Address *</label><Input name="address" value={formData.address} onChange={handleInputChange} placeholder="House/Flat No., Street, Locality" /></div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className="font-body text-sm font-medium text-foreground mb-1.5 block">Pincode *</label><Input name="pincode" value={formData.pincode} onChange={handleInputChange} placeholder="400001" /></div>
                      <div><label className="font-body text-sm font-medium text-foreground mb-1.5 block">City *</label><Input name="city" value={formData.city} onChange={handleInputChange} placeholder="Mumbai" /></div>
                    </div>
                  </div>
                </div>
                <div className="bg-card rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-border">
                  <div className="flex items-center gap-2 mb-4"><CreditCard className="h-5 w-5 text-primary" /><h2 className="font-display text-lg sm:text-xl font-semibold text-foreground">Payment Method</h2></div>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <button key={method.id} onClick={() => setSelectedPayment(method.id)} className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left ${selectedPayment === method.id ? "border-primary bg-primary/5" : "border-border bg-background hover:border-primary/50"}`}>
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${selectedPayment === method.id ? "bg-primary/20" : "bg-muted"}`}><method.icon className={`h-5 w-5 ${selectedPayment === method.id ? "text-primary" : "text-muted-foreground"}`} /></div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2"><span className="font-display font-medium text-foreground">{method.name}</span>{method.popular && <span className="px-2 py-0.5 bg-gold/20 text-gold text-xs font-medium rounded-full">Popular</span>}</div>
                          <p className="font-body text-xs text-muted-foreground">{method.description}</p>
                        </div>
                        <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${selectedPayment === method.id ? "border-primary bg-primary" : "border-muted-foreground/30"}`}>{selectedPayment === method.id && <CheckCircle className="h-3 w-3 text-primary-foreground" />}</div>
                      </button>
                    ))}
                  </div>
                  <p className="font-body text-xs text-muted-foreground mt-4 text-center">Payment integration coming soon. Contact us for manual orders.</p>
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="bg-card rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-border sticky top-20">
                  <h2 className="font-display text-lg sm:text-xl font-semibold text-foreground mb-4">Order Summary</h2>
                  <div className="space-y-3 mb-4 pb-4 border-b border-border">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <img src={item.image} alt={item.name} className="w-14 h-14 object-contain bg-secondary rounded-lg" />
                        <div className="flex-1 min-w-0"><p className="font-body text-sm font-medium text-foreground truncate">{item.name}</p><p className="font-body text-xs text-muted-foreground">Qty: {item.quantity}</p></div>
                        <p className="font-display text-sm font-semibold text-foreground">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between font-body text-sm"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground">₹{subtotal.toLocaleString()}</span></div>
                    <div className="flex justify-between font-body text-sm"><span className="text-muted-foreground">Delivery</span><span className={shipping === 0 ? "text-primary font-medium" : "text-foreground"}>{shipping === 0 ? "FREE" : `₹${shipping}`}</span></div>
                  </div>
                  <div className="flex justify-between font-display text-lg font-semibold pt-3 border-t border-border mb-4"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
                  <Button variant="hero" size="xl" className="w-full mb-4">Place Order</Button>
                  <div className="flex flex-wrap justify-center gap-3 pt-3 border-t border-border">
                    <div className="flex items-center gap-1.5 text-muted-foreground"><Shield className="h-4 w-4 text-primary" /><span className="font-body text-xs">Secure Payment</span></div>
                    <div className="flex items-center gap-1.5 text-muted-foreground"><Truck className="h-4 w-4 text-primary" /><span className="font-body text-xs">Fast Delivery</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CheckoutPage;
