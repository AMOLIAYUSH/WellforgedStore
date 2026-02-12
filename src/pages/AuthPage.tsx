import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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
        receivePromotions: false,
        acceptTerms: false,
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
        { id: "moringa-100g", size: "100g", price: 349 },
        { id: "moringa-250g", size: "250g", price: 549, originalPrice: 699 },
    ];

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.acceptTerms) {
            toast({
                title: "Terms Required",
                description: "Please accept the terms and conditions to continue.",
                variant: "destructive",
            });
            return;
        }

        // Log the user in
        login(formData.whatsapp, `${formData.firstName} ${formData.lastName}`);

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
            receivePromotions: false,
            acceptTerms: false,
        });
    };

    const handleSignIn = (e: React.FormEvent) => {
        e.preventDefault();

        if (signInData.phone === "7078117711" && signInData.otp === "1234") {
            // Log the user in
            login(signInData.phone);

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
        } else {
            toast({
                title: "Invalid Credentials",
                description: "Please check your phone number and OTP.",
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

            <div className="min-h-screen bg-gradient-to-br from-[#f8f9f7] via-[#fdfefe] to-[#f3f5f2] flex flex-col overflow-y-auto">
                {/* Minimal Header */}
                <header className="flex-shrink-0">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
                        <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                            <button className="group flex items-center gap-2 text-[#2D4739] hover:text-[#1a2a20] transition-colors">
                                <ArrowLeft className="h-4 w-4" />
                                <span className="text-sm font-light tracking-wide">Back</span>
                            </button>
                        </Link>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-6 sm:py-8">
                    <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                        {/* Logo Section - Hidden on Mobile */}
                        <div className="hidden lg:flex flex-col items-center justify-center text-center space-y-6">
                            <img
                                src={logo}
                                alt="WellForged Logo"
                                className="w-40 h-40 object-contain opacity-90"
                            />
                            <div className="space-y-2">
                                <h1 className="font-serif text-4xl font-light text-[#2D4739] tracking-tight">
                                    WellForged
                                </h1>
                                <p className="font-light text-sm text-[#5a6b5f] tracking-wide max-w-xs mx-auto leading-relaxed">
                                    Clean nutrition. Complete transparency.
                                </p>
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className="w-full max-w-md mx-auto">
                            <div className="bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-[#e8ebe9] p-5 sm:p-6 lg:p-8 shadow-[0_8px_30px_rgb(45,71,57,0.06)]">
                                <h2 className="font-serif text-xl sm:text-2xl font-light text-[#2D4739] mb-6 sm:mb-8 tracking-tight">
                                    {isSignUp ? "Create Account" : "Welcome Back"}
                                </h2>

                                {isSignUp ? (
                                    // Sign Up Form
                                    <form onSubmit={handleSignUp} className="space-y-4 sm:space-y-5">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    id="firstName"
                                                    value={formData.firstName}
                                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                    required
                                                    placeholder=" "
                                                    className="peer w-full px-4 py-3 bg-transparent border border-[#d4d9d6] rounded-xl focus:border-[#2D4739] focus:outline-none transition-colors text-sm"
                                                />
                                                <label
                                                    htmlFor="firstName"
                                                    className="absolute left-4 top-3 text-[#7a8a7f] text-sm transition-all pointer-events-none origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-85 peer-focus:-translate-y-5 peer-focus:left-3 peer-focus:text-[#2D4739] peer-focus:bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1"
                                                >
                                                    First Name
                                                </label>
                                            </div>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    id="lastName"
                                                    value={formData.lastName}
                                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                    required
                                                    placeholder=" "
                                                    className="peer w-full px-4 py-3 bg-transparent border border-[#d4d9d6] rounded-xl focus:border-[#2D4739] focus:outline-none transition-colors text-sm"
                                                />
                                                <label
                                                    htmlFor="lastName"
                                                    className="absolute left-4 top-3 text-[#7a8a7f] text-sm transition-all pointer-events-none origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-85 peer-focus:-translate-y-5 peer-focus:left-3 peer-focus:text-[#2D4739] peer-focus:bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1"
                                                >
                                                    Last Name
                                                </label>
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <input
                                                type="number"
                                                id="age"
                                                value={formData.age}
                                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                                required
                                                min="1"
                                                max="120"
                                                placeholder=" "
                                                className="peer w-full px-4 py-3 bg-transparent border border-[#d4d9d6] rounded-xl focus:border-[#2D4739] focus:outline-none transition-colors text-sm"
                                            />
                                            <label
                                                htmlFor="age"
                                                className="absolute left-4 top-3 text-[#7a8a7f] text-sm transition-all pointer-events-none origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-85 peer-focus:-translate-y-5 peer-focus:left-3 peer-focus:text-[#2D4739] peer-focus:bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1"
                                            >
                                                Age
                                            </label>
                                        </div>

                                        <div className="relative">
                                            <input
                                                type="email"
                                                id="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                required
                                                placeholder=" "
                                                className="peer w-full px-4 py-3 bg-transparent border border-[#d4d9d6] rounded-xl focus:border-[#2D4739] focus:outline-none transition-colors text-sm"
                                            />
                                            <label
                                                htmlFor="email"
                                                className="absolute left-4 top-3 text-[#7a8a7f] text-sm transition-all pointer-events-none origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-85 peer-focus:-translate-y-5 peer-focus:left-3 peer-focus:text-[#2D4739] peer-focus:bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1"
                                            >
                                                Email
                                            </label>
                                        </div>

                                        <div className="relative">
                                            <input
                                                type="tel"
                                                id="whatsapp"
                                                value={formData.whatsapp}
                                                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                                required
                                                pattern="[0-9]{10}"
                                                placeholder=" "
                                                className="peer w-full px-4 py-3 bg-transparent border border-[#d4d9d6] rounded-xl focus:border-[#2D4739] focus:outline-none transition-colors text-sm"
                                            />
                                            <label
                                                htmlFor="whatsapp"
                                                className="absolute left-4 top-3 text-[#7a8a7f] text-sm transition-all pointer-events-none origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-85 peer-focus:-translate-y-5 peer-focus:left-3 peer-focus:text-[#2D4739] peer-focus:bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1"
                                            >
                                                WhatsApp Number
                                            </label>
                                        </div>

                                        <div className="space-y-3 pt-2">
                                            <label className="flex items-start gap-3 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.receivePromotions}
                                                    onChange={(e) => setFormData({ ...formData, receivePromotions: e.target.checked })}
                                                    className="mt-0.5 w-4 h-4 rounded border-[#d4d9d6] text-[#2D4739] focus:ring-[#2D4739] focus:ring-offset-0"
                                                />
                                                <span className="text-xs text-[#5a6b5f] font-light leading-relaxed">
                                                    Receive WhatsApp promotions
                                                </span>
                                            </label>

                                            <label className="flex items-start gap-3 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.acceptTerms}
                                                    onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                                                    className="mt-0.5 w-4 h-4 rounded border-[#d4d9d6] text-[#2D4739] focus:ring-[#2D4739] focus:ring-offset-0"
                                                />
                                                <span className="text-xs text-[#5a6b5f] font-light leading-relaxed">
                                                    I accept the terms and conditions
                                                </span>
                                            </label>
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full bg-[#2D4739] text-white py-3.5 rounded-xl font-light tracking-wide transition-all hover:bg-[#1a2a20] hover:scale-[1.02] active:scale-[0.98] mt-6"
                                        >
                                            Create Account
                                        </button>

                                        <p className="text-center text-xs text-[#7a8a7f] font-light mt-4">
                                            Already a member?{" "}
                                            <button
                                                type="button"
                                                onClick={() => setIsSignUp(false)}
                                                className="text-[#2D4739] font-normal hover:underline"
                                            >
                                                Sign In
                                            </button>
                                        </p>
                                    </form>
                                ) : (
                                    // Sign In Form
                                    <form onSubmit={handleSignIn} className="space-y-5">
                                        <div className="relative">
                                            <input
                                                type="tel"
                                                id="phone"
                                                value={signInData.phone}
                                                onChange={(e) => setSignInData({ ...signInData, phone: e.target.value })}
                                                required
                                                pattern="[0-9]{10}"
                                                placeholder=" "
                                                className="peer w-full px-4 py-3 bg-transparent border border-[#d4d9d6] rounded-xl focus:border-[#2D4739] focus:outline-none transition-colors text-sm"
                                            />
                                            <label
                                                htmlFor="phone"
                                                className="absolute left-4 top-3 text-[#7a8a7f] text-sm transition-all pointer-events-none origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-85 peer-focus:-translate-y-5 peer-focus:left-3 peer-focus:text-[#2D4739] peer-focus:bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1"
                                            >
                                                Registered WhatsApp Number
                                            </label>
                                        </div>

                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="otp"
                                                value={signInData.otp}
                                                onChange={(e) => setSignInData({ ...signInData, otp: e.target.value })}
                                                required
                                                placeholder=" "
                                                className="peer w-full px-4 py-3 bg-transparent border border-[#d4d9d6] rounded-xl focus:border-[#2D4739] focus:outline-none transition-colors text-sm"
                                            />
                                            <label
                                                htmlFor="otp"
                                                className="absolute left-4 top-3 text-[#7a8a7f] text-sm transition-all pointer-events-none origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-85 peer-focus:-translate-y-5 peer-focus:left-3 peer-focus:text-[#2D4739] peer-focus:bg-white peer-focus:px-1 peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1"
                                            >
                                                OTP
                                            </label>
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full bg-[#2D4739] text-white py-3.5 rounded-xl font-light tracking-wide transition-all hover:bg-[#1a2a20] hover:scale-[1.02] active:scale-[0.98] mt-6"
                                        >
                                            Sign In
                                        </button>

                                        <p className="text-center text-xs text-[#7a8a7f] font-light mt-4">
                                            Don't have an account?{" "}
                                            <button
                                                type="button"
                                                onClick={() => setIsSignUp(true)}
                                                className="text-[#2D4739] font-normal hover:underline"
                                            >
                                                Create Account
                                            </button>
                                        </p>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default AuthPage;
