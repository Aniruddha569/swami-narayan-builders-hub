import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NewsTicker from "@/components/NewsTicker";
import BuilderIntro from "@/components/BuilderIntro";
import PlotPromotion from "@/components/PlotPromotion";
import YouTubeVideo from "@/components/YouTubeVideo";
import Stats from "@/components/Stats";
import OngoingProjects from "@/components/OngoingProjects";
import Gallery from "@/components/Gallery";
import WhyChooseUs from "@/components/WhyChooseUs";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <NewsTicker />
        <BuilderIntro />
        <YouTubeVideo />
        <PlotPromotion />
        <Stats />
        <OngoingProjects />
        <Gallery />
        <WhyChooseUs />
        <CTASection />
      </main>
      <Footer />
      <AIChatbot />
    </div>
  );
};

export default Home;
