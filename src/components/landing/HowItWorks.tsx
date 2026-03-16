import { motion } from "framer-motion";
import { FileText, Network, Brain, Lightbulb, FlaskConical, Atom, Rocket } from "lucide-react";

const steps = [
  { icon: FileText, label: "Research Papers", desc: "Ingest and parse scientific literature" },
  { icon: Network, label: "Knowledge Graph", desc: "Map relationships and concepts" },
  { icon: Brain, label: "AI Reasoning Engine", desc: "Deep analysis and pattern recognition" },
  { icon: Lightbulb, label: "Hypothesis Generation", desc: "Generate novel scientific hypotheses" },
  { icon: FlaskConical, label: "Experiment Design", desc: "Plan experiments with AI guidance" },
  { icon: Atom, label: "Simulation Engine", desc: "Predict outcomes computationally" },
  { icon: Rocket, label: "Scientific Discovery", desc: "Accelerate breakthroughs" },
];

const HowItWorks = () => (
  <section className="section-padding">
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3 font-body">Discovery Pipeline</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight">How ApeironAI Works</h2>
      </motion.div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent md:-translate-x-px" />

        <div className="space-y-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative flex items-center gap-4 md:gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} md:text-${i % 2 === 0 ? 'right' : 'left'}`}
            >
              {/* Content - mobile: always right. Desktop: alternating */}
              <div className="hidden md:block flex-1" />
              
              {/* Node */}
              <div className="relative z-10 w-12 h-12 rounded-xl bg-card border border-primary/30 flex items-center justify-center shrink-0 shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)]">
                <s.icon size={18} className="text-primary" />
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>

              {/* Text */}
              <div className="flex-1 glass rounded-xl px-5 py-4">
                <h3 className="font-heading text-sm font-semibold text-foreground">{s.label}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorks;
