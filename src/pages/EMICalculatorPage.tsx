import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EMICalculator from "@/components/EMICalculator";

const EMICalculatorPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-4">
        <EMICalculator />
      </main>
      <Footer />
    </div>
  );
};

export default EMICalculatorPage;
