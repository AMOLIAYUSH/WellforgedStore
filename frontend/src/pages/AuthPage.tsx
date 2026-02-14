import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import logo from "@/assets/WellForged_Shield_Logo.png";
import productImage from "@/assets/Packaging_Updated.png";

const AuthPage = () => {
    const [isSignUp, setIsSignUp] = useState(true);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        age: "",
        email: "",
        whatsapp: "",
        receiveWhatsApp: true,
        acceptTerms: true,
    });
    const [signInData, setSignInData] = useState({
        phone: "",
        otp: "",
    });
    const { toast } = useToast();
    const navigate = useNavigate();
    const { login, redirectUrl, setRedirectUrl, pendingCartAction, setPendingCartAction } = useAuth();
    const { addItem } = useCart();

    // SKU data for pending cart actions
    const skus = [
        { id: "d17304a7-739b-40a1-b822-7e619fbfb6bd", size: "100g", price: 349 },
        { id: "c43be4a9-0174-4b01-aa7c-fc8cc011ab72", size: "250g", price: 549, originalPrice: 699 },
    ];

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.acceptTerms) {
            toast({
                title: "Terms Required",
                description: "Please accept the terms and conditions to continue.",
                variant: "destructive",
            });
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    email: formData.email,
                    mobile_number: formData.whatsapp,
                    otp: "1234" // Default OTP as requested
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast({
                    title: "Registration Failed",
                    description: data.message || "Something went wrong",
                    variant: "destructive",
                });
                return;
            }

            // Log the user in
            login(data.token, data.user);

            toast({
                title: "Welcome to WellForged",
                description: "Your account has been created successfully.",
            });

            // Handle pending cart action if exists
            if (pendingCartAction) {
                const sku = skus.find(s => s.id === pendingCartAction.sku);
                if (sku) {
                    addItem({
                        id: sku.id,
                        name: `Moringa Powder - ${sku.size}`,
                        size: sku.size,
                        price: sku.price,
                        originalPrice: sku.originalPrice,
                        image: productImage,
                    });
                    toast({
                        title: "Item Added",
                        description: "Your selected item has been added to cart.",
                    });
                }
                setPendingCartAction(null);
            }

            // Redirect to stored URL or home
            const targetUrl = redirectUrl || "/";
            setRedirectUrl(null);
            navigate(targetUrl);

            // Reset form
            setFormData({
                firstName: "",
                lastName: "",
                age: "",
                email: "",
                whatsapp: "",
                receiveWhatsApp: true,
                acceptTerms: true,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to connect to the server.",
                variant: "destructive",
            });
        }
    };

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    mobile_number: signInData.phone,
                    otp: signInData.otp
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast({
                    title: "Sign In Failed",
                    description: data.message || "Invalid credentials",
                    variant: "destructive",
                });
                return;
            }

            // Log the user in
            login(data.token, data.user);

            toast({
                title: "Welcome back",
                description: "You have successfully signed in.",
            });

            // Handle pending cart action if exists
            if (pendingCartAction) {
                const sku = skus.find(s => s.id === pendingCartAction.sku);
                if (sku) {
                    addItem({
                        id: sku.id,
                        name: `Moringa Powder - ${sku.size}`,
                        size: sku.size,
                        price: sku.price,
                        originalPrice: sku.originalPrice,
                        image: productImage,
                    });
                    toast({
                        title: "Item Added",
                        description: "Your selected item has been added to cart.",
                    });
                }
                setPendingCartAction(null);
            }

            // Redirect to stored URL or home
            const targetUrl = redirectUrl || "/";
            setRedirectUrl(null);
            navigate(targetUrl);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to connect to the server.",
                variant: "destructive",
            });
        }
    };

    return (
        <>
            <Helmet>
                <title>{isSignUp ? "Join WellForged" : "Sign In"} | WellForged</title>
                <meta name="description" content="Join WellForged for clean, transparent nutrition." />
            </Helmet>

            <div className="min-h-screen bg-[#fcfdfc] relative flex flex-col items-center justify-center py-4 px-4 sm:px-6 lg:px-8 overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] animate-pulse-subtle" />
                    <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-gold/5 rounded-full blur-[120px] animate-pulse-subtle" style={{ animationDelay: '2s' }} />
                </div>

                <div className="w-full max-w-[1000px] relative z-10 animate-fade-up">
                    {/* Main Auth Container */}
                    <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col lg:grid lg:grid-cols-2">

                        {/* Left Side: Branding & Value Prop */}
                        <div className="flex flex-col justify-center p-6 lg:p-10 bg-gradient-to-br from-primary/10 via-background to-gold/10 border-b lg:border-b-0 lg:border-r border-border/50 relative">
                            {/* Back Link */}
                            <Link to="/" className="lg:absolute lg:top-8 lg:left-8 mb-4 lg:mb-0 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-300 text-sm font-medium">
                                <ArrowLeft className="h-4 w-4" /> Back to Home
                            </Link>

                            <div className="space-y-4 lg:space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left">
                                <div className="space-y-2">
                                    <h2 className="font-display text-xl lg:text-2xl font-bold text-foreground leading-tight">
                                        Join the standard for <br />
                                        <span className="text-primary italic">Clean Nutrition</span>
                                    </h2>
                                    <p className="font-body text-xs text-muted-foreground leading-relaxed max-w-sm">
                                        Access verified third-party lab results for every batch and join a community dedicated to transparency.
                                    </p>
                                </div>

                                <div className="hidden lg:block space-y-2">
                                    {[
                                        { title: "Batch Specific Reports", desc: "Every single product is verified." },
                                        { title: "No Fillers", desc: "100% Moringa Oleifera." }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-2 items-start">
                                            <div className="mt-1 h-3.5 w-3.5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                                <div className="h-1 w-1 rounded-full bg-primary" />
                                            </div>
                                            <div>
                                                <h4 className="font-display font-semibold text-xs text-foreground">{item.title}</h4>
                                                <p className="font-body text-[9px] text-muted-foreground">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Interactive Form */}
                        <div className="p-6 lg:p-10 flex flex-col justify-center bg-card/10">
                            <div className="mb-4">
                                <h3 className="font-display text-xl font-bold text-foreground mb-0.5">{isSignUp ? "Create Account" : "Sign In"}</h3>
                                <p className="font-body text-xs text-muted-foreground">
                                    {isSignUp ? "Enter your details to join." : "Welcome back! Enter your details."}
                                </p>
                            </div>

                            {isSignUp ? (
                                <form onSubmit={handleSignUp} className="space-y-2 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        <div className="space-y-1">
                                            <label htmlFor="firstName" className="font-body text-[10px] font-bold text-muted-foreground ml-1 uppercase tracking-wider">First Name</label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                value={formData.firstName}
                                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                required
                                                className="w-full h-9 px-4 bg-background border border-border rounded-xl focus:border-primary focus:outline-none transition-all text-xs"
                                                placeholder="John"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label htmlFor="lastName" className="font-body text-[10px] font-bold text-muted-foreground ml-1 uppercase tracking-wider">Last Name</label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                value={formData.lastName}
                                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                required
                                                className="w-full h-9 px-4 bg-background border border-border rounded-xl focus:border-primary focus:outline-none transition-all text-xs"
                                                placeholder="Doe"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label htmlFor="email" className="font-body text-[10px] font-bold text-muted-foreground ml-1 uppercase tracking-wider">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                            className="w-full h-9 px-4 bg-background border border-border rounded-xl focus:border-primary focus:outline-none transition-all text-xs"
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label htmlFor="whatsapp" className="font-body text-[10px] font-bold text-muted-foreground ml-1 uppercase tracking-wider">WhatsApp</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-body border-r pr-3">+91</span>
                                            <input
                                                type="tel"
                                                id="whatsapp"
                                                value={formData.whatsapp}
                                                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                                required
                                                pattern="[0-9]{10}"
                                                className="w-full h-9 pl-16 pr-4 bg-background border border-border rounded-xl focus:border-primary focus:outline-none transition-all text-xs"
                                                placeholder="9876543210"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2 mt-2">
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={formData.receiveWhatsApp}
                                                onChange={(e) => setFormData({ ...formData, receiveWhatsApp: e.target.checked })}
                                                className="w-4 h-4 rounded border-border text-primary focus:ring-primary focus:ring-offset-0 transition-all cursor-pointer"
                                            />
                                            <span className="text-[10px] text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                                                Receive WhatsApp notifications
                                            </span>
                                        </label>

                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={formData.acceptTerms}
                                                onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                                                className="w-4 h-4 rounded border-border text-primary focus:ring-primary focus:ring-offset-0 transition-all cursor-pointer"
                                            />
                                            <span className="text-[10px] text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                                                I accept <Link to="/terms" className="text-primary hover:underline underline-offset-4 font-bold">Terms & Conditions</Link>
                                            </span>
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full h-10 bg-primary text-white rounded-xl font-display font-bold tracking-wide transition-all hover:bg-primary-hover hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-primary/20 mt-1"
                                    >
                                        Forge Account
                                    </button>
                                </form>
                            ) : (
                                <form onSubmit={handleSignIn} className="space-y-3 animate-in fade-in slide-in-from-left-4 duration-500">
                                    <div className="space-y-1">
                                        <label htmlFor="phone" className="font-body text-[10px] font-bold text-muted-foreground ml-1 uppercase tracking-wider">WhatsApp</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-body border-r pr-3">+91</span>
                                            <input
                                                type="tel"
                                                id="phone"
                                                value={signInData.phone}
                                                onChange={(e) => setSignInData({ ...signInData, phone: e.target.value })}
                                                required
                                                pattern="[0-9]{10}"
                                                className="w-full h-10 pl-16 pr-4 bg-background border border-border rounded-xl focus:border-primary focus:outline-none transition-all text-xs"
                                                placeholder="9876543210"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex justify-between items-center ml-1">
                                            <label htmlFor="otp" className="font-body text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Security OTP</label>
                                            <button type="button" className="text-[10px] text-primary font-bold hover:underline uppercase tracking-wider">Get OTP</button>
                                        </div>
                                        <input
                                            type="text"
                                            id="otp"
                                            value={signInData.otp}
                                            onChange={(e) => setSignInData({ ...signInData, otp: e.target.value })}
                                            required
                                            maxLength={4}
                                            className="w-full h-10 px-4 bg-background border border-border rounded-xl focus:border-primary focus:outline-none transition-all text-sm tracking-[0.5em] text-center font-bold"
                                            placeholder="••••"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full h-10 bg-primary text-white rounded-xl font-display font-bold tracking-wide transition-all hover:bg-primary-hover hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-primary/20 mt-1"
                                    >
                                        Sign In Securely
                                    </button>
                                </form>
                            )}

                            <div className="mt-4 pt-4 border-t border-border/50 text-center">
                                <p className="text-xs text-muted-foreground font-body">
                                    {isSignUp ? "Already a member?" : "New here?"}{" "}
                                    <button
                                        type="button"
                                        onClick={() => setIsSignUp(!isSignUp)}
                                        className="text-primary font-bold hover:underline decoration-2 underline-offset-4"
                                    >
                                        {isSignUp ? "Sign In" : "Create Account"}
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthPage;
