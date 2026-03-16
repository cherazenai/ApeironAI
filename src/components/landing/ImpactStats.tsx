import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const stats = [
  { value: 12000000, label: "Research papers analyzed", suffix: "M", divisor: 1000000, decimals: 1 },
  { value: 450000, label: "Hypotheses generated", suffix: "K", divisor: 1000, decimals: 0 },
  { value: 89000, label: "Experiments simulated", suffix: "K", divisor: 1000, decimals: 0 },
  { value: 3200000, label: "Research insights discovered", suffix: "M", divisor: 1000000, decimals: 1 },
];

function Counter({ value, suffix, divisor, decimals }: { value: number; suffix: string; divisor: number; decimals: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const target = value / divisor;
    const duration = 2000;
    const steps = 60;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * target);
      if (step >= steps) {
        setCount(target);
        clearInterval(timer);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value, divisor]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toFixed(decimals)}{suffix}
    </span>
  );
}

const ImpactStats = () => (
  <section className="section-padding">
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3 font-body">Research Impact</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight">Powering Discovery at Scale</h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-6 text-center hover:border-primary/30 transition-all duration-500"
          >
            <p className="font-heading text-3xl md:text-4xl font-bold text-foreground glow-text">
              <Counter value={s.value} suffix={s.suffix} divisor={s.divisor} decimals={s.decimals} />
            </p>
            <p className="text-xs text-muted-foreground mt-2 font-body">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ImpactStats;
