import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, IndianRupee, Calendar, Percent } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(3000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const emi = useMemo(() => {
    const P = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenure * 12;
    if (r === 0) return P / n;
    return (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }, [loanAmount, interestRate, tenure]);

  const totalPayment = emi * tenure * 12;
  const totalInterest = totalPayment - loanAmount;

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  const interestPercent = (totalInterest / totalPayment) * 100;

  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-accent font-medium tracking-widest uppercase mb-3 text-sm">
            गृहकर्ज कॅल्क्युलेटर
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            EMI Calculator
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            तुमच्या स्वप्नातील घरासाठी मासिक हप्ता जाणून घ्या
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto bg-card rounded-2xl shadow-lg border border-border overflow-hidden"
        >
          <div className="grid md:grid-cols-2">
            {/* Inputs */}
            <div className="p-6 md:p-8 space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                  <IndianRupee className="w-4 h-4 text-accent" />
                  कर्जाची रक्कम (₹)
                </label>
                <Input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="text-lg"
                />
                <input
                  type="range"
                  min={500000}
                  max={50000000}
                  step={100000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full mt-2 accent-accent"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>₹5L</span>
                  <span>₹5Cr</span>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                  <Percent className="w-4 h-4 text-accent" />
                  व्याज दर (% प्रति वर्ष)
                </label>
                <Input
                  type="number"
                  value={interestRate}
                  step={0.1}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                />
                <input
                  type="range"
                  min={5}
                  max={20}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full mt-2 accent-accent"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                  <Calendar className="w-4 h-4 text-accent" />
                  कर्ज कालावधी (वर्षे)
                </label>
                <Input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                />
                <input
                  type="range"
                  min={1}
                  max={30}
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full mt-2 accent-accent"
                />
              </div>
            </div>

            {/* Results */}
            <div className="bg-primary text-cream p-6 md:p-8 flex flex-col justify-center">
              <div className="text-center mb-6">
                <Calculator className="w-8 h-8 text-accent mx-auto mb-3" />
                <p className="text-cream/70 text-sm mb-1">तुमचा मासिक हप्ता (EMI)</p>
                <motion.p
                  key={emi}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-3xl md:text-4xl font-bold text-accent"
                >
                  {formatCurrency(emi)}
                </motion.p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-cream/10">
                  <span className="text-cream/70 text-sm">मूळ रक्कम</span>
                  <span className="font-semibold">{formatCurrency(loanAmount)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-cream/10">
                  <span className="text-cream/70 text-sm">एकूण व्याज</span>
                  <span className="font-semibold text-accent">{formatCurrency(totalInterest)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-cream/70 text-sm">एकूण रक्कम</span>
                  <span className="font-bold text-lg">{formatCurrency(totalPayment)}</span>
                </div>
              </div>

              {/* Simple bar */}
              <div className="mt-6">
                <div className="w-full h-3 bg-cream/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all duration-500"
                    style={{ width: `${100 - interestPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs mt-1 text-cream/50">
                  <span>मूळ रक्कम ({(100 - interestPercent).toFixed(0)}%)</span>
                  <span>व्याज ({interestPercent.toFixed(0)}%)</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EMICalculator;
