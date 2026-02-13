import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import ManifestoHero from "@/components/ManifestoHero";
import IntegrityPillars from "@/components/IntegrityPillars";
import WhyWeExist from "@/components/WhyWeExist";
import TamilNaduTerroir from "@/components/TamilNaduTerroir";
import NABLVerification from "@/components/NABLVerification";
import ProcessTimeline from "@/components/ProcessTimeline";
import ManifestoCTA from "@/components/ManifestoCTA";
import Footer from "@/components/Footer";
import StickyBuyButton from "@/components/StickyBuyButton";

const Index = () => {
    return (
        <>
            <Helmet>
                <title>WellForged | Wellness, Forged with Integrity</title>
                <meta name="description" content="Most brands ask for your trust. We provide the proof. WellForged is the new standard of radical transparency in wellness." />
                <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap" rel="stylesheet" />
            </Helmet>
            <main className="min-h-screen">
                <Navbar />
                <ManifestoHero />
                <IntegrityPillars />
                <WhyWeExist />
                <TamilNaduTerroir />
                <NABLVerification />
                <ProcessTimeline />
                <ManifestoCTA />
                <Footer />
                <StickyBuyButton />
            </main>
        </>
    );
};

export default Index;
