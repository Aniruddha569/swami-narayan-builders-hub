import Header from "@/components/Header";
import VisionMission from "@/components/VisionMission";
import Footer from "@/components/Footer";

const VisionPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <VisionMission />
      </main>
      <Footer />
    </div>
  );
};

export default VisionPage;
